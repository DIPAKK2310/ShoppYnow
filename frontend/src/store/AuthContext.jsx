import axios from 'axios';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';


// Create the AuthContext to provide authentication data globally
const AuthContext = createContext();

// AuthProvider component that provides authentication-related values to the app
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const isLoggedIn = !!token; // ✅ derived from token
  let navigate = useNavigate();

  // Accept an optional tokenOverride so we can pass the fresh token
  // right after login (before state has re-rendered).
  const fetchUserData = useCallback(async (tokenOverride) => {
    const activeToken = tokenOverride || token;

    if (!activeToken) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/getuserData`,
        {
          headers: {
            Authorization: `Bearer ${activeToken}`,
          },
        }
      );
      // Backend returns { userData: ..., message: ... }
      setUser(response.data.userData);
      setIsAdmin(response.data.userData?.role === "admin");
      console.log("fetch user: ", response.data.userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Only clear token on auth errors (401/403), not on network glitches
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setIsAdmin(false);
      }
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Handle login (store token and user data)
  const saveToken = async (newToken) => {
    localStorage.setItem("token", newToken); // Save the token to localStorage
    setToken(newToken); // Update the token state
    // Pass the new token directly so fetchUserData doesn't read stale state
    await fetchUserData(newToken);
  };

  // Handle logout (remove token and user data)
  const removeToken = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null); //Update state to remove token
    setUser(null); //Reset user Data
    setIsAdmin(false);
    setLoading(false);
  }, []);

  // On initial load, check if there is a token and fetch user data
  useEffect(() => {
    if (token) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, []); // Only run on mount, not on every token change

  return (
    <AuthContext.Provider value={{ token, saveToken, removeToken, user, loading, setIsAdmin, isAdmin, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access authentication values and functions
export const useAuth = () => {
  return useContext(AuthContext);
};
