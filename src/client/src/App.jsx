import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Protected from './pages/Protected';

axios.defaults.withCredentials = true;

const API_BASE_URL = import.meta.env.VITE_NODE_ENV === 'production'
  ? `${import.meta.env.VITE_DEPLOYED_SITE_URL}/api`
  : 'http://127.0.0.1:3000/api';

console.log(`Base URL: ${API_BASE_URL}`);

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchApiMessage();
  }, []);

  const fetchApiMessage = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error fetching API message:', error);
    }
  };

  return (
    <Router>
      <div>
        <h1>{message}</h1>
        <Navigation />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/protected" element={<Protected />} />
        </Routes>

        <button onClick={fetchApiMessage}>Refresh API Message</button>
      </div>
    </Router>
  );
}

export default App;