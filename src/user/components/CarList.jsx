import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // импорт навигации
import AuthContext from '../context/AuthContext';
import CarCard from './CarCard';
import SearchBar from './SearchBar';

const CarList = () => {
  const { token } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // создаём хук для навигации

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:8080/cars', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCars(response.data);
      } catch (err) {
        setError('Ошибка при загрузке списка машин');
      }
    };
    fetchCars();
  }, [token]);

  // Фильтрация машин по названию или бренду по поисковому слову
  const filteredCars = cars.filter(car =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Функция перехода на страницу деталей
  const handleDetails = (car) => {
    navigate(`/cars/${car.ID || car.id}`);
  };

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div style={{ padding: 20 }}>
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
            <CarCard key={car.ID} car={car} onDetails={handleDetails} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarList;
