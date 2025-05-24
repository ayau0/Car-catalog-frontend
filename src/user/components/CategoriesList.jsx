import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

const CategoriesList = () => {
  const { token } = useContext(AuthContext);
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

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!categories.length) return <p>Загрузка категорий...</p>;

  return (
    <ul>
      {categories.map(cat => (
        <li key={cat.ID || cat.id}>{cat.name}</li>
      ))}
    </ul>
  );
};

export default CategoriesList;
