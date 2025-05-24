// src/user/context/AuthContext.js
import { createContext } from 'react';

const AuthContext = createContext({
  token: null,
  username: null, // Қолданушы аты керек
  setToken: () => {},
  setUsername: () => {}, // Қолданушы атын жаңарту
});

export default AuthContext;
