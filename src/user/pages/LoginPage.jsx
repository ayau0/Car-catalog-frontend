import React from 'react';
import Login from '../components/Login';

const LoginPage = () => {
  return (
    <div style={{
      maxWidth: 400,
      margin: '100px auto',
      padding: 20,
      border: '1px solid #ddd',
      borderRadius: 8,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      backgroundColor: '#fff',
    }}>
      <h2 style={{ textAlign: 'center' }}>Вход в систему</h2>
      <Login />
    </div>
  );
};

export default LoginPage;
