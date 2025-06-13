import React, { useState } from 'react';
import CarCard from './CarCard';

const carsSample = [
  { id: 1, name: 'BMW M3', brand: { name: 'BMW' }, image: 'https://cdn.bmwblog.com/wp-content/uploads/2019/11/2019-BMW-M3-G80-01.jpg' },
  { id: 2, name: 'Audi RS7', brand: { name: 'Audi' }, image: 'https://cdn.motor1.com/images/mgl/X7wQv/s1/2022-audi-rs7-avant.jpg' },
  { id: 3, name: 'Tesla Model S', brand: { name: 'Tesla' }, image: 'https://tesla-cdn.thron.com/delivery/public/image/tesla/0af5a51e-09de-4bb1-a60b-baf2f46e1a7c/bvlatuR/std/1920x1080/MS-Homepage-D' },
  { id: 4, name: 'Mercedes-Benz C 300', brand: { name: 'Mercedes-Benz' }, image: 'https://www.mercedes-benz.com/en/vehicles/passenger-cars/c-class/_jcr_content/root/slider/sliderchilditems/slideritem/image/MQ6-12-image-20220215144243/01-mercedes-benz-vehicles-c-class-saloon-w206-2021-2560x1440.jpeg' },
  { id: 5, name: 'Toyota Corolla', brand: { name: 'Toyota' }, image: 'https://www.toyota.com/imgix/responsive/images/gallery/photos-videos/2023/corolla/2023-corolla-gallery-001.jpg' },
];

const CarList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCars = carsSample.filter(
    car =>
      car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 1200, margin: '80px auto 40px', padding: '0 20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 30, fontSize: '2.8rem', fontWeight: '800', color: '#222' }}>
        Каталог автомобилей
      </h1>

      <input
        type="text"
        placeholder="Поиск по марке или названию"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '12px 20px',
          fontSize: '1.1rem',
          marginBottom: 40,
          borderRadius: 10,
          border: '1px solid #ccc',
          outline: 'none',
          boxSizing: 'border-box',
        }}
      />

      {filteredCars.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '1.4rem', color: '#777' }}>Машины не найдены.</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 28,
          }}
        >
          {filteredCars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarList;
