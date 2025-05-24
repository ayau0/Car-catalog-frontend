import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminBrandForm = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    country: '',
    description: '',
    logo_url: '',
    category_id: '',
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Получаем категории с сервера
    axios.get('http://localhost:8080/categories', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setCategories(res.data))
      .catch(() => setError('Ошибка при загрузке категорий'));
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    axios.post('http://localhost:8080/brands', form, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      alert('Бренд қосылды!');
      navigate(-1);
    })
    .catch(() => setError('Қате кетті при добавлении бренда.'));
  };

  return (
    <div style={containerStyle}>
      <button onClick={() => navigate(-1)} style={backButtonStyle}>← Назад</button>

      <h3 style={{ marginBottom: 20, textAlign: 'center' }}>Бренд қосу</h3>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Бренд аты"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
          style={inputStyle}
        />
        <input
          placeholder="Ел (Country)"
          value={form.country}
          onChange={e => setForm({ ...form, country: e.target.value })}
          required
          style={inputStyle}
        />
        <input
          placeholder="Сипаттама (Description)"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          required
          style={inputStyle}
        />
        <input
          placeholder="Логотип URL"
          value={form.logo_url}
          onChange={e => setForm({ ...form, logo_url: e.target.value })}
          style={inputStyle}
        />

        <select
          required
          value={form.category_id}
          onChange={e => setForm({ ...form, category_id: e.target.value })}
          style={inputStyle}
        >
          <option value="">Выберите категорию</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        {error && <p style={{ color: 'red', marginBottom: 15 }}>{error}</p>}

        <button
          type="submit"
          style={submitButtonStyle}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#4338ca')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#4f46e5')}
        >
          Қосу
        </button>
      </form>
    </div>
  );
};

const containerStyle = {
  maxWidth: 400,
  margin: '40px auto',
  padding: 20,
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  borderRadius: 8,
  backgroundColor: '#fff',
  fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
};

const backButtonStyle = {
  marginBottom: 20,
  padding: '8px 16px',
  backgroundColor: '#6b7280',
  color: 'white',
  border: 'none',
  borderRadius: 6,
  cursor: 'pointer',
  fontWeight: '600',
};

const inputStyle = {
  width: '100%',
  padding: 10,
  marginBottom: 15,
  borderRadius: 6,
  border: '1px solid #ccc',
  fontSize: 16,
  boxSizing: 'border-box',
};

const submitButtonStyle = {
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
};

export default AdminBrandForm;
