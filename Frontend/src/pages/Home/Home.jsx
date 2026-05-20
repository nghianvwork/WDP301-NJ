import React from 'react';
import './Home.css';
import heroBg from '../../assets/images/hero_bg.png';
import branch1 from '../../assets/images/branch_1.png';
import branch2 from '../../assets/images/branch_2.png';
import branch3 from '../../assets/images/branch_3.png';
import room1 from '../../assets/images/room_1.png';
import room2 from '../../assets/images/room_2.png';
import room3 from '../../assets/images/room_3.png';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Trải nghiệm kỳ nghỉ thượng lưu tại<br />Vistago Resorts</h1>
          
          <div className="booking-bar">
            <div className="booking-field">
              <label>Chi nhánh</label>
              <select className="booking-input">
                <option>Chọn chi nhánh</option>
                <option>Hà Nội</option>
                <option>Đà Nẵng</option>
                <option>Phú Quốc</option>
              </select>
            </div>
            <div className="booking-field">
              <label>Ngày nhận phòng</label>
              <input type="date" className="booking-input" />
            </div>
            <div className="booking-field">
              <label>Ngày trả phòng</label>
              <input type="date" className="booking-input" />
            </div>
            <div className="booking-field">
              <label>Khách & Phòng</label>
              <input type="text" className="booking-input" defaultValue="2 Người lớn, 1 Phòng" />
            </div>
            <div className="booking-button-container">
              <button className="booking-btn">Tìm phòng</button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Branches Section */}
      <section className="featured-branches section-padding">
        <h2 className="section-title">Chi nhánh nổi bật</h2>
        <div className="branches-grid">
          <div className="branch-card">
            <div className="branch-img-wrapper">
              <img src={branch1} alt="Lumina Hanoi Elite" />
            </div>
            <div className="branch-info">
              <h3>Lumina Hanoi Elite</h3>
              <p>Trải nghiệm nét cổ kính pha lẫn hiện đại giữa lòng thủ đô.</p>
              <a href="#" className="discover-link">Khám phá ngay ➔</a>
            </div>
          </div>
          <div className="branch-card">
            <div className="branch-img-wrapper">
              <img src={branch2} alt="Lumina Phu Quoc Oasis" />
            </div>
            <div className="branch-info">
              <h3>Lumina Phu Quoc Oasis</h3>
              <p>Thiên đường nhiệt đới với những căn villa hướng biển tuyệt đẹp.</p>
              <a href="#" className="discover-link">Khám phá ngay ➔</a>
            </div>
          </div>
          <div className="branch-card">
            <div className="branch-img-wrapper">
              <img src={branch3} alt="Lumina Da Nang Retreat" />
            </div>
            <div className="branch-info">
              <h3>Lumina Da Nang Retreat</h3>
              <p>Sự giao hòa hoàn hảo giữa núi rừng hùng vĩ và biển xanh.</p>
              <a href="#" className="discover-link">Khám phá ngay ➔</a>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Rooms Section */}
      <section className="premium-rooms section-padding">
        <h2 className="section-title">Không gian nghỉ dưỡng đẳng cấp</h2>
        <div className="rooms-grid">
          <div className="room-card top-left" style={{ backgroundImage: `url(${room1})` }}>
            <div className="room-info">
              <h3>Penthouse Signature</h3>
              <p>Đỉnh cao của sự sang trọng với tầm nhìn toàn cảnh, không gian siêu rộng và dịch vụ quản gia riêng 24/7.</p>
            </div>
          </div>
          <div className="room-card top-right" style={{ backgroundImage: `url(${room2})` }}>
            <div className="room-info">
              <h3>Deluxe Ocean View</h3>
              <p>Thức giấc cùng tiếng sóng biển rì rào.</p>
            </div>
          </div>
          <div className="room-card bottom-full" style={{ backgroundImage: `url(${room3})` }}>
            <div className="room-info">
              <h3>Suite Family</h3>
              <p>Không gian hoàn hảo cho những kỳ nghỉ gắn kết gia đình.</p>
            </div>
            <button className="view-all-rooms-btn">Xem tất cả hạng phòng</button>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="amenities section-padding">
        <h2 className="section-title">Tiện ích đặc quyền</h2>
        <div className="amenities-grid">
          <div className="amenity-card">
            <div className="amenity-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20"/><path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="M4 12V8a4 4 0 0 1 8 0v4"/><path d="M12 12V8a4 4 0 0 1 8 0v4"/></svg>
            </div>
            <h3>Hồ bơi vô cực</h3>
            <p>Tầm nhìn ngoạn mục</p>
          </div>
          <div className="amenity-card">
            <div className="amenity-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m8 14 4-4 4 4"/></svg>
            </div>
            <h3>Spa & Wellness</h3>
            <p>Thư giãn tuyệt đối</p>
          </div>
          <div className="amenity-card">
            <div className="amenity-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
            </div>
            <h3>Nhà hàng 5 sao</h3>
            <p>Tinh hoa ẩm thực</p>
          </div>
          <div className="amenity-card">
            <div className="amenity-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/></svg>
            </div>
            <h3>Phòng Gym</h3>
            <p>Trang thiết bị hiện đại</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
