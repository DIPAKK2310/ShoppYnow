import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import axios to make API requests
import { toast } from 'react-hot-toast';

const AdminDashboardLogin = ({onLogin}) => {
  // State to manage form input (email, password)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State for handling errors
  const [error, setError] = useState('');

  // Hook for navigation after login
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update form data dynamically based on input name
    }));
  };

  // Handle login submission (with actual API integration)
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your backend API for authentication
      const response = await axios.post('http://localhost:4000/api/admin/login', formData);

      if (response.status === 200) {
        // Save token and role in localStorage (using the response from the backend)
        localStorage.setItem('token', response.data.token);  // The backend will return a token
        localStorage.setItem('role', response.data.admin.role);  // Assuming the backend also returns the user role
         toast.success("Admin login successful");

        onLogin();
        // Redirect to the admin dashboard
        navigate('/admin');
      }
    } catch (error) {
      // Set error message if authentication fails
      if (error.response) {
        setError(error.response.data.message); // Assuming backend sends an error message
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-md-6">
        <div className="card shadow-sm">
          <div className="card-header text-center">
            <h4>Admin Login</h4>
          </div>
          <div className="card-body">
            {/* Login Form */}
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email" // The name of the input field, tied to the state field
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange} // Handle change event
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password" // The name of the input field, tied to the state field
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange} // Handle change event
                  required
                />
              </div>

              {/* Display error message if authentication fails */}
              {error && <div className="alert alert-danger">{error}</div>}

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLogin;
