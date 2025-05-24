import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  container: {
    maxWidth: 480,
    margin: '40px auto',
    padding: 30,
    borderRadius: 12,
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: 'center',
  },
  title: {
    marginBottom: 24,
    fontWeight: '700',
    fontSize: '2rem',
    color: '#222',
    letterSpacing: '0.05em',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  item: {
    marginBottom: 16,
  },
  linkBase: {
    textDecoration: 'none',
    display: 'inline-block',
    padding: '12px 24px',
    borderRadius: 8,
    color: 'white',
    fontWeight: 600,
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    transition: 'background-color 0.3s ease, transform 0.2s',
  },
  carLink: {
    backgroundColor: '#4f46e5',
  },
  brandLink: {
    backgroundColor: '#10b981',
  }
};

const AdminDashboard = () => {
  // Ховер эффект үшін жергілікті стейтпен қарапайым тәсіл қолданайық:
  const [hoveredLink, setHoveredLink] = React.useState(null);

  // Функция hover стилін есептеу үшін
  const getLinkStyle = (type) => {
    let base = {...styles.linkBase};
    if (type === 'car') {
      base.backgroundColor = hoveredLink === type ? '#4338ca' : '#4f46e5';
    } else if (type === 'brand') {
      base.backgroundColor = hoveredLink === type ? '#059669' : '#10b981';
    }
    return base;
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Админ панель</h2>
      <ul style={styles.list}>
  <li style={styles.item}>
    <Link
      to="/admin/cars"
      style={{...styles.linkBase, ...styles.carLink}}
    >
      🚗 Машина тізімі
    </Link>
  </li>
  <li style={styles.item}>
    <Link
      to="/admin/cars/add"
      style={getLinkStyle('car')}
      onMouseEnter={() => setHoveredLink('car')}
      onMouseLeave={() => setHoveredLink(null)}
    >
      ➕ Машина қосу
    </Link>
  </li>
  <li style={styles.item}>
    <Link
      to="/admin/brands"
      style={getLinkStyle('brand')}
      onMouseEnter={() => setHoveredLink('brand')}
      onMouseLeave={() => setHoveredLink(null)}
    >
      🏷️ Брендтер тізімі
    </Link>
  </li>
  <li style={styles.item}>
    <Link
      to="/admin/brands/add"
      style={getLinkStyle('brand')}
      onMouseEnter={() => setHoveredLink('brand')}
      onMouseLeave={() => setHoveredLink(null)}
    >
      🏷️ Бренд қосу
    </Link>
  </li>
</ul>

    </div>
  );
};

export default AdminDashboard;
