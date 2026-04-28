// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';
// import { useAuth } from '../store/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom'; // Import Link for navigation
// import { toast } from 'react-hot-toast';
// import bgEcomm from '../assets/bg-ecomm.jpg'
// // LoginForm component for user login functionality
// const Login = () => {
//   const navigate = useNavigate(); // Used to navigate programmatically to different routes
//   const { saveToken } = useAuth(); // Custom hook for saving the authentication token

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false); // State to track loading state during form submission
//   const [error, setError] = useState(""); // State to track error messages during login

//   // handleChange updates the formData state when user types in the form fields
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // handleSubmit is called when the form is submitted
//   const handleSubmit = async (event) => {
//     event.preventDefault(); // Prevents the default form submission (page reload)

//     setLoading(true); // Start loading
//     setError(""); // Reset error message before submitting the form

//     try {
//       // Makes a POST request to the backend API to authenticate the user
//       const response = await axios.post(
//         "http://localhost:4000/api/auth/login", // The backend URL for login
//         formData, // Sends the form data (email and password) as the request body
//         {
//           headers: {
//             "Content-Type": "application/json", // Sets the content type for the request
//           },
//         }
//       );

//       if (response.status === 200) {
//         // If the login is successful (status code 200), handle the success
//         const responseData = response.data; // The response data (likely includes a token)
//         console.log("Login successful:", responseData);
//         toast.success("Login successful!"); // Alerts the user about the successful login

//         saveToken(responseData.token); // Save the token (authentication) in your app's context or store
//         setFormData({ email: "", password: "" }); // Clear the form data after successful login
//         navigate("/"); // Redirect to home page after successful login
//         return;
//       } else {
//         // If the login is unsuccessful, set the error message
//         setError("Login failed. Please check your credentials.");
//       }
//     } catch (error) {
//       console.error("Login error:", error); // Logs any error that occurs during the API request
//       toast.error(error.response?.data?.message || "Login failed. Try again.")
//       setError("An error occurred during login. Please try again.");
//     } finally {
//       setLoading(false); // End loading, regardless of success or error
//     }
//   };

//   return (

//     <div className='position-relative vh-100'>

//     <div

//      style={{
//       minHeight:"calc(100vh - 56px)",
//       backgroundImage:`url(${bgEcomm})`,
//        backgroundRepeat:'no-repeat',
//        backgroundSize:'cover',
//       filter:'blur(2px)',
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       zIndex: 0

//      }}
//     >
//       </div>
//     <div className="container  position-relative " style={{zIndex:1,height:"calc(100vh - 56px)"}}>
//       <div className="row h-100 align-items-center justify-content-center ">

//         {/* Right Login card*/}
//         <div className="col-12 col-md-6">
//           <div className="card">
//             <div className="card-header text-center">
//               <h4>Login</h4>
//             </div>
//             <div className="card-body">
//               {/* The login form */}
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <label htmlFor="email" className="form-label">Email address</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     id="email"
//                     placeholder="Enter your email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required // Makes the input field required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="password" className="form-label">Password</label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     id="password"
//                     placeholder="Enter your password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required // Makes the input field required
//                   />
//                 </div>

//                 <div className="d-grid">
//                   {/* Submit button */}
//                   <button type="submit" className="btn btn-primary" disabled={loading}>
//                     {loading ? "Logging in..." : "Login"} {/* Changes button text while loading */}
//                   </button>
//                 </div>
//               </form>

//               {/* Register Link */}
//               <p className="mt-3 text-center">
//                 Don't have an account? <Link to="/register" className='hover-underline text-decoration-none '>Register</Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//     </div>
//   );
// }

// export default Login;

