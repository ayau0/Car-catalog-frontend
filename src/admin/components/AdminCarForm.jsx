import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminCarForm = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [brandId, setBrandId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    axios.get('http://localhost:8080/categories', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setCategories(res.data))
    .catch(() => setError('Не удалось загрузить категории'));
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!categoryId) {
      setError('Пожалуйста, выберите категорию');
      return;
    }

    try {
      await axios.post(
        'http://localhost:8080/cars',
        {
          name,
          year: Number(year),
          price: Number(price),
          brand_id: Number(brandId),
          category_id: Number(categoryId),
          user_id: 1 // или из токена, если надо
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      navigate('/cars');
    } catch (err) {
      console.error(err);
      setError('Ошибка при добавлении машины');
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: '40px auto',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderRadius: 8,
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        backgroundColor: '#fff'
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: 20,
          padding: '8px 16px',
          backgroundColor: '#6b7280',
          color: 'white',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer',
          fontWeight: '600',
        }}
      >
        ← Назад
      </button>

      <h2 style={{ marginBottom: 20, textAlign: 'center' }}>Машина қосу</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 15 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: '600' }}>Модель аты:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              width: '100%',
              padding: 8,
              borderRadius: 6,
              border: '1px solid #ccc',
              fontSize: 16,
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: '600' }}>Шыққан жылы:</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            style={{
              width: '100%',
              padding: 8,
              borderRadius: 6,
              border: '1px solid #ccc',
              fontSize: 16,
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: '600' }}>Бағасы:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={{
              width: '100%',
              padding: 8,
              borderRadius: 6,
              border: '1px solid #ccc',
              fontSize: 16,
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: '600' }}>Brand ID:</label>
          <input
            type="number"
            value={brandId}
            onChange={(e) => setBrandId(e.target.value)}
            required
            style={{
              width: '100%',
              padding: 8,
              borderRadius: 6,
              border: '1px solid #ccc',
              fontSize: 16,
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: '600' }}>Категория:</label>
          <select
            value={categoryId}
            onChange={e => setCategoryId(e.target.value)}
            required
            style={{
              width: '100%',
              padding: 8,
              borderRadius: 6,
              border: '1px solid #ccc',
              fontSize: 16,
              boxSizing: 'border-box'
            }}
          >
            <option value="">Выберите категорию</option>
            {categories.map(cat => (
              <option key={cat.ID || cat.id} value={cat.ID || cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p style={{ color: 'red', marginBottom: 15, fontWeight: '600' }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px 0',
            backgroundColor: '#4f46e5',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            fontWeight: '700',
            fontSize: 16,
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#4338ca')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#4f46e5')}
        >
          Қосу
        </button>
      </form>
    </div>
  );
};

export default AdminCarForm;
