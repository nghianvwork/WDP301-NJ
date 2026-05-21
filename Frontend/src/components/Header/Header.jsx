import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [activeLink, setActiveLink] = useState('Trang chủ');

  const navLinks = ['Trang chủ', 'Chi nhánh', 'Phòng', 'Ưu đãi', 'Liên hệ'];

  return (
    <header className="header-container">
      <div className="header-logo-section">
        <h1 className="header-logo-title">Vistago Resorts</h1>
        <p className="header-logo-subtitle">THOẢI MÁI NHƯ Ở NHÀ</p>
      </div>
      
      <nav className="header-nav">
        {navLinks.map((link) => (
          <a
            key={link}
            href="#"
            className={`header-nav-link ${activeLink === link ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveLink(link);
            }}
          >
            {link}
          </a>
        ))}
      </nav>
      
      <div className="header-actions">
        <button className="header-auth-btn">Đăng nhập</button>
      </div>
    </header>
  );
};

export default Header;
