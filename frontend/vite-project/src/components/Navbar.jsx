import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemContext";
import { IoIosSunny } from "react-icons/io";
import { FaMoon, FaMagnifyingGlass } from "react-icons/fa6";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useAuth } from "../store/AuthContext";

function Navbar() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const { isLoggedIn, removeToken, isAdmin, user } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const hideAuthButtons = ["/login", "/register"].includes(
    location.pathname
  );

  const handleLogout = () => {
    removeToken();
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
      }`}
    >
      <div className="container">

        {/* LOGO */}
        <Link className="navbar-brand" to="/">
          ShoppYnow
        </Link>

        {/* TOGGLER */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          {/* LEFT SIDE */}
          <ul className="navbar-nav me-auto align-items-center gap-3">

            {/* SEARCH */}
            <li className="nav-item">
              <form
                className="d-flex"
                style={{ width: "22rem" }}
                onSubmit={handleSearchSubmit}
              >
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button className="btn btn-outline-success" type="submit">
                  <FaMagnifyingGlass />
                </button>
              </form>
            </li>

            {/* PRODUCTS */}
            <li className="nav-item">
              <Link className="nav-link" to="/ProductsPages">
                Products
              </Link>
            </li>

          </ul>

          {/* RIGHT SIDE */}
          <ul className="navbar-nav align-items-center gap-3">

            {/* 👋 USER / GUEST */}
            <li className="nav-item text-white">
              {isLoggedIn
                ? `👋 Welcome, ${user?.username || "User"}`
                : "👋 Welcome, Guest"}
            </li>

            {/* AUTH BUTTONS */}
            {!hideAuthButtons && (
              !isLoggedIn ? (
                <li className="nav-item">
                  <Link className="btn btn-outline-light" to="/login">
                    Login
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <button
                    className="btn btn-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              )
            )}

            {/* ADMIN */}
            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  <AdminPanelSettingsIcon />
                </Link>
              </li>
            )}

            {/* CART */}
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <ShoppingCartIcon />
              </Link>
            </li>

            {/* THEME TOGGLE */}
            <li className="nav-item">
              <button
                className="btn btn-light py-1"
                onClick={toggleDarkMode}
              >
                {darkMode ? <IoIosSunny /> : <FaMoon />}
              </button>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;