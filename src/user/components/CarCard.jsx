import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link to={`/cars/${car.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: 15,
          boxShadow: hovered ? '0 10px 20px rgba(0,0,0,0.3)' : '0 4px 10px rgba(0,0,0,0.1)',
          transform: hovered ? 'scale(1.03)' : 'scale(1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          cursor: 'pointer',
          overflow: 'hidden',
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          height: 350,
        }}
      >
        <img
          src={car.image || 'https://via.placeholder.com/300x180?text=No+Image'}
          alt={car.name}
          style={{ width: '100%', height: 180, objectFit: 'cover' }}
          onError={e => e.target.src = 'https://via.placeholder.com/300x180?text=No+Image'}
        />
        <div style={{
          padding: 15,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div>
            <h3 style={{ margin: '0 0 5px', fontSize: '1.2rem', fontWeight: 600 }}>{car.name}</h3>
            <p style={{ margin: 0, color: '#777' }}>{car.brand?.name || 'Без бренда'}</p>
          </div>
          <div style={{ marginTop: 10, fontWeight: 600, fontSize: '1rem', color: '#333' }}>
            {car.price ? `${car.price} ₸` : 'Цена не указана'}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
