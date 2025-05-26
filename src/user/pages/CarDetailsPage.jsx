import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

const CarDetailsPage = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);

  const [car, setCar] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setError('Пользователь не авторизован');
      return;
    }
    if (!id) {
      setError('Некорректный ID машины');
      return;
    }

    axios.get(`http://localhost:8080/cars/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      setCar(response.data);
      setError(null);
    })
    .catch(err => {
      console.error('Ошибка при получении машины:', err);
      setError('Не удалось загрузить данные о машине');
    });
  }, [id, token]);

  if (error) return <p style={{ color: 'red', padding: 20 }}>{error}</p>;
  if (!car) return <p style={{ padding: 20 }}>Загрузка...</p>;

  return (
    <main style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          {car.brand?.name || 'Неизвестный бренд'} {car.name}
        </h2>

        <img
          src={car.brand?.logo_url || 'https://via.placeholder.com/150?text=No+Logo'}
          alt={`${car.brand?.name || 'Бренд'} логотип`}
          onError={e => e.target.src = 'https://via.placeholder.com/150?text=No+Logo'}
          style={styles.logo}
        />

        <p><strong>Год выпуска:</strong> {car.year || 'Не указан'}</p>
        <p><strong>Цена:</strong> {car.price ? `$${car.price.toLocaleString()}` : 'Не указана'}</p>
        <p><strong>Описание:</strong> {car.description || 'Описание отсутствует'}</p>

        <hr style={{ margin: '20px 0' }} />

        <div style={styles.reviewSection}>
          <h3>Отзывы</h3>
          <p style={{ color: '#666' }}>Здесь позже можно будет отображать отзывы пользователей...</p>
        </div>
      </div>
    </main>
  );
};

const styles = {
  container: {
    paddingTop: 110,
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 15,
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    maxWidth: 800,
    width: '100%',
    transition: 'all 0.4s ease-in-out',
    animation: 'fadeIn 0.6s ease-in-out',
  },
  title: {
    fontSize: '2rem',
    marginBottom: 10,
  },
  logo: {
    maxWidth: 150,
    marginBottom: 20,
    borderRadius: 10,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  reviewSection: {
    marginTop: 30,
    paddingTop: 10,
  },
};

export default CarDetailsPage;
