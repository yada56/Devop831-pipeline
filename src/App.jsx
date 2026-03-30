import React, { useState, useEffect } from 'react';
import './App.css';
 
function App() {
  // 1. Data State: ข้อมูลสัตว์เลี้ยง
  const [pets, setPets] = useState([
    { id: 1, name: 'มงคล', type: 'แมว', breed: 'สลิด', img: 'แมว.jpg', age: '2 ปี', status: 'available' },
    { id: 2, name: 'กล้วยทอด', type: 'หมา', breed: 'โกลเด้น', img: 'กล้วยทอด.jpg', age: '1 ปี', status: 'available' },
    { id: 3, name: 'สำลี', type: 'แมว', breed: 'ขาวมณี', img: 'ขาวมณี.jpg', age: '6 เดือน', status: 'available' },
    { id: 4, name: 'บราวนี่', type: 'หมา', breed: 'พุดเดิ้ล', img: 'บราว.jpg', age: '3 ปี', status: 'available' },
  ]);
 
  // 2. UI State: สำหรับการค้นหาและตัวกรอง
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ทั้งหมด');
  const [selectedPet, setSelectedPet] = useState(null); // สำหรับเก็บตัวที่กำลังจะรับเลี้ยง
 
  // 3. Logic: กรองข้อมูลตามการพิมพ์และการเลือกประเภท
  const filteredPets = pets.filter(pet => {
    const matchesType = filterType === 'ทั้งหมด' || pet.type === filterType;
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });
 
  const confirmAdoption = (e) => {
    e.preventDefault();
    alert(`ส่งคำขอรับเลี้ยง ${selectedPet.name} เรียบร้อยแล้ว! เจ้าหน้าที่จะติดต่อกลับไปครับ`);
    setSelectedPet(null);
  };
 
  return (
<div className="App">
<header className="App-header">
<div style={{ padding: '20px' }}>
<img src="ยิ้ม.jpg" className="App-logo" alt="logo" style={{ height: '60px' }} />
<h1>🐾Pets Meem DEE</h1>
<p>I <span className="heart">♥️</span> Devops & Save Animals</p>
</div>
 
        {/* --- ส่วนตัวกรองและค้นหา --- */}
<div className="filter-section" style={{ marginBottom: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
<input 
            type="text" 
            placeholder="ค้นหาชื่อน้อง..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '10px', borderRadius: '5px', border: 'none', width: '250px' }}
          />
<select 
            onChange={(e) => setFilterType(e.target.value)}
            style={{ padding: '10px', borderRadius: '5px', cursor: 'pointer' }}
>
<option value="ทั้งหมด">สัตว์เลี้ยงทั้งหมด</option>
<option value="หมา">เฉพาะหมา 🐶</option>
<option value="แมว">เฉพาะแมว 🐱</option>
</select>
</div>
 
        {/* --- ส่วนแสดงผล Card --- */}
<div className="pet-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '25px', 
          width: '90%', 
          maxWidth: '1200px',
          margin: '0 auto' 
        }}>
          {filteredPets.map(pet => (
<div key={pet.id} className="pet-card-v2">
<div className="badge">{pet.type}</div>
<img src={pet.img} alt={pet.name} className="pet-img-main" />
<div style={{ padding: '15px', textAlign: 'left' }}>
<h2 style={{ margin: '0 0 5px 0', color: '#61dafb' }}>{pet.name}</h2>
<p style={{ fontSize: '14px', margin: '5px 0' }}>สายพันธุ์: {pet.breed}</p>
<p style={{ fontSize: '14px', margin: '5px 0' }}>อายุ: {pet.age}</p>
<button className="adopt-btn" onClick={() => setSelectedPet(pet)}>สนใจรับเลี้ยง</button>
</div>
</div>
          ))}
</div>
 
        {/* --- Modal ฟอร์มรับเลี้ยง (จะแสดงเมื่อเลือกสัตว์) --- */}
        {selectedPet && (
<div className="modal-overlay">
<div className="modal-content">
<h2>แบบฟอร์มรับเลี้ยงน้อง {selectedPet.name}</h2>
<form onSubmit={confirmAdoption}>
<div className="form-group">
<label>ชื่อ-นามสกุลของคุณ:</label>
<input type="text" required />
</div>
<div className="form-group">
<label>เบอร์โทรศัพท์ติดต่อ:</label>
<input type="tel" required />
</div>
<div className="form-group">
<label>ทำไมถึงอยากรับเลี้ยงน้อง:</label>
<textarea rows="3" required></textarea>
</div>
<div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
<button type="submit" className="confirm-btn">ส่งข้อมูล</button>
<button type="button" className="cancel-btn" onClick={() => setSelectedPet(null)}>ยกเลิก</button>
</div>
</form>
</div>
</div>
        )}
 
        <footer style={{ marginTop: '50px', paddingBottom: '30px' }}>
<p className="small">this web app written by <marquee style={{ width: '150px' }}>l love cat & dog</marquee></p>
</footer>
</header>
</div>
  );
}
 
export default App;