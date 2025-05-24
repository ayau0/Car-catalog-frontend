import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await axios.post('http://localhost:8081/register', {
        username,
        password,
      });
      navigate('/login');
    } catch (err) {
      setError('Ошибка регистрации: возможно, пользователь уже существует');
    }
  };

  return (
    <div style={container}>
      <h2 style={title}>Регистрация</h2>
      <form onSubmit={handleSubmit} style={form}>
        <label style={label}>Имя пользователя</label>
        <input
          type="text"
          value={username}
          autoComplete="username"
          onChange={(e) => setUsername(e.target.value)}
          required
          style={input}
          placeholder="Введите имя пользователя"
        />

        <label style={label}>Пароль</label>
        <input
          type="password"
          value={password}
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
          required
          style={input}
          placeholder="Введите пароль"
        />

        {error && <p style={errorText}>{error}</p>}

        <button type="submit" style={button}>Зарегистрироваться</button>
      </form>

      <p style={bottomText}>
        Уже есть аккаунт? <Link to="/login" style={link}>Войти</Link>
      </p>
    </div>
  );
};

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
  outlineColor: '#28a745',
  transition: 'border-color 0.3s',
};

const button = {
  padding: '14px',
  backgroundColor: '#28a745',
  border: 'none',
  borderRadius: 8,
  color: '#fff',
  fontWeight: '700',
  fontSize: 18,
  cursor: 'pointer',
  boxShadow: '0 4px 12px rgba(40,167,69,0.4)',
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
  color: '#28a745',
  textDecoration: 'none',
  fontWeight: '600',
};

export default Register;
