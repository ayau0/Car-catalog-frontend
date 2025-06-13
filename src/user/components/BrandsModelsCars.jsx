import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import CarCard from '../components/CarCard';

const BrandsModelsCars = () => {
  const { token } = useContext(AuthContext);

  const [brands, setBrands] = useState([]);
  const [cars, setCars] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [yearFilter, setYearFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('priceAsc');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;
    axios.get('http://localhost:8080/brands', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setBrands(res.data))
      .catch(() => setError('Не удалось загрузить бренды'));
  }, [token]);

  useEffect(() => {
    if (!token) return;
    axios.get('http://localhost:8080/cars', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setCars(res.data))
      .catch(() => setError('Не удалось загрузить машины'));
  }, [token]);

  const filteredAndSortedCars = cars
    .filter(car => {
      if (selectedBrand && car.brand.id !== selectedBrand.id) return false;
      if (yearFilter && car.year !== Number(yearFilter)) return false;
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
        default: return 0;
      }
    });

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      padding: '100px 30px 30px',
      backgroundColor: '#f4f6f8',
      minHeight: '100vh',
      fontFamily: 'Segoe UI, sans-serif',
      boxSizing: 'border-box',
    }}>
      {/* ФИЛЬТРЫ */}
      <aside style={{
        width: 300,
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 16,
        boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
        marginRight: 40,
        height: 'fit-content',
        position: 'sticky',
        top: 100,
      }}>
        <h3 style={{ marginBottom: 20, fontSize: '1.4rem', color: '#333' }}>Фильтры</h3>

        {/* Бренд */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontWeight: 500, display: 'block', marginBottom: 6 }}>Бренд</label>
          <select
            value={selectedBrand ? selectedBrand.id : ''}
            onChange={(e) => {
              const brand = brands.find(b => b.id === Number(e.target.value));
              setSelectedBrand(brand || null);
            }}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: 10,
              border: '1px solid #ccc',
              backgroundColor: '#fafafa',
            }}
          >
            <option value=''>Все бренды</option>
            {brands.map(brand => (
              <option key={brand.id} value={brand.id}>{brand.name}</option>
            ))}
          </select>
        </div>

        {/* Год */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontWeight: 500, display: 'block', marginBottom: 6 }}>Год</label>
          <input
            type="number"
            value={yearFilter}
            onChange={e => setYearFilter(e.target.value)}
            placeholder="например, 2020"
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: 10,
              border: '1px solid #ccc',
              backgroundColor: '#fafafa',
            }}
          />
        </div>

        {/* Цена */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontWeight: 500, display: 'block', marginBottom: 6 }}>Цена от</label>
          <input
            type="number"
            value={priceFilter.min}
            onChange={e => setPriceFilter({ ...priceFilter, min: e.target.value })}
            placeholder="Мин. цена"
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: 10,
              border: '1px solid #ccc',
              backgroundColor: '#fafafa',
              marginBottom: 12,
            }}
          />
          <label style={{ fontWeight: 500, display: 'block', marginBottom: 6 }}>Цена до</label>
          <input
            type="number"
            value={priceFilter.max}
            onChange={e => setPriceFilter({ ...priceFilter, max: e.target.value })}
            placeholder="Макс. цена"
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: 10,
              border: '1px solid #ccc',
              backgroundColor: '#fafafa',
            }}
          />
        </div>

        <button
          onClick={() => {
            setSelectedBrand(null);
            setYearFilter('');
            setPriceFilter({ min: '', max: '' });
          }}
          style={{
            padding: '10px',
            width: '100%',
            backgroundColor: '#e0e0e0',
            border: 'none',
            borderRadius: 10,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background 0.3s ease',
          }}
        >
          Сбросить фильтры
        </button>
      </aside>

      {/* КОНТЕНТ */}
      <main style={{ flexGrow: 1 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
        }}>
          <h2 style={{ fontSize: '1.8rem', color: '#222' }}>Доступные машины</h2>
          <div>
            <label style={{ marginRight: 10, fontWeight: 500 }}>Сортировка:</label>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{
                padding: '10px 12px',
                borderRadius: 10,
                border: '1px solid #ccc',
                backgroundColor: '#fff',
              }}
            >
              <option value="priceAsc">По цене (↑)</option>
              <option value="priceDesc">По цене (↓)</option>
              <option value="yearAsc">По году (↑)</option>
              <option value="yearDesc">По году (↓)</option>
            </select>
          </div>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 24,
        }}>
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
