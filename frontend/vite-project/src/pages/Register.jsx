import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../store/AuthContext';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-hot-toast';

function Register() {

  const{saveToken}=useAuth()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission (page reload)
  
    setLoading(true); // Start loading
    setError(null); // Reset error message before submitting the form
  
    try {
      // Makes a POST request to the backend API to register the user
      const response = await axios.post(
        'http://localhost:4000/api/auth/register',
        formData,
        {
          headers: {
            'Content-Type': 'application/json', // Sets the content type for the request
          },
        }
      );
  
      // Handle the response status and data
      if (response.status === 200) {
        // console.log('Registration successful:', response.data);
        
        toast.success('🎉Registration successful!');
        saveToken(response.data.token)
        setFormData({ username: '', email: '', password: '' }); // Reset form
        navigate('/login'); // Redirect to login page after successful registration
      } else {
        setError('Registration failed');
        toast.error('❌Registration failed. Please try again.'); // Display error message
      }
    } catch (error) {
      console.error('Error during registration:', error);
  
      // Check if error is due to a conflict (409)
      if (error.response && error.response.status === 409) {
        const errorMessage = error.response.data.message || 'This email or username is already taken.';
        setError(errorMessage); // Display a conflict-specific error message
      } else {
        setError('An error occurred during registration. Please try again.');
      }
    } finally {
      setLoading(false); // End loading, regardless of success or error
    }
  };
  


  return (
   
    <div className='container mt-5'> 
      <div className='row justify-content-center'>
    <div className='col-12 col-md-6'>
      <div className='card'>
        <div className='card-header text-center'>

      <h2 className='text-center mb-4'>Register</h2>
        </div>
        <div className='card-body'>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            placeholder='Enter your username'
            value={formData.username}
            onChange={handleChange}
            disabled={loading} // Disable input while loading
            />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder='Enter your Email'
            value={formData.email}
            onChange={handleChange}
            disabled={loading} // Disable input while loading
            />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder='Enter your password'
            value={formData.password}
            onChange={handleChange}
            disabled={loading} // Disable input while loading
            />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        <div className='d-grid'>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        </div>
      </form>
        </div>
            </div>
    </div>
    </div>
    </div>
    
  );
}

export default Register;
