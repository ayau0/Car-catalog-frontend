import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminCarList = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingCar, setEditingCar] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    year: '',
  });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:8080/cars', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCars(response.data);
      } catch (err) {
        setError('Ошибка при загрузке машин');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [token]);

  const startEdit = (car) => {
    setEditingCar(car);
    setFormData({
      name: car.name,
      model: car.model,
      year: car.year,
    });
    setError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (!editingCar || !editingCar.ID) {
        setError('Ошибка: неверный ID машины');
        return;
      }

      await axios.put(
        `http://localhost:8080/cars/${editingCar.ID}`,
        {
          name: formData.name,
          model: formData.model,
          year: Number(formData.year),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCars(prevCars =>
        prevCars.map(car =>
          car.ID === editingCar.ID
            ? { ...car, name: formData.name, model: formData.model, year: Number(formData.year) }
            : car
        )
      );

      setEditingCar(null);
      setError(null);
    } catch (err) {
      setError('Ошибка при сохранении изменений: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleCancel = () => {
    setEditingCar(null);
    setError(null);
  };

  // Новая функция удаления
  const handleDelete = async (carID) => {
    const confirmed = window.confirm('Вы уверены, что хотите удалить эту машину?');
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:8080/cars/${carID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCars(prevCars => prevCars.filter(car => car.ID !== carID));
      // Если удалили редактируемую машину, сбрасываем редактирование
      if (editingCar && editingCar.ID === carID) {
        setEditingCar(null);
        setError(null);
      }
    } catch (err) {
      setError('Ошибка при удалении машины: ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <p>Загрузка...</p>;
  if (error && !editingCar) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
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

      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Машиналар тізімі</h2>

      {cars.map(car => (
        <div
          key={car.ID}
          style={{
            border: '1px solid #ddd',
            padding: 15,
            marginBottom: 12,
            borderRadius: 8,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#fafafa',
          }}
        >
          <div>
            <strong>{car.name}</strong> — {car.model} ({car.year})
          </div>
          <div>
            <button
              onClick={() => startEdit(car)}
              style={{
                backgroundColor: '#4f46e5',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                padding: '6px 12px',
                cursor: 'pointer',
                fontWeight: '600',
                marginRight: 8,
              }}
            >
              Өңдеу
            </button>
            <button
              onClick={() => handleDelete(car.ID)}
              style={{
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                padding: '6px 12px',
                cursor: 'pointer',
                fontWeight: '600',
              }}
            >
              Өшіру
            </button>
          </div>
        </div>
      ))}

      {editingCar && (
        <div
          style={{
            marginTop: 30,
            padding: 20,
            border: '1px solid #4f46e5',
            borderRadius: 12,
            backgroundColor: '#f0f0ff',
          }}
        >
          <h3 style={{ marginBottom: 15 }}>Машинаны өзгерту: {editingCar.name}</h3>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <label style={{ display: 'block', marginBottom: 8 }}>
            Аты:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{ marginLeft: 10, padding: 6, width: '60%' }}
            />
          </label>

          <label style={{ display: 'block', marginBottom: 8 }}>
            Моделі:
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              style={{ marginLeft: 10, padding: 6, width: '60%' }}
            />
          </label>

          <label style={{ display: 'block', marginBottom: 15 }}>
            Жылы:
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              style={{ marginLeft: 10, padding: 6, width: '60%' }}
            />
          </label>

          <button
            onClick={handleSave}
            style={{
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              padding: '8px 16px',
              marginRight: 10,
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            Сақтау
          </button>

          <button
            onClick={handleCancel}
            style={{
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              padding: '8px 16px',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            Болдырмау
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminCarList;
