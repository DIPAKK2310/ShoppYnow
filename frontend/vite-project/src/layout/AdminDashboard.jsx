import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemContext';
import Users from './Users';

const AdminDashboard = () => {

  const { darkMode } = useTheme();  // Get darkMode state from context
  const [users, setUsers] = useState([]); // Assuming you need users data
  useEffect(()=>{
    const fetchApi=async()=>{
       try {
            const token = localStorage.getItem('token');//for admin added 17/1/25
           const response= await axios.get('http://localhost:4000/api/admin/users',{
            headers:{Authorization:`Bearer ${token}`},
           })
           setUsers(response.data)
       } catch (error) {
           console.log(error)
       }
    };
    fetchApi()
   },[]);

   useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get("http://localhost:4000/api/auth/admin", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage(response.data.message);
      } catch (error) {
        alert("You are not authorized to access this page");
      }
    };

    fetchAdminData();
  }, []);
   
  return (
    <div className={`container-fluid ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <div className="row">
        {/* Sidebar */}
        <div className="sidebar  col-12 col-md-6  col-xl-2   h-100% " >
          <h3 className="text-center py-2">Admin Dashboard</h3>
          <br />
          <ul className="nav flex-column item-center ">
          
            <li className="nav-item">
              <Link className={`nav-link ${darkMode ? 'text-white' : 'text-dark'}`} to="/admin/users">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${darkMode ? 'text-white' : 'text-dark'}`} to="/admin/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${darkMode ? 'text-white' : ' text-dark'}`} to="/admin/messages">
                Messages
              </Link>
            </li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="col-md-9 col-lg-10 p-4">
   
          <div className="mt-4">
            {/* Render the child components via Outlet */}
            <Outlet />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
