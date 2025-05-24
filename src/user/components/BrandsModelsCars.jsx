import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import CarCard from '../components/CarCard';

const BrandsModelsCars = () => {
  const { token } = useContext(AuthContext);

  const [brands, setBrands] = useState([]);
  const [cars, setCars] = useState([]);

  // Фильтры
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [yearFilter, setYearFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState({ min: '', max: '' });

  // Сортировка
  const [sortBy, setSortBy] = useState('priceAsc'); // priceAsc, priceDesc, yearAsc, yearDesc, popularity

  const [error, setError] = useState('');

  // Загрузка брендов
  useEffect(() => {
    if (!token) return;

    axios.get('http://localhost:8080/brands', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setBrands(res.data))
      .catch(() => setError('Не удалось загрузить бренды'));
  }, [token]);

  // Загрузка всех машин
  useEffect(() => {
    if (!token) return;

    axios.get('http://localhost:8080/cars', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setCars(res.data))
      .catch(() => setError('Не удалось загрузить машины'));
  }, [token]);

  // Фильтрация и сортировка машин
  const filteredAndSortedCars = cars
    .filter(car => {
      // Фильтр по бренду
      if (selectedBrand && car.brand.id !== selectedBrand.id) return false;

      // Фильтр по году
      if (yearFilter && car.year !== Number(yearFilter)) return false;

      // Фильтр по цене
      if (priceFilter.min && car.price < Number(priceFilter.min)) return false;
      if (priceFilter.max && car.price > Number(priceFilter.max)) return false;

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'priceAsc': return a.price - b.price;
        case 'priceDesc': return b.price - a.price;
        case 'yearAsc': return a.year - b.year;
        case 'yearDesc': return b.year - a.year;
        // Добавь логику для популярности, если есть данные
        default: return 0;
      }
    });

  return (
    <div style={{ display: 'flex', padding: 20 }}>
      {/* Фильтры слева */}
      <aside style={{ width: 250, marginRight: 30 }}>
        <h3>Фильтры</h3>

        <div style={{ marginBottom: 20 }}>
          <label>Бренд</label>
          <select
            value={selectedBrand ? selectedBrand.id : ''}
            onChange={(e) => {
              const brand = brands.find(b => b.id === Number(e.target.value));
              setSelectedBrand(brand || null);
            }}
            style={{ width: '100%', padding: 5 }}
          >
            <option value=''>Все бренды</option>
            {brands.map(brand => (
              <option key={brand.id} value={brand.id}>{brand.name}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label>Год</label>
          <input
            type="number"
            placeholder="Год выпуска"
            value={yearFilter}
            onChange={e => setYearFilter(e.target.value)}
            style={{ width: '100%', padding: 5 }}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label>Цена от</label>
          <input
            type="number"
            placeholder="Минимум"
            value={priceFilter.min}
            onChange={e => setPriceFilter({ ...priceFilter, min: e.target.value })}
            style={{ width: '100%', padding: 5, marginBottom: 10 }}
          />
          <label>Цена до</label>
          <input
            type="number"
            placeholder="Максимум"
            value={priceFilter.max}
            onChange={e => setPriceFilter({ ...priceFilter, max: e.target.value })}
            style={{ width: '100%', padding: 5 }}
          />
        </div>

        <button
          onClick={() => {
            setSelectedBrand(null);
            setYearFilter('');
            setPriceFilter({ min: '', max: '' });
          }}
          style={{ padding: '8px 16px', backgroundColor: '#eee', border: '1px solid #ccc', cursor: 'pointer' }}
        >
          Сбросить фильтры
        </button>
      </aside>

      {/* Основной контент */}
      <main style={{ flexGrow: 1 }}>
        {/* Сортировка сверху */}
        <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 20 }}>
          <label>Сортировать по:</label>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            style={{ padding: 5 }}
          >
            <option value="priceAsc">Цене (по возрастанию)</option>
            <option value="priceDesc">Цене (по убыванию)</option>
            <option value="yearAsc">Году (по возрастанию)</option>
            <option value="yearDesc">Году (по убыванию)</option>
            {/* Если есть поле популярности, добавь сюда */}
          </select>
        </div>

        {/* Список машин */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {filteredAndSortedCars.length === 0 ? (
            <p>Машины не найдены</p>
          ) : (
            filteredAndSortedCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default BrandsModelsCars;
