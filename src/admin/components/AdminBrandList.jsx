import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminBrandList = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingBrand, setEditingBrand] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
  });

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get('http://localhost:8080/brands', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Brands from API:', response.data); // Лог для проверки структуры
        setBrands(response.data);
      } catch (err) {
        setError('Қате брендтерді жүктеу кезінде: ' + (err.response?.data?.error || err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, [token]);

  // Получаем корректный ID из объекта бренда
  const getBrandID = (brand) => brand.ID || brand.id;

  const startEdit = (brand) => {
    const brandID = getBrandID(brand);
    if (!brandID) {
      setError('Қате: жарамсыз бренд ID');
      return;
    }
    setEditingBrand(brand);
    setFormData({ name: brand.name });
    setError(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleSave = async () => {
    const brandID = getBrandID(editingBrand);
    if (!brandID) {
      setError('Қате: жарамсыз бренд ID');
      return;
    }

    try {
      await axios.put(
        `http://localhost:8080/brands/${brandID}`,
        { name: formData.name },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setBrands(prev =>
        prev.map(b =>
          getBrandID(b) === brandID ? { ...b, name: formData.name } : b
        )
      );

      setEditingBrand(null);
      setError(null);
    } catch (err) {
      setError('Қате сақтау кезінде: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleDelete = async (brandID) => {
    if (!brandID) {
      alert('Қате: Бренд ID жоқ');
      return;
    }

    const confirmed = window.confirm('Сіз бұл брендті өшіргіңіз келе ме?');
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:8080/brands/${brandID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBrands(prev => prev.filter(brand => getBrandID(brand) !== brandID));
    } catch (err) {
      setError('Қате өшіру кезінде: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleCancel = () => {
    setEditingBrand(null);
    setError(null);
  };

  if (loading) return <p>Жүктелуде...</p>;
  if (error && !editingBrand) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'Segoe UI' }}>
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

      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Брендтер тізімі</h2>

      {brands.map(brand => (
        <div
          key={getBrandID(brand)}
          style={{
            border: '1px solid #ddd',
            padding: 15,
            marginBottom: 12,
            borderRadius: 8,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#fdfdfd',
          }}
        >
          <div><strong>{brand.name}</strong></div>
          <div>
            <button
              onClick={() => startEdit(brand)}
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
              onClick={() => handleDelete(getBrandID(brand))}
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

      {editingBrand && (
        <div
          style={{
            marginTop: 30,
            padding: 20,
            border: '1px solid #4f46e5',
            borderRadius: 12,
            backgroundColor: '#f0f0ff',
          }}
        >
          <h3 style={{ marginBottom: 15 }}>Брендті өзгерту: {editingBrand.name}</h3>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <label style={{ display: 'block', marginBottom: 15 }}>
            Аты:
            <input
              type="text"
              name="name"
              value={formData.name}
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

export default AdminBrandList;
