// src/user/components/SearchBar.jsx

import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Поиск по названию или модели..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{
          width: '100%',
          padding: '8px 12px',
          fontSize: 16,
          borderRadius: 4,
          border: '1px solid #ccc',
        }}
      />
    </div>
  );
};

export default SearchBar;
