import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_NODE_ENV === 'production'
  ? `${import.meta.env.VITE_DEPLOYED_SITE_URL}/api`
  : 'http://localhost:3000/api';

function LoginForm() {
  const [email, setEmail] = useState('user@gmail.com');
  const [password, setPassword] = useState('securePassword');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password }, { withCredentials: true });
      console.log('Login successful:', response.data);
      navigate('/protected');
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;