import React, { useEffect, useState } from 'react';

function Catalog() {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [models, setModels] = useState([]);

  useEffect(() => {
    fetch('/api/brands')
      .then((res) => res.json())
      .then((data) => {
        if (data.brands && Array.isArray(data.brands)) {
          setBrands(data.brands);
        } else if (Array.isArray(data)) {
          setBrands(data);
        } else {
          setBrands([]);
        }
      })
      .catch((err) => console.error('Ошибка брендов:', err));
  }, []);

  useEffect(() => {
    if (selectedBrand) {
      fetch(`/api/models?brand=${selectedBrand}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setModels(data);
          } else {
            setModels([]);
          }
        })
        .catch((err) => console.error('Ошибка моделей:', err));
    } else {
      setModels([]);
    }
  }, [selectedBrand]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>🚗 Автокаталог</h1>
      <label htmlFor="brand">Выберите бренд:</label>
      <select
        id="brand"
        value={selectedBrand}
        onChange={(e) => setSelectedBrand(e.target.value)}
      >
        <option value="">-- выбрать --</option>
        {Array.isArray(brands) && brands.length > 0 ? (
          brands.map((brand, index) => (
            <option key={index} value={brand}>
              {brand}
            </option>
          ))
        ) : (
          <option disabled>Нет брендов</option>
        )}
      </select>

      {models.length > 0 && (
        <>
          <h2 style={{ marginTop: '2rem' }}>Модели:</h2>
          <ul>
            {models.map((model, i) => (
              <li key={i}>
                {model.name} ({model.year})
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Catalog;
