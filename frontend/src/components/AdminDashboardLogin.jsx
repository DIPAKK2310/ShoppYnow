import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  LuEye,
  LuEyeOff,
  LuMail,
  LuLock,
  LuArrowRight,
  LuShieldCheck,
  LuSparkles,
} from 'react-icons/lu';
import { MdAdminPanelSettings } from 'react-icons/md';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const AdminDashboardLogin = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await axios.post(`${API}/api/admin/login`, formData);

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.admin.role);
        toast.success('Welcome back, Admin! 🛡️');
        onLogin();
        navigate('/admin');
      }
    } catch (error) {
      const msg =
        error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(msg);
      setErrors({ general: msg });
    } finally {
      setIsLoading(false);
    }
  };

  /* Floating particles */
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 5 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 5 + 4,
    delay: Math.random() * 3,
  }));

  const inputStyle = (hasError) => ({
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: hasError
      ? '1px solid rgba(239,68,68,0.5)'
      : '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    padding: '14px 16px 14px 48px',
    color: '#e8e8e8',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.3s ease',
  });

  const iconBoxStyle = {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#f59e0b',
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <div
      style={{
        background: '#111111',
        minHeight: '100vh',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: 'rgba(245,158,11,0.12)',
            left: `${p.x}%`,
            top: `${p.y}%`,
            pointerEvents: 'none',
          }}
          animate={{ y: [-25, 25, -25], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity }}
        />
      ))}

      <div className="container-fluid p-0 d-flex" style={{ minHeight: '100vh' }}>
        <div className="row g-0 flex-grow-1 w-100">

          {/* ── LEFT SIDE — Branding ── */}
          <div
            className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center position-relative"
            style={{
              background:
                'linear-gradient(135deg, #111111 0%, #0d1b2a 40%, #0a1628 70%, #051124 100%)',
              overflow: 'hidden',
            }}
          >
            {/* Decorative glows */}
            <motion.div
              style={{
                position: 'absolute',
                top: '-100px',
                right: '-100px',
                width: '350px',
                height: '350px',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(245,158,11,0.1), transparent 70%)',
              }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 9, repeat: Infinity }}
            />
            <motion.div
              style={{
                position: 'absolute',
                bottom: '-80px',
                left: '-80px',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(245,158,11,0.07), transparent 70%)',
              }}
              animate={{ scale: [1.1, 1, 1.1] }}
              transition={{ duration: 11, repeat: Infinity }}
            />

            {/* Rotating rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                border: '1px dashed rgba(245,158,11,0.1)',
              }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                width: '280px',
                height: '280px',
                borderRadius: '50%',
                border: '1px dashed rgba(245,158,11,0.07)',
              }}
            />

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center position-relative px-4"
              style={{ zIndex: 2, maxWidth: '420px' }}
            >
              {/* Shield icon */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity }}
                style={{
                  width: '120px',
                  height: '120px',
                  margin: '0 auto 32px',
                  borderRadius: '50%',
                  background:
                    'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.04))',
                  border: '2px solid rgba(245,158,11,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MdAdminPanelSettings size={52} style={{ color: '#f59e0b' }} />
              </motion.div>

              <h2 className="fw-bold mb-3" style={{ color: '#f0f0f0', fontSize: '2rem' }}>
                Admin{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Portal
                </span>
              </h2>
              <p
                style={{
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '15px',
                  lineHeight: 1.8,
                }}
              >
                Securely manage products, users, and store operations from one
                powerful dashboard.
              </p>

              {/* Feature tags */}
              <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
                {[
                  { icon: <LuShieldCheck size={14} />, text: 'Secure Access' },
                  { icon: <LuSparkles size={14} />, text: 'Full Control' },
                  { icon: <MdAdminPanelSettings size={14} />, text: 'Admin Only' },
                ].map((tag, i) => (
                  <motion.span
                    key={tag.text}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.15 }}
                    className="d-flex align-items-center gap-1"
                    style={{
                      padding: '6px 16px',
                      borderRadius: '50px',
                      background: 'rgba(245,158,11,0.08)',
                      border: '1px solid rgba(245,158,11,0.2)',
                      color: '#f59e0b',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    {tag.icon} {tag.text}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT SIDE — Login Form ── */}
          <div
            className="col-12 col-lg-6 d-flex align-items-center justify-content-center"
            style={{ padding: '40px 20px' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                width: '100%',
                maxWidth: '440px',
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))',
                border: '1px solid rgba(245,158,11,0.1)',
                borderRadius: '24px',
                padding: '48px 36px',
              }}
            >
              {/* Header */}
              <div className="text-center text-lg-start mb-4">
                {/* Mobile logo */}
                <div className="d-lg-none d-flex align-items-center justify-content-center gap-2 mb-3">
                  <MdAdminPanelSettings size={26} style={{ color: '#f59e0b' }} />
                  <span style={{ color: '#f59e0b', fontSize: '18px', fontWeight: 700 }}>
                    ShoppYnow Admin
                  </span>
                </div>

                {/* Badge */}
                <div className="d-flex align-items-center gap-2 mb-3" style={{ justifyContent: 'flex-start' }}>
                  <div
                    style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      background: 'rgba(245,158,11,0.1)',
                      border: '1px solid rgba(245,158,11,0.25)',
                      color: '#f59e0b',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <LuShieldCheck size={12} /> ADMIN ACCESS
                  </div>
                </div>

                <h2 className="fw-bold mb-2" style={{ color: '#f0f0f0' }}>
                  Welcome Back
                </h2>
                <p style={{ color: '#777', fontSize: '14px' }}>
                  Sign in to your admin account to continue
                </p>
              </div>

              {/* General error */}
              {errors.general && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: 'rgba(239,68,68,0.08)',
                    border: '1px solid rgba(239,68,68,0.2)',
                    color: '#f87171',
                    fontSize: '13px',
                    marginBottom: '20px',
                  }}
                >
                  {errors.general}
                </motion.div>
              )}

              {/* FORM */}
              <form onSubmit={handleLogin}>
                {/* EMAIL */}
                <div style={{ marginBottom: '20px' }}>
                  <label
                    htmlFor="admin-email"
                    style={{
                      display: 'block',
                      color: '#aaa',
                      fontSize: '13px',
                      fontWeight: 600,
                      marginBottom: '8px',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Admin Email
                  </label>
                  <div style={{ position: 'relative' }}>
                    <div style={iconBoxStyle}>
                      <LuMail size={18} />
                    </div>
                    <input
                      type="email"
                      id="admin-email"
                      name="email"
                      placeholder="admin@shoppynow.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isLoading}
                      style={inputStyle(errors.email)}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'rgba(245,158,11,0.4)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.08)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.email
                          ? 'rgba(239,68,68,0.5)'
                          : 'rgba(255,255,255,0.08)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  {errors.email && (
                    <span style={{ color: '#f87171', fontSize: '12px', marginTop: '6px', display: 'block' }}>
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* PASSWORD */}
                <div style={{ marginBottom: '28px' }}>
                  <label
                    htmlFor="admin-password"
                    style={{
                      display: 'block',
                      color: '#aaa',
                      fontSize: '13px',
                      fontWeight: 600,
                      marginBottom: '8px',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <div style={iconBoxStyle}>
                      <LuLock size={18} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="admin-password"
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={isLoading}
                      style={{ ...inputStyle(errors.password), paddingRight: '48px' }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'rgba(245,158,11,0.4)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.08)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.password
                          ? 'rgba(239,68,68,0.5)'
                          : 'rgba(255,255,255,0.08)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '14px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: '#888',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        padding: 0,
                      }}
                    >
                      {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <span style={{ color: '#f87171', fontSize: '12px', marginTop: '6px', display: 'block' }}>
                      {errors.password}
                    </span>
                  )}
                </div>

                {/* SUBMIT */}
                <motion.button
                  type="submit"
                  id="admin-login-submit"
                  disabled={isLoading}
                  whileHover={!isLoading ? { y: -2, boxShadow: '0 10px 35px rgba(245,158,11,0.35)' } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '14px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                    color: '#111',
                    fontSize: '15px',
                    fontWeight: 700,
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.3s ease',
                    opacity: isLoading ? 0.75 : 1,
                  }}
                >
                  {isLoading ? (
                    <motion.div
                      style={{
                        width: '22px',
                        height: '22px',
                        border: '3px solid rgba(17,17,17,0.2)',
                        borderTop: '3px solid #111',
                        borderRadius: '50%',
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    />
                  ) : (
                    <>
                      Access Dashboard <LuArrowRight size={18} />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Divider */}
              <div className="d-flex align-items-center my-4" style={{ gap: '12px' }}>
                <div
                  style={{
                    flex: 1,
                    height: '1px',
                    background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07))',
                  }}
                />
                <span style={{ color: '#555', fontSize: '12px' }}>OR</span>
                <div
                  style={{
                    flex: 1,
                    height: '1px',
                    background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.07))',
                  }}
                />
              </div>

              {/* Back to store */}
              <p className="text-center mb-0" style={{ color: '#666', fontSize: '14px' }}>
                Back to{' '}
                <Link
                  to="/"
                  style={{ color: '#f59e0b', textDecoration: 'none', fontWeight: 600 }}
                  onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
                  onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
                >
                  ShoppYnow Store
                </Link>
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLogin;
