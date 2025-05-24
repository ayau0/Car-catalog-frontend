// src/components/CarCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
  return (
    <div style={cardStyle}>
      <img
        src={car.image_url || car.brand.logo_url || 'https://via.placeholder.com/150?text=No+Image'}
        alt={`${car.brand.name} ${car.name}`}
        style={imageStyle}
      />
      <h3 style={titleStyle}>
        {car.brand.name} {car.name}
      </h3>
      <p>Год: {car.year}</p>
      <p style={priceStyle}>Цена: ${car.price.toLocaleString()}</p>
      
      <Link to={`/cars/${car.id}`} style={buttonStyle}>
        Подробнее
      </Link>
    </div>
  );
};

const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: 12,
  padding: 20,
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  maxWidth: 320,
  margin: 15,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#fff',
};

const imageStyle = {
  width: 150,
  height: 100,
  objectFit: 'contain',
  marginBottom: 15,
  borderRadius: 8,
  backgroundColor: '#f9f9f9',
};

const titleStyle = {
  fontWeight: '700',
  fontSize: 20,
  textAlign: 'center',
  color: '#333',
};

const priceStyle = {
  fontWeight: '700',
  color: '#007bff',
  marginBottom: 15,
  fontSize: 18,
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  borderRadius: 6,
  fontWeight: '600',
  fontSize: 16,
  textDecoration: 'none',
  textAlign: 'center',
};

export default CarCard;
