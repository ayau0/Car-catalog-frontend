// src/user/components/Header.jsx

import React, { useState } from 'react';
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
        <span style={{ color: '#4fd1c5' }}>Car</span>Catalog
      </div>

      {/* Поиск */}
      <div style={{ flex: 1, maxWidth: 400, marginLeft: 20, marginRight: 20 }}>
        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      </div>

      {/* Навигация */}
      <nav style={{ display: 'flex', gap: 20, alignItems: 'center', fontSize: 15 }}>
        <a href="#about" style={navLinkStyle}>О компании</a>
        <a href="#services" style={navLinkStyle}>Услуги</a>
        <a href="#catalog" style={navLinkStyle}>Каталог</a>
        <a href="#contacts" style={navLinkStyle}>Контакты</a>
      </nav>

      {/* Кнопки */}
      <div style={{ display: 'flex', gap: 15 }}>
        <button style={btnStyle} onClick={() => alert('Вход')}>Вход</button>
        <button
          style={{ ...btnStyle, backgroundColor: '#4fd1c5', color: '#0d253f' }}
          onClick={() => alert('Регистрация')}
        >
          Регистрация
        </button>
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
