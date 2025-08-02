import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useAuth } from '../store/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { toast } from 'react-hot-toast';

// LoginForm component for user login functionality
const Login = () => {
  const navigate = useNavigate(); // Used to navigate programmatically to different routes
  const { saveToken } = useAuth(); // Custom hook for saving the authentication token
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // State to track loading state during form submission
  const [error, setError] = useState(""); // State to track error messages during login

  // handleChange updates the formData state when user types in the form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handleSubmit is called when the form is submitted
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submission (page reload)

    setLoading(true); // Start loading
    setError(""); // Reset error message before submitting the form

    try {
      // Makes a POST request to the backend API to authenticate the user
      const response = await axios.post(
        "http://localhost:4000/api/auth/login", // The backend URL for login
        formData, // Sends the form data (email and password) as the request body
        {
          headers: {
            "Content-Type": "application/json", // Sets the content type for the request
          },
        }
      );

      if (response.status === 200) {
        // If the login is successful (status code 200), handle the success
        const responseData = response.data; // The response data (likely includes a token)
        console.log("Login successful:", responseData);
        toast.success("Login successful!"); // Alerts the user about the successful login

        saveToken(responseData.token); // Save the token (authentication) in your app's context or store
        setFormData({ email: "", password: "" }); // Clear the form data after successful login
        navigate("/"); // Redirect to home page after successful login
        return;
      } else {
        // If the login is unsuccessful, set the error message
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error); // Logs any error that occurs during the API request
      toast.error(error.response?.data?.message || "Login failed. Try again.")
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false); // End loading, regardless of success or error
    }
  };


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center">
              <h4>Login</h4>
            </div>
            <div className="card-body"> 
              {/* The login form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required // Makes the input field required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required // Makes the input field required
                  />
                </div>

             

                <div className="d-grid">
                  {/* Submit button */}
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Logging in..." : "Login"} {/* Changes button text while loading */}
                  </button>
                </div>
              </form>

              {/* Register Link */}
              <p className="mt-3 text-center">
                Don't have an account? <Link to="/register" className='hover-underline text-decoration-none '>Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
