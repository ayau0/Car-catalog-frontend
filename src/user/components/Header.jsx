import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Header = ({ onSearch }) => {
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleSearch = () => {
    if (onSearch) onSearch(searchQuery);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Закрываем меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        {/* Логотип */}
        <Link to="/" style={styles.logoLink}>
          <svg
            style={styles.logo}
            xmlns="http://www.w3.org/2000/svg"
            fill="#007bff"
            viewBox="0 0 24 24"
          >
            <path d="M3 12l2-2 4 4 8-8 2 2-10 10z" />
          </svg>
          <span style={styles.brand}>AutoCatalog</span>
        </Link>

        {/* Поиск */}
        <div style={styles.search}>
          <input
            type="text"
            placeholder="Поиск автомобилей..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch} style={styles.searchButton} aria-label="Найти">
            🔍
          </button>
        </div>

        {/* Навигация */}
        <nav style={styles.nav}>
          <Link to="/popular" style={styles.navLink}>
            Популярные
          </Link>
          <Link to="/new" style={styles.navLink}>
            Новые
          </Link>
          <Link to="/about" style={styles.navLink}>
            О нас
          </Link>

          {/* Меню пользователя с кликом */}
          <div style={styles.userMenu} ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={styles.userButton}
              aria-haspopup="true"
              aria-expanded={menuOpen}
            >
              {token ? 'Профиль ▾' : 'Меню ▾'}
            </button>

            {menuOpen && (
              <div style={styles.dropdown}>
                <Link to="/catalog" style={styles.dropdownItem} onClick={() => setMenuOpen(false)}>
                  Каталог
                </Link>
                <Link to="/favorites" style={styles.dropdownItem} onClick={() => setMenuOpen(false)}>
                  Избранное
                </Link>

                {!token && (
                  <Link to="/login" style={styles.dropdownItem} onClick={() => setMenuOpen(false)}>
                    Войти
                  </Link>
                )}

                {token && (
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    style={styles.dropdownButton}
                  >
                    Выйти
                  </button>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#fff',
    borderBottom: '1px solid #eaeaea',
    padding: '0 20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoLink: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  brand: {
    fontWeight: '700',
    fontSize: 22,
    color: '#007bff',
    userSelect: 'none',
  },
  search: {
    flex: 1,
    maxWidth: 400,
    marginLeft: 30,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
  },
  searchInput: {
    flex: 1,
    border: 'none',
    padding: '8px 12px',
    fontSize: 16,
    outline: 'none',
  },
  searchButton: {
    backgroundColor: '#007bff',
    border: 'none',
    color: '#fff',
    padding: '0 16px',
    fontSize: 18,
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    userSelect: 'none',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: 24,
    marginLeft: 30,
  },
  navLink: {
    textDecoration: 'none',
    color: '#007bff',
    fontWeight: 500,
    fontSize: 15,
    transition: 'color 0.2s',
    cursor: 'pointer',
    userSelect: 'none',
  },
  userMenu: {
    position: 'relative',
  },
  userButton: {
    background: 'none',
    border: 'none',
    color: '#007bff',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: 15,
    userSelect: 'none',
  },
  dropdown: {
    position: 'absolute',
    top: 'calc(100% + 6px)',
    right: 0,
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    borderRadius: 8,
    minWidth: 160,
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1000,
  },
  dropdownItem: {
    padding: '12px 16px',
    textDecoration: 'none',
    color: '#333',
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
    userSelect: 'none',
    borderBottom: '1px solid #eee',
    transition: 'background-color 0.2s',
  },
  dropdownButton: {
    background: 'none',
    border: 'none',
    padding: '12px 16px',
    fontSize: 14,
    fontWeight: 500,
    textAlign: 'left',
    cursor: 'pointer',
    color: '#d93025',
    userSelect: 'none',
    borderTop: '1px solid #eee',
  },
};

export default Header;
