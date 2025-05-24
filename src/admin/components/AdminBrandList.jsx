import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

const AdminBrandList = () => {
  const { token } = useContext(AuthContext);

  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingBrand, setEditingBrand] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    description: '',
    logo_url: '',
  });

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get('http://localhost:8080/brands', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBrands(response.data);
      } catch (err) {
        setError('Ошибка при загрузке брендов');
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, [token]);

  const startEdit = (brand) => {
    setEditingBrand(brand);
    setFormData({
      name: brand.name || '',
      country: brand.country || '',
      description: brand.description || '',
      logo_url: brand.logo_url || '',
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
    if (!editingBrand || !editingBrand.ID) {
      setError('Ошибка: неверный ID бренда');
      return;
    }

    try {
      await axios.put(
        `http://localhost:8080/brands/${editingBrand.ID}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setBrands(prevBrands =>
        prevBrands.map(b =>
          b.ID === editingBrand.ID ? { ...b, ...formData } : b
        )
      );
      setEditingBrand(null);
      setError(null);
    } catch (err) {
      setError('Ошибка при сохранении: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleCancel = () => {
    setEditingBrand(null);
    setError(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Растанасыз ба? Бренд жойылсын ба?')) return;
    try {
      await axios.delete(`http://localhost:8080/brands/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBrands(prevBrands => prevBrands.filter(b => b.ID !== id));
    } catch (err) {
      alert('Қате жойғанда: ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <p>Жүктелуде...</p>;
  if (error && !editingBrand) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Брендтер тізімі</h2>

      {brands.map(brand => (
        <div
          key={brand.ID}
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
            <strong>{brand.name}</strong> — {brand.country}
          </div>
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
              onClick={() => handleDelete(brand.ID)}
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
              Жою
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

          <label style={{ display: 'block', marginBottom: 8 }}>
            Аты:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{ marginLeft: 10, padding: 6, width: '60%' }}
              required
            />
          </label>

          <label style={{ display: 'block', marginBottom: 8 }}>
            Ел (Country):
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              style={{ marginLeft: 10, padding: 6, width: '60%' }}
              required
            />
          </label>

          <label style={{ display: 'block', marginBottom: 8 }}>
            Сипаттама (Description):
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{ marginLeft: 10, padding: 6, width: '60%', minHeight: 80 }}
              required
            />
          </label>

          <label style={{ display: 'block', marginBottom: 15 }}>
            Логотип URL:
            <input
              type="url"
              name="logo_url"
              value={formData.logo_url}
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
