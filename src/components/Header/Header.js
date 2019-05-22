import React from 'react';
import logo from '../../assets/images/balloon-381334_1280.png'
import './Header.css';

function Header() {
  return (
    <div className="header-container">
      <img src={logo} className="logo" alt="Logo" />
      <h2>Chit-Chat</h2>
    </div>
  )
}

export default Header