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
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './store/AuthContext';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProductsPage from './pages/ProductsPage';
import ProductDetails from './pages/ProductDetails';

function App() {
  // Check if the user is authenticated and role is admin
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for the authentication token and role in localStorage
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role === 'admin') {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>

            <Navbar />
            <Routes>
              {/* Public Routes */}
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


              {/* Admin Routes (Login Page) */}
              <Route path="/admin/login" element={<AdminDashboardLogin onLogin={() => setIsAuthenticated(true)} />} />

              {/* Admin Protected Routes */}
              <Route path="/admin" element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/admin/login" />}>
                <Route path="users" element={isAuthenticated ? <Users /> : <Navigate to="/admin/login" />} />
                <Route path="Products" element={isAuthenticated ? <Products /> : <Navigate to="/admin/login" />} />
                <Route path="messages" element={isAuthenticated ? <Messages /> : <Navigate to="/admin/login" />} />
              </Route>

              {/* Default Redirect */}
              <Route path="*" element={<Navigate to="/" />} />
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
