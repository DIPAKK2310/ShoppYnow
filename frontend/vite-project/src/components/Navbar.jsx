import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemContext';
import { IoIosSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa6";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useAuth } from '../store/AuthContext';

function Navbar({isDarkMode}) {
  const{darkMode, toggleDarkMode}= useContext(ThemeContext)   // Access context values here 
    // State to determine if the user is logged in
    const [isLoggedIn,  removeToken, isAdmin ] = useAuth(); // 👈 use values from context

    const [searchQuery, setSearchQuery] = useState(''); // Initialize searchQuery state


    const navigate = useNavigate();

    const location = useLocation();

    const hideAuthButtons = ["/login", "/register"].includes(location.pathname)    // ✅ hide login/logout buttons on register and login routes

    // // Handle login/logout actions
    // const handleLogin = () => {
    //   setIsLoggedIn(true);
    // };
  
    // const handleLogout = () => {
    //   setIsLoggedIn(false);

    // };

        // Handle search input change
        const handleSearchChange = (e) => {
          setSearchQuery(e.target.value);
      };
  
      // Handle search form submission (navigate to the search results page)
      const handleSearchSubmit = (e) => {
          e.preventDefault();
          if (searchQuery.trim()) {
              navigate(`/search?query=${searchQuery}`); // Navigate to the search results page with query params
          }
      };
  
    
   
  return (
    <nav className={`navbar navbar-expand-lg ${darkMode?'navbar-dark bg-dark':'navbar-light bg-light'}`} >
      <div className="container ">
        <Link className="navbar-brand" to="/">ShoppYnow</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-5">
          <li className='nav-item '>
            <form className='d-flex'style={{width:'35rem'}} onSubmit={handleSearchSubmit}>
              <input
                  className="form-control me-5 w-100 w-lg-auto"
                  
                  type="search"
                  placeholder="...Search products"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
              />
               <button className="btn btn-outline-success" type="submit"><FaMagnifyingGlass/></button>
            </form>
          </li>
          <li className="nav-item">
              <Link className="nav-link"  to="/ProductsPages">Products</Link>
            </li>
            
            
           {/* Conditionally render Login or Logout based on the isLoggedIn state */}
        {!isLoggedIn ? (
          <li className="nav-item">
            <Link className="nav-link"  to="/login" onClick={handleLogin}>
              Login
            </Link>
          </li>
        ) : (
          <li className="nav-item" >
            <Link
              className="btn btn-danger" 
              to="/logout"
              onClick={handleLogout} // Handle logout
            >
              Logout
            </Link>
          </li>
        )}
        
            
            <li className="nav-item">
              <Link className="nav-link"  to="/admin"><AdminPanelSettingsIcon/></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link"  to="/cart"><ShoppingCartIcon/></Link>
            </li>
                <button
                className='btn btn-light py-1'
                onClick={toggleDarkMode}
                >
                    { isDarkMode ? <IoIosSunny/>:<FaMoon/>}
          </button>
           
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
