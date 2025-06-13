import React, { useState, useEffect } from 'react';
import Header, { HEADER_HEIGHT } from '../components/Header';
import axios from 'axios';

const CarCatalogPage = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    async function fetchCars() {
      try {
        const res = await axios.get('http://localhost:8080/cars');
        setCars(res.data);
        setFilteredCars(res.data);
      } catch (error) {
        console.error('Ошибка загрузки машин', error);
      }
    }
    fetchCars();
  }, []);

  const handleSearch = (term) => {
    if (!term) {
      setFilteredCars(cars);
      return;
    }
    const lowerTerm = term.toLowerCase();
    const filtered = cars.filter(car => {
      return (
        String(car.ID || car.id).includes(lowerTerm) ||
        car.name.toLowerCase().includes(lowerTerm) ||
        (car.model && car.model.toLowerCase().includes(lowerTerm))
      );
    });
    setFilteredCars(filtered);
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      <main style={{ paddingTop: HEADER_HEIGHT, paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
        {filteredCars.length === 0 ? (
          <p>Машины не найдены</p>
        ) : (
          filteredCars.map(car => (
            <div key={car.ID || car.id} style={{ marginBottom: 10 }}>
              <h3>{car.name} {car.model}</h3>
              <p>ID: {car.ID || car.id}</p>
            </div>
          ))
        )}
      </main>
    </>
  );
};

export default CarCatalogPage;
