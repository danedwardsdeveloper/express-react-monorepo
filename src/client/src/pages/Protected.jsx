import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_NODE_ENV === 'production'
  ? `${import.meta.env.VITE_DEPLOYED_SITE_URL}/api`
  : 'http://localhost:3000/api';

function Protected() {
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/protected`, { withCredentials: true });
        setUserId(response.data.userId);
        setError(null);
      } catch (error) {
        console.error('Authentication failed:', error.response ? error.response.data : error.message);
        setError('Authentication failed. Please log in.');
        navigate('/');
      }
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!userId) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Hello User {userId}!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Protected;