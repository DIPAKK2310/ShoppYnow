// src/context/ThemeContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create a Context for Dark Mode
 export const ThemeContext = createContext();

// Create a custom hook that wraps useContext to provide easier access to the theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context; // Returns an array [theme, toggleTheme]
};
export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // Check if dark mode preference is saved in localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
  }, []);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode); // Persist dark mode state in localStorage
      return newMode;
    });
  };
    // Apply dark mode styles to the body when darkMode changes
    useEffect(() => {
      if (darkMode) {
        document.body.classList.add('bg-dark', 'text-white');
      } else {
        document.body.classList.remove('bg-dark', 'text-white');
      }
    }, [darkMode]);




  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
