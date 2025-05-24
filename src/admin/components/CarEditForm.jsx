import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';



const CarEditForm = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [car, setCar] = useState({ brand: '', model: '', year: '' });

  useEffect(() => {
    axios.get(`http://localhost:8080/cars/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setCar(res.data))
      .catch(err => alert('Машина табылмады'));
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/cars/${id}`, car, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/admin/cars');
    } catch (err) {
      alert('Қате жаңарту кезінде');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', paddingTop: 50 }}>
      <h2>Машинаны өңдеу</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={car.brand}
          onChange={(e) => setCar({ ...car, brand: e.target.value })}
          placeholder="Бренд"
          required
        />
        <input
          value={car.model}
          onChange={(e) => setCar({ ...car, model: e.target.value })}
          placeholder="Модель"
          required
        />
        <input
          value={car.year}
          type="number"
          onChange={(e) => setCar({ ...car, year: e.target.value })}
          placeholder="Жыл"
          required
        />
        <button type="submit">Сақтау</button>
      </form>
    </div>
  );
};

export default CarEditForm;
