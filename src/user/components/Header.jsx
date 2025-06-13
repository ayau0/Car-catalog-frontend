// src/user/components/Header.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

export const HEADER_HEIGHT = 80;

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    if (onSearch) onSearch(term);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: HEADER_HEIGHT,
        backgroundColor: '#0d253f',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
        zIndex: 1000,
      }}
    >
      {/* Логотип */}
      <div style={{ fontWeight: 'bold', fontSize: '1.7rem', cursor: 'pointer' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
          <span style={{ color: '#4fd1c5' }}>Car</span>Catalog
        </Link>
      </div>

      {/* Поиск */}
      <div style={{ flex: 1, maxWidth: 400, marginLeft: 20, marginRight: 20 }}>
        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      </div>

      {/* Навигация */}
      <nav style={{ display: 'flex', gap: 20, alignItems: 'center', fontSize: 15 }}>
        <Link to="/about" style={navLinkStyle}>О компании</Link>
        <Link to="/services" style={navLinkStyle}>Услуги</Link>
        <Link to="/catalog" style={navLinkStyle}>Каталог</Link>
        <Link to="/contacts" style={navLinkStyle}>Контакты</Link>
      </nav>

      {/* Кнопки */}
      <div style={{ display: 'flex', gap: 15 }}>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <button style={btnStyle}>Вход</button>
        </Link>
        <Link to="/register" style={{ textDecoration: 'none' }}>
          <button style={{ ...btnStyle, backgroundColor: '#4fd1c5', color: '#0d253f' }}>
            Регистрация
          </button>
        </Link>
      </div>
    </header>
  );
};

const navLinkStyle = {
  color: '#cfd8dc',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'color 0.3s ease',
};

const btnStyle = {
  backgroundColor: 'transparent',
  border: '2px solid #4fd1c5',
  borderRadius: 20,
  padding: '6px 15px',
  color: '#4fd1c5',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

export default Header;
