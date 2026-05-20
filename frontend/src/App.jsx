import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import AdminDashboard from './layout/AdminDashboard';
import Users from './layout/Users';
import AdminProducts from './layout/Products';
import { Messages } from './layout/Messages';
import { ThemeProvider } from './context/ThemContext';
import Cart from './components/Cart';
import store from './redux/Store';
import { Provider } from 'react-redux';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import FAQ from './pages/FAQ';
import AdminDashboardLogin from './components/AdminDashboardLogin';
import { useState, useEffect, useCallback } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './store/AuthContext';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProductsPage from './pages/ProductsPage';
import ProductDetails from './pages/ProductDetails';

/* ── Helper to read admin auth from localStorage ── */
const getAdminAuth = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  return !!(token && role === 'admin');
};

/* ── Protected route wrapper for admin ── */
const AdminProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(getAdminAuth);

  /* Re-check whenever localStorage changes (e.g. in another tab) */
  useEffect(() => {
    const syncAuth = () => setIsAuthenticated(getAdminAuth());
    window.addEventListener('storage', syncAuth);
    return () => window.removeEventListener('storage', syncAuth);
  }, []);

  const handleLogin = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>

            <Navbar />
            <Routes>
              {/* ── Public Routes ── */}
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/contact" element={<Contact />} />

              {/* ── Admin Login — redirect to /admin if already authed ── */}
              <Route
                path="/admin/login"
                element={
                  isAuthenticated
                    ? <Navigate to="/admin" replace />
                    : <AdminDashboardLogin onLogin={handleLogin} />
                }
              />

              {/* ── Admin Protected Routes ── */}
              <Route
                path="/admin"
                element={
                  <AdminProtectedRoute isAuthenticated={isAuthenticated}>
                    <AdminDashboard onLogout={handleLogout} />
                  </AdminProtectedRoute>
                }
              >
                <Route path="users" element={<Users />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="messages" element={<Messages />} />
              </Route>

              {/* ── Default Redirect ── */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            <Footer />
            <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
