import  { useEffect } from 'react'
import { useAuth } from '../store/AuthContext';
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';


export default function Logout() {
    const  {removeToken}  = useAuth();  // Get the logout function from AuthContext
    const navigate = useNavigate()
    
    useEffect(()=>{
      toast.success("You have been logged out successfully.");
      removeToken();

      const timer= setTimeout (() => {

          navigate("/login")
    },1000)
        
        
    return () => clearTimeout(timer);

    },[removeToken, navigate]);


  return null; //nothing while waiting
}
