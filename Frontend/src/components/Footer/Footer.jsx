import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-copyright">
        © 2026 Vistago Resorts Hospitality Group. All rights reserved.
      </div>
      
      <h2 className="footer-logo">Vistago Resorts</h2>
      
      <div className="footer-links">
        <a href="#" className="footer-link">Chính sách bảo mật</a>
        <a href="#" className="footer-link">Điều khoản sử dụng</a>
        <a href="#" className="footer-link">Sitemap</a>
      </div>
    </footer>
  );
};

export default Footer;
