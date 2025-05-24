import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import CarCard from './CarCard';
import SearchBar from './SearchBar';
import Filters from './Filters';

const CarList = () => {
  const { token } = useContext(AuthContext);

  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    brands: [],
    yearRange: [2000, 2025],
    priceRange: [0, 100000],
  });
  const [error, setError] = useState(null);

  // Загрузка машин
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get('http://localhost:8080/cars', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCars(res.data);
      } catch (err) {
        setError('Ошибка при загрузке списка машин');
      }
    };
    fetchCars();
  }, [token]);

  // Загрузка брендов
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await axios.get('http://localhost:8080/brands', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBrands(res.data);
      } catch {
        // Можно добавить обработку ошибок
      }
    };
    fetchBrands();
  }, [token]);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  // Функция обновления фильтров
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Фильтрация машин по поиску и фильтрам
  const filteredCars = cars.filter(car => {
    const matchesSearch =
      car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.brand.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBrand =
      filters.brands.length === 0 || filters.brands.includes(car.brand.name);

    const matchesYear =
      car.year >= filters.yearRange[0] && car.year <= filters.yearRange[1];

    const matchesPrice =
      car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1];

    return matchesSearch && matchesBrand && matchesYear && matchesPrice;
  });

  return (
    <div style={{ display: 'flex', padding: 20, gap: 20 }}>
      <Filters brands={brands} onFilterChange={handleFilterChange} />
      <div style={{ flex: 1 }}>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        {filteredCars.length === 0 ? (
          <p>Машины не найдены.</p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {filteredCars.map((car) => (
              <CarCard key={car.ID} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarList;
