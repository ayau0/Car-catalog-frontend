import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext'; // или твой путь
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const container = {
  maxWidth: 400,
  margin: '80px auto',
  padding: 30,
  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
  borderRadius: 12,
  backgroundColor: '#fff',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  color: '#333',
};

const title = {
  marginBottom: 24,
  textAlign: 'center',
  fontWeight: '700',
  fontSize: '28px',
};

const form = {
  display: 'flex',
  flexDirection: 'column',
};

const label = {
  marginBottom: 8,
  fontWeight: '600',
  fontSize: 14,
  color: '#555',
};

const input = {
  padding: '12px 15px',
  marginBottom: 20,
  borderRadius: 8,
  border: '1.8px solid #ccc',
  fontSize: 16,
  outlineColor: '#007bff',
  transition: 'border-color 0.3s',
};

const button = {
  padding: '14px',
  backgroundColor: '#007bff',
  border: 'none',
  borderRadius: 8,
  color: '#fff',
  fontWeight: '700',
  fontSize: 18,
  cursor: 'pointer',
  boxShadow: '0 4px 12px rgba(0,123,255,0.4)',
  transition: 'background-color 0.3s',
};

const errorText = {
  color: '#d93025',
  marginBottom: 16,
  fontWeight: '600',
  textAlign: 'center',
};

const bottomText = {
  marginTop: 20,
  textAlign: 'center',
  fontSize: 14,
  color: '#666',
};

const link = {
  color: '#007bff',
  textDecoration: 'none',
  fontWeight: '600',
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { setToken, setUsername: setAuthUsername } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://localhost:8081/login', {
        username,
        password,
      });
      setToken(response.data.token);
      setAuthUsername(username);  // сохраняем username
      if (username === 'admin1') {
        navigate('/admin');  // редирект в админ панель
      } else {
        navigate('/cars');   // редирект в пользовательскую панель
      }
    } catch (err) {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div style={container}>
      <h2 style={title}>Вход</h2>
      {error && <div style={errorText}>{error}</div>}
      <form style={form} onSubmit={handleSubmit}>
        <label style={label} htmlFor="username">Имя пользователя</label>
        <input
          style={input}
          id="username"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <label style={label} htmlFor="password">Пароль</label>
        <input
          style={input}
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button style={button} type="submit">Войти</button>
      </form>
      <p style={bottomText}>
        Нет аккаунта? <a style={link} href="/register">Зарегистрируйтесь</a>
      </p>
    </div>
  );
};

export default Login;
