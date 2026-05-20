import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header-container">
      <div className="header-logo-section">
        <h1 className="header-logo-title">Vistago Resorts</h1>
        <p className="header-logo-subtitle">THOẢI MÁI NHƯ Ở NHÀ</p>
      </div>
      
      <nav className="header-nav">
        <a href="#" className="header-nav-link active">Trang chủ</a>
        <a href="#" className="header-nav-link">Chi nhánh</a>
        <a href="#" className="header-nav-link">Phòng</a>
        <a href="#" className="header-nav-link">Ưu đãi</a>
        <a href="#" className="header-nav-link">Liên hệ</a>
      </nav>
      
      <div className="header-actions">
        <button className="header-auth-btn">Đăng nhập</button>
      </div>
    </header>
  );
};

export default Header;
