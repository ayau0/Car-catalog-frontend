import React, { useState } from 'react';
import CarCard from '../../../components/CarCard'; // проверь путь

const CatalogPage = () => {
  const [selectedBrand, setSelectedBrand] = useState('Все');

  const cars = [
    {
      id: 1,
      brand: { name: 'Toyota', logo_url: '' },
      name: 'Camry',
      year: 2020,
      price: 25000,
      description: 'Комфортный седан среднего класса.',
      image_url: '',
    },
    {
      id: 2,
      brand: { name: 'Honda', logo_url: '' },
      name: 'Civic',
      year: 2019,
      price: 20000,
      description: 'Надежный и экономичный хэтчбек.',
      image_url: '',
    },
    {
      id: 3,
      brand: { name: 'Toyota', logo_url: '' },
      name: 'Corolla',
      year: 2021,
      price: 22000,
      description: 'Удобный и экономичный седан.',
      image_url: '',
    },
  ];

  const uniqueBrands = ['Все', ...new Set(cars.map(car => car.brand.name))];

  const filteredCars = selectedBrand === 'Все'
    ? cars
    : cars.filter(car => car.brand.name === selectedBrand);

  return (
    <div style={{ paddingBottom: '80px' }}>
      <h1>Каталог автомобилей</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredCars.map(car => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {/* Фильтр по бренду — ВНИЗУ */}
      <div style={filterContainerStyle}>
        <h3>Фильтр по бренду:</h3>
        <div style={brandButtonsStyle}>
          {uniqueBrands.map(brand => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              style={{
                ...brandButtonStyle,
                backgroundColor: selectedBrand === brand ? '#007bff' : '#eee',
                color: selectedBrand === brand ? '#fff' : '#000',
              }}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Стили
const filterContainerStyle = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#fff',
  borderTop: '1px solid #ddd',
  padding: '10px 20px',
  boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
};

const brandButtonsStyle = {
  display: 'flex',
  gap: 10,
  flexWrap: 'wrap',
  marginTop: 10,
};

const brandButtonStyle = {
  padding: '8px 16px',
  border: '1px solid #ccc',
  borderRadius: 6,
  cursor: 'pointer',
  fontSize: 14,
  transition: 'all 0.3s ease',
};

export default CatalogPage;
