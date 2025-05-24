import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

const CarDetailsPage = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);  // получаем токен из контекста
  const [car, setCar] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setError('Пользователь не авторизован');
      return;
    }

    axios.get(`http://localhost:8080/cars/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        setCar(res.data);
        setError(null);
      })
      .catch(err => {
        console.error('Ошибка при получении данных:', err);
        setError('Не удалось загрузить данные о машине');
      });
  }, [id, token]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!car) return <p>Загрузка...</p>;

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <h2>{car.brand.name} {car.name}</h2>
<img
  src={car.brand.logo_url || 'https://via.placeholder.com/150?text=No+Logo'}
  alt={`${car.brand.name} логотип`}
  onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=No+Logo'; }}
/>

      <p><strong>Год:</strong> {car.year}</p>
      <p><strong>Цена:</strong> ${car.price.toLocaleString()}</p>
      <p><strong>Описание:</strong> {car.description || 'Описание отсутствует'}</p>

      <hr />
      <h3>Отзывы</h3>
      <p>Здесь позже можно будет отображать отзывы пользователей...</p>
    </div>
  );
};

export default CarDetailsPage;