import { useState } from "react";
import { motion } from "framer-motion";
import { LuEye, LuEyeOff, LuMail, LuLock, LuArrowRight } from "react-icons/lu";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Login Successful 🚀");
    }, 1500);
  };

  return (
    <div className="container-fluid min-vh-100 p-0">
        <div className="row g-0 min-vh-100">
      {/* LEFT SIDE */}
      <div className="d-none d-lg-flex col-lg-6 position-relative overflow-hidden align-items-center justify-content-center bg-light">
        {/* Decorative elements */}
        <div className="position-absolute w-100 h-100">
          <motion.div
            className="position-absolute border rounded-circle"
            style={{
              top: "10%",
              left: "15%",
              width: "280px",
              height: "280px",
              borderColor: "rgba(0,123,255,0.2)",
            }}
            animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />

          <motion.div
            className="position-absolute border rounded-circle"
            style={{
              bottom: "15%",
              right: "10%",
              width: "350px",
              height: "350px",
              borderColor: "rgba(0,123,255,0.1)",
            }}
            animate={{ scale: [1.1, 1, 1.1], rotate: [360, 180, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />

          <motion.div
            className="position-absolute rounded-circle"
            style={{
              top: "40%",
              left: "40%",
              width: "180px",
              height: "180px",
              background: "rgba(0,123,255,0.05)",
            }}
            animate={{ y: [-20, 20, -20] }}
            transition={{ duration: 6, repeat: Infinity }}
          />

          <motion.div
            className="position-absolute rounded-circle"
            style={{
              top: "20%",
              right: "25%",
              width: "10px",
              height: "10px",
              background: "rgba(0,123,255,0.4)",
            }}
            animate={{ y: [-10, 10, -10], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <motion.div
            className="position-absolute rounded-circle"
            style={{
              bottom: "30%",
              left: "25%",
              width: "8px",
              height: "8px",
              background: "rgba(0,123,255,0.6)",
            }}
            animate={{ y: [10, -10, 10], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>

        {/* Center illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="position-relative text-center px-4"
          style={{ zIndex: 2 }}
        >
          {/* Bag illustration */}
          <div
            className="position-relative mx-auto mb-4"
            style={{ width: "200px", height: "240px" }}
          >
            <motion.div
              className="position-absolute w-100 h-100 border rounded-4"
              style={{
                borderColor: "rgba(0,123,255,0.3)",
                background: "rgba(0,123,255,0.05)",
              }}
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ duration: 5, repeat: Infinity }}
            />

            <motion.div
              className="position-absolute d-flex align-items-center justify-content-center"
              style={{
                inset: "10px",
                borderRadius: "12px",
                border: "1px solid rgba(0,123,255,0.2)",
                background: "rgba(0,123,255,0.1)",
              }}
              animate={{ rotate: [3, -3, 3] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              {/* SVG FIXED */}
              <svg
                viewBox="0 0 80 80"
                width="80"
                height="80"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary"
              >
                <path
                  d="M20 25 C20 15 30 8 40 8 C50 8 60 15 60 25"
                  strokeLinecap="round"
                />
                <rect x="12" y="25" width="56" height="45" rx="4" />
                <circle cx="40" cy="48" r="8" />
                <path
                  d="M37 48 L40 51 L44 45"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>

          <h2 className="mb-3 text-black">Welcome to ShoppYnow</h2>
          <p className="text-black small">
            Discover curated luxury collections crafted for the modern
            connoisseur.
          </p>

          {/* Tags */}
          <div className="d-flex justify-content-center gap-2 mt-4 flex-wrap">
            {["Premium", "Exclusive", "Curated"].map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.2 }}
                className="px-3 py-1 small border rounded-pill text-primary"
                style={{ borderColor: "rgba(0,123,255,0.2)" }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* RIGHT SIDE */}
      <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center p-3 p-lg-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-100 bg-white rounded-4 shadow-sm p-4 p-md-5"
          style={{ maxWidth: "420px" }}
        >
          <h2 className="mb-2 text-center text-muted text-lg-start">Sign In</h2>
          <p className="text-muted mb-4 text-center text-lg-start">
            Enter your credentials to continue
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <div className="input-group">
                <span className="input-group-text">
                  <LuMail />
                </span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <div className="input-group">
                <span className="input-group-text">
                  <LuLock />
                </span>

                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <LuEyeOff /> : <LuEye />}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="btn btn-dark w-100 d-flex align-items-center justify-content-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <motion.div
                  style={{
                    width: "20px",
                    height: "20px",
                    border: "2px solid white",
                    borderTop: "2px solid transparent",
                    borderRadius: "50%",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              ) : (
                <>
                  Sign In <LuArrowRight />
                </>
              )}
            </button>
          </form>

          {/* FOOTER */}
          <p className="text-center text-black mt-4">
            Don't have an account? <Link to="/register">Create Account</Link>
          </p>
        </motion.div>
      </div>
      </div>
    </div>
  );
};

export default Login;
