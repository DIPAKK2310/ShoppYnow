import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';


// Create the AuthContext to provide authentication data globally
const AuthContext = createContext();

// AuthProvider component that provides authentication-related values to the app
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const[user, setUser]= useState(null)
  const[loading, setLoading]=useState(true)
   const[isAdmin,setIsAdmin]=useState(false)

     const isLoggedIn = !!token; // ✅ derived from token


  const fetchUserData = async () => {
     
    if (token) {
      try {
        const response = await axios.get('http://localhost:4000/api/auth/getuserData', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
        setIsAdmin(response.data.userData?.role === "admin") // Or however you check role
        console.log("fetch user: ",response.data.userData)
      } catch (error) {
        console.error('Error fetching user data:', error);
        removeToken();
       
      }
      setLoading(false);
    }
  };

  // Handle login (store token and user data)
  const saveToken = async (newToken) => {
     localStorage.setItem("token", newToken); // Save the token to localStorage
    setToken(newToken); // Update the token state
     await fetchUserData();

  
  };
  // Handle logout (remove token and user data)
  const removeToken = () => {
    localStorage.removeItem("token");
    setToken(null); //Update state to remove token
    setUser(null); //Reset user Data
    setIsAdmin(false);
    // setLoading(false);
   
  };
  // On initial load, check if there is a token and fetch user data
  useEffect(()=>{
    if (token) {
      fetchUserData();
    } else {
      setLoading(false)
    }
  },[]);



  return (
    <AuthContext.Provider value={{ token, saveToken, removeToken,user,loading,setIsAdmin,isAdmin,isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access authentication values and functions
export const useAuth = () => {
  return useContext(AuthContext);
};










