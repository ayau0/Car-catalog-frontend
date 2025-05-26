import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link to={`/cars/${car.ID || car.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: 15,
          boxShadow: hovered
            ? '0 10px 20px rgba(0,0,0,0.3)'
            : '0 4px 10px rgba(0,0,0,0.1)',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          cursor: 'pointer',
          overflow: 'hidden',
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 300,
          margin: '10px auto',
        }}
      >
        <img
          src={car.image || 'https://via.placeholder.com/300x180?text=No+Image'}
          alt={car.name}
          style={{ width: '100%', height: 180, objectFit: 'cover' }}
        />
        <div style={{ padding: 15 }}>
          <h3 style={{ margin: 0 }}>{car.name} {car.model}</h3>
          <p style={{ marginTop: 5, color: '#555' }}>{car.brand?.name || 'Без бренда'}</p>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
