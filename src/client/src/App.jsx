import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;

const API_BASE_URL = import.meta.env.VITE_NODE_ENV === 'production' ?
   `${import.meta.env.VITE_DEPLOYED_SITE_URL}/api`: 
   'http://localhost:3000/api';

console.log(`Base URL: ${API_BASE_URL}`);
   
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
   
   function ProtectedRoute() {
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

    if (error) {
      return <div>{error}</div>;
    }
  
    if (!userId) {
      return <div>Loading...</div>;
    }
   
     const handleLogout = async () => {
       try {
         await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
         navigate('/');
       } catch (error) {
         console.error('Logout failed:', error);
       }
     };
   
     return (
       <div>
         <h2>Hello {userId}!</h2>
         <button onClick={handleLogout}>Logout</button>
       </div>
     );
   }
   
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
           <nav>
             <ul>
               <li><Link to="/">Home</Link></li>
               <li><Link to="/protected">Protected</Link></li>
             </ul>
           </nav>
   
           <Routes>
            <Route path="/" element={
              <>
                <h2>Hey there!</h2>
                <LoginForm />
              </>
            } />
            <Route path="/protected" element={<ProtectedRoute />} />
           </Routes>
   
           <button onClick={fetchApiMessage}>Refresh API Message</button>
         </div>
       </Router>
     );
   }
   
   export default App;