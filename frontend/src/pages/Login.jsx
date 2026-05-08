import { useState } from "react";
import { motion } from "motion/react";
import {
  LuEye,
  LuEyeOff,
  LuMail,
  LuLock,
  LuArrowRight,
  LuShoppingBag,
  LuSparkles,
  LuShieldCheck,
} from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../store/AuthContext";
import { toast } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { saveToken } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear field error on type
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        toast.success("Welcome back! 🎉");
        await saveToken(response.data.token);
        setFormData({ email: "", password: "" });
        navigate("/");
      }
    } catch (error) {
      const msg =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(msg);
      setErrors({ general: msg });
    } finally {
      setIsLoading(false);
    }
  };

  /* ─── Floating particles ─── */
  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 3,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 4 + 4,
    delay: Math.random() * 2,
  }));

  const inputStyle = (hasError) => ({
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: hasError
      ? "1px solid rgba(239,68,68,0.5)"
      : "1px solid rgba(255,255,255,0.08)",
    borderRadius: "12px",
    padding: "14px 16px 14px 48px",
    color: "#e8e8e8",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.3s ease",
  });

  const iconBoxStyle = {
    position: "absolute",
    left: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#f59e0b",
    display: "flex",
    alignItems: "center",
  };

  return (
    <div
      style={{
        background: "#111111",
        minHeight: "100vh",
        display: "flex",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ═══ Floating particles ═══ */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "rgba(245,158,11,0.15)",
            left: `${p.x}%`,
            top: `${p.y}%`,
            pointerEvents: "none",
          }}
          animate={{ y: [-20, 20, -20], opacity: [0.3, 0.8, 0.3] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
          }}
        />
      ))}

      <div className="container-fluid p-0 d-flex" style={{ minHeight: "100vh" }}>
        <div className="row g-0 flex-grow-1 w-100">
          {/* ═══════════ LEFT SIDE — Branding ═══════════ */}
          <div
            className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center position-relative"
            style={{
              background:
                "linear-gradient(135deg, #111111 0%, #1a1a2e 40%, #16213e 70%, #0f3460 100%)",
              overflow: "hidden",
            }}
          >
            {/* Decorative circles */}
            <motion.div
              style={{
                position: "absolute",
                top: "-80px",
                right: "-80px",
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(245,158,11,0.12), transparent 70%)",
              }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              style={{
                position: "absolute",
                bottom: "-60px",
                left: "-60px",
                width: "260px",
                height: "260px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(245,158,11,0.08), transparent 70%)",
              }}
              animate={{ scale: [1.1, 1, 1.1] }}
              transition={{ duration: 10, repeat: Infinity }}
            />

            {/* Rotating dashed ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                width: "360px",
                height: "360px",
                borderRadius: "50%",
                border: "2px dashed rgba(245,158,11,0.12)",
              }}
            />

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center position-relative px-4"
              style={{ zIndex: 2, maxWidth: "420px" }}
            >
              {/* Icon */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{
                  width: "120px",
                  height: "120px",
                  margin: "0 auto 32px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, rgba(245,158,11,0.1), rgba(245,158,11,0.03))",
                  border: "2px solid rgba(245,158,11,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LuShoppingBag size={48} style={{ color: "#f59e0b" }} />
              </motion.div>

              <h2
                className="fw-bold mb-3"
                style={{ color: "#f0f0f0", fontSize: "2rem" }}
              >
                Welcome to{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #f59e0b, #f97316)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  ShoppYnow
                </span>
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: "15px",
                  lineHeight: 1.8,
                }}
              >
                Discover curated luxury collections crafted for the modern
                connoisseur. Sign in to access exclusive deals.
              </p>

              {/* Feature tags */}
              <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
                {[
                  { icon: <LuSparkles size={14} />, text: "Premium" },
                  { icon: <LuShieldCheck size={14} />, text: "Secure" },
                  { icon: <LuShoppingBag size={14} />, text: "Exclusive" },
                ].map((tag, i) => (
                  <motion.span
                    key={tag.text}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.15 }}
                    className="d-flex align-items-center gap-1"
                    style={{
                      padding: "6px 16px",
                      borderRadius: "50px",
                      background: "rgba(245,158,11,0.08)",
                      border: "1px solid rgba(245,158,11,0.2)",
                      color: "#f59e0b",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    {tag.icon} {tag.text}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ═══════════ RIGHT SIDE — Login Form ═══════════ */}
          <div
            className="col-12 col-lg-6 d-flex align-items-center justify-content-center"
            style={{ padding: "40px 20px" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                width: "100%",
                maxWidth: "440px",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "24px",
                padding: "48px 36px",
              }}
            >
              {/* Header */}
              <div className="text-center text-lg-start mb-4">
                {/* Mobile logo */}
                <div
                  className="d-lg-none d-flex align-items-center justify-content-center gap-2 mb-3"
                >
                  <LuShoppingBag size={24} style={{ color: "#f59e0b" }} />
                  <span
                    style={{
                      color: "#f59e0b",
                      fontSize: "18px",
                      fontWeight: 700,
                    }}
                  >
                    ShoppYnow
                  </span>
                </div>

                <h2 className="fw-bold mb-2" style={{ color: "#f0f0f0" }}>
                  Sign In
                </h2>
                <p style={{ color: "#888", fontSize: "14px" }}>
                  Enter your credentials to access your account
                </p>
              </div>

              {/* General error */}
              {errors.general && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: "12px 16px",
                    borderRadius: "12px",
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    color: "#f87171",
                    fontSize: "13px",
                    marginBottom: "20px",
                  }}
                >
                  {errors.general}
                </motion.div>
              )}

              {/* ─── FORM ─── */}
              <form onSubmit={handleSubmit}>
                {/* EMAIL */}
                <div style={{ marginBottom: "20px" }}>
                  <label
                    htmlFor="login-email"
                    style={{
                      display: "block",
                      color: "#aaa",
                      fontSize: "13px",
                      fontWeight: 600,
                      marginBottom: "8px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Email Address
                  </label>
                  <div style={{ position: "relative" }}>
                    <div style={iconBoxStyle}>
                      <LuMail size={18} />
                    </div>
                    <input
                      type="email"
                      id="login-email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isLoading}
                      style={inputStyle(errors.email)}
                      onFocus={(e) => {
                        e.target.style.borderColor = "rgba(245,158,11,0.4)";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(245,158,11,0.08)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.email
                          ? "rgba(239,68,68,0.5)"
                          : "rgba(255,255,255,0.08)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                  {errors.email && (
                    <span
                      style={{ color: "#f87171", fontSize: "12px", marginTop: "6px", display: "block" }}
                    >
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* PASSWORD */}
                <div style={{ marginBottom: "24px" }}>
                  <label
                    htmlFor="login-password"
                    style={{
                      display: "block",
                      color: "#aaa",
                      fontSize: "13px",
                      fontWeight: 600,
                      marginBottom: "8px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <div style={iconBoxStyle}>
                      <LuLock size={18} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="login-password"
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={isLoading}
                      style={{
                        ...inputStyle(errors.password),
                        paddingRight: "48px",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "rgba(245,158,11,0.4)";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(245,158,11,0.08)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.password
                          ? "rgba(239,68,68,0.5)"
                          : "rgba(255,255,255,0.08)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        right: "14px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        color: "#888",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        padding: 0,
                      }}
                    >
                      {showPassword ? (
                        <LuEyeOff size={18} />
                      ) : (
                        <LuEye size={18} />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <span
                      style={{ color: "#f87171", fontSize: "12px", marginTop: "6px", display: "block" }}
                    >
                      {errors.password}
                    </span>
                  )}
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  id="login-submit-btn"
                  disabled={isLoading}
                  style={{
                    width: "100%",
                    padding: "16px",
                    borderRadius: "14px",
                    border: "none",
                    background: "linear-gradient(135deg, #f59e0b, #f97316)",
                    color: "#111",
                    fontSize: "15px",
                    fontWeight: 700,
                    cursor: isLoading ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "all 0.3s ease",
                    opacity: isLoading ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoading) {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 30px rgba(245,158,11,0.3)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {isLoading ? (
                    <motion.div
                      style={{
                        width: "22px",
                        height: "22px",
                        border: "3px solid rgba(17,17,17,0.2)",
                        borderTop: "3px solid #111",
                        borderRadius: "50%",
                      }}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  ) : (
                    <>
                      Sign In <LuArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div
                className="d-flex align-items-center my-4"
                style={{ gap: "12px" }}
              >
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background:
                      "linear-gradient(to right, transparent, rgba(255,255,255,0.08))",
                  }}
                />
                <span style={{ color: "#666", fontSize: "12px" }}>OR</span>
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background:
                      "linear-gradient(to left, transparent, rgba(255,255,255,0.08))",
                  }}
                />
              </div>

              {/* Register link */}
              <p
                className="text-center mb-0"
                style={{ color: "#888", fontSize: "14px" }}
              >
                Don't have an account?{" "}
                <Link
                  to="/register"
                  style={{
                    color: "#f59e0b",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.textDecoration = "underline")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.textDecoration = "none")
                  }
                >
                  Create Account
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
