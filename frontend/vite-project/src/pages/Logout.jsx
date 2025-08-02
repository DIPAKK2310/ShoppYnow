import React, { useEffect } from 'react'
import { useAuth } from '../store/AuthContext';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';


export default function Logout() {
    const  {removeToken}  = useAuth();  // Get the logout function from AuthContext
    
    useEffect(()=>{
      toast.success("You have been logged out successfully.")
      removeToken()
    },[removeToken])

 
 
  
  return <Navigate to="/login" />
}
