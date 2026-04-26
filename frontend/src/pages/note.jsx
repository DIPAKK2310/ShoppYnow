import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboardLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Simulate authentication (replace with your actual authentication logic)
    if (email === 'admin@example.com' && password === 'admin123') {
      // Save token and role in localStorage
      localStorage.setItem('token', 'your-token'); // Replace with actual token from backend
      localStorage.setItem('role', 'admin');
      
      // Redirect to admin dashboard
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className='container mt-5'>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div className='mb-3'>
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className='mb-3'>
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AdminDashboardLogin;
