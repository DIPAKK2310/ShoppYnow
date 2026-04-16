import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemContext";
import { IoIosSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa6";
import {
  LuSearch,
  LuShoppingBag,
  LuHeart,
  LuUser,
  LuMenu,
  LuX,
} from "react-icons/lu";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useAuth } from "../store/AuthContext";

function Navbar() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { isLoggedIn, removeToken, isAdmin, user } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const hideAuthButtons = ["/login", "/register"].includes(
    location.pathname
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    removeToken();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
      setSearchOpen(false);
    }
  };

  return (
    <>
      {/* 🔥 NAVBAR */}
      <nav
        className={`navbar navbar-expand-lg sticky-top ${
          darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
        } ${scrolled ? "shadow-sm" : ""}`}
      >
        <div className="container">

          {/* MOBILE TOGGLE */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <LuMenu size={20} />
          </button>

          {/* LOGO */}
          <Link className="navbar-brand mx-auto fw-light" to="/">
            ShoppYnow
          </Link>


          {/* MENU */}
          <div className="collapse navbar-collapse align-items-end" id="navbarNav">

            <ul className="navbar-nav mx-auto mt-3 mt-lg-0 gap-3">

              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/ProductsPages">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/aboutUs">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact-us">
                  Contact
                </Link>
              </li>

            </ul>

            
          {/* RIGHT ICONS */}
          <div className="d-flex align-items-center gap-2">

            {/* SEARCH TOGGLE */}
            <button
              className={`btn btn-link ${darkMode ? "text-light" : "text-dark"}`}
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <LuSearch size={18} />
            </button>

            {/* USER */}
            <div className="d-none d-sm-flex align-items-center">
              <LuUser size={18} className="me-1" />
              <small>
                {isLoggedIn
                  ? user?.username || "User"
                  : "Guest"}
              </small>
            </div>

            {/* ADMIN */}
            {isAdmin && (
              <Link className="btn btn-link text-dark" to="/admin">
                <AdminPanelSettingsIcon />
              </Link>
            )}

            {/* CART */}
            <Link
              className={`btn btn-link position-relative ${darkMode ? "text-light" : "text-dark"}`}
              to="/cart"
            >
              <LuShoppingBag size={18} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                3
              </span>
            </Link>

            {/* THEME */}
            <button
              className="btn btn-light py-1"
              onClick={toggleDarkMode}
            >
              {darkMode ? <IoIosSunny /> : <FaMoon />}
            </button>
          </div>
            {/* AUTH BUTTONS */}
            {!hideAuthButtons && (
              <div className="d-flex gap-2 ">
                {!isLoggedIn ? (
                  <Link className="btn btn-outline-primary" to="/login">
                    Login
                  </Link>
                ) : (
                  <button
                    className="btn btn-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* 🔥 SEARCH BAR */}
      {searchOpen && (
        <div className="border-top py-3 bg-light">
          <div className="container">
            <form onSubmit={handleSearchSubmit}>
              <div className="position-relative">
                <LuSearch className="position-absolute top-50 start-0 translate-middle-y ms-3" />

                <input
                  autoFocus
                  type="text"
                  className="form-control ps-5 pe-5"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="btn position-absolute top-50 end-0 translate-middle-y me-2"
                >
                  <LuX />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;