import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const AdminDashboard = () => {
  const { darkMode } = useTheme();
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ users: 0, products: 0 });
  const location = useLocation();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API}/api/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
        setStats((prev) => ({ ...prev, users: response.data.length }));
      } catch (error) {
        console.error('Error fetching users:', error.response?.data?.message || error.message);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API}/api/products`);
        setStats((prev) => ({ ...prev, products: response.data.length }));
      } catch (error) {
        console.error('Error fetching products count:', error.message);
      }
    };

    fetchUsers();
    fetchProducts();
  }, []);

  const navItems = [
    { label: '👥 Users', path: '/admin/users' },
    { label: '🛍️ Products', path: '/admin/products' },
    { label: '💬 Messages', path: '/admin/messages' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#0a0a0a',
        color: '#f1f1f1',
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: '240px',
          flexShrink: 0,
          background: '#111111',
          borderRight: '1px solid rgba(245,158,11,0.15)',
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem 1.25rem',
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div
            style={{
              fontSize: '18px',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #f59e0b, #f97316)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px',
            }}
          >
            ShoppYnow
          </div>
          <div style={{ color: '#555', fontSize: '12px', marginTop: '2px' }}>
            Admin Dashboard
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            marginBottom: '2rem',
          }}
        >
          {[
            { label: 'Users', value: stats.users, icon: '👥' },
            { label: 'Products', value: stats.products, icon: '📦' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: 'rgba(245,158,11,0.08)',
                border: '1px solid rgba(245,158,11,0.2)',
                borderRadius: '10px',
                padding: '10px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '18px' }}>{stat.icon}</div>
              <div style={{ fontWeight: 700, fontSize: '18px', color: '#f59e0b' }}>
                {stat.value}
              </div>
              <div style={{ color: '#666', fontSize: '11px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1 }}>
          <div style={{ color: '#555', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
            Navigation
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  style={{
                    display: 'block',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: isActive(item.path) ? 700 : 500,
                    fontSize: '14px',
                    color: isActive(item.path) ? '#111' : '#aaa',
                    background: isActive(item.path)
                      ? 'linear-gradient(135deg, #f59e0b, #f97316)'
                      : 'transparent',
                    border: isActive(item.path)
                      ? 'none'
                      : '1px solid transparent',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(item.path)) {
                      e.currentTarget.style.background = 'rgba(245,158,11,0.1)';
                      e.currentTarget.style.color = '#f59e0b';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.path)) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#aaa';
                    }
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <button
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            window.location.href = '/admin/login';
          }}
          style={{
            marginTop: 'auto',
            background: 'rgba(239,68,68,0.1)',
            color: '#ef4444',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '8px',
            padding: '10px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          🚪 Logout
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, overflow: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
