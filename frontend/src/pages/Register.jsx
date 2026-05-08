import { useState } from "react";
import { motion } from "motion/react";
import {
  LuEye,
  LuEyeOff,
  LuMail,
  LuLock,
  LuUser,
  LuArrowRight,
  LuShoppingBag,
  LuSparkles,
  LuShieldCheck,
  LuCheck,
} from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../store/AuthContext";
import { toast } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const { saveToken } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  /* ─── Client-side validation ─── */
  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    else if (formData.username.trim().length < 3)
      newErrors.username = "Username must be at least 3 characters";
    else if (formData.username.length > 30)
      newErrors.username = "Username cannot exceed 30 characters";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email address";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    return newErrors;
  };

  /* ─── Password strength ─── */
  const getPasswordStrength = () => {
    const pwd = formData.password;
    if (!pwd) return { level: 0, label: "", color: "transparent" };
    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 10) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 2) return { level: 1, label: "Weak", color: "#ef4444" };
    if (score <= 3) return { level: 2, label: "Fair", color: "#f59e0b" };
    if (score <= 4) return { level: 3, label: "Strong", color: "#22c55e" };
    return { level: 4, label: "Very Strong", color: "#10b981" };
  };

  const passwordStrength = getPasswordStrength();

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
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        toast.success("Account created successfully! 🎉");
        await saveToken(response.data.token);
        setFormData({ username: "", email: "", password: "" });
        navigate("/");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        const msg =
          error.response.data.message ||
          "This email or username is already taken.";
        toast.error(msg);
        setErrors({ general: msg });
      } else if (error.response?.status === 400) {
        const serverErrors = error.response.data.errors || [];
        toast.error(serverErrors[0] || "Validation failed");
        setErrors({ general: serverErrors.join(". ") });
      } else {
        toast.error("Registration failed. Please try again.");
        setErrors({ general: "An error occurred. Please try again." });
      }
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

  const labelStyle = {
    display: "block",
    color: "#aaa",
    fontSize: "13px",
    fontWeight: 600,
    marginBottom: "8px",
    letterSpacing: "0.5px",
  };

  const focusHandler = (e) => {
    e.target.style.borderColor = "rgba(245,158,11,0.4)";
    e.target.style.boxShadow = "0 0 0 3px rgba(245,158,11,0.08)";
  };

  const blurHandler = (fieldName) => (e) => {
    e.target.style.borderColor = errors[fieldName]
      ? "rgba(239,68,68,0.5)"
      : "rgba(255,255,255,0.08)";
    e.target.style.boxShadow = "none";
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
          {/* ═══════════ LEFT SIDE — Form ═══════════ */}
          <div
            className="col-12 col-lg-6 d-flex align-items-center justify-content-center order-2 order-lg-1"
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
                padding: "44px 36px",
              }}
            >
              {/* Header */}
              <div className="text-center text-lg-start mb-4">
                <div className="d-lg-none d-flex align-items-center justify-content-center gap-2 mb-3">
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
                  Create Account
                </h2>
                <p style={{ color: "#888", fontSize: "14px" }}>
                  Join ShoppYnow and start your shopping journey
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
                {/* USERNAME */}
                <div style={{ marginBottom: "18px" }}>
                  <label htmlFor="register-username" style={labelStyle}>
                    Username
                  </label>
                  <div style={{ position: "relative" }}>
                    <div style={iconBoxStyle}>
                      <LuUser size={18} />
                    </div>
                    <input
                      type="text"
                      id="register-username"
                      name="username"
                      placeholder="Your username"
                      value={formData.username}
                      onChange={handleChange}
                      disabled={isLoading}
                      style={inputStyle(errors.username)}
                      onFocus={focusHandler}
                      onBlur={blurHandler("username")}
                    />
                  </div>
                  {errors.username && (
                    <span
                      style={{
                        color: "#f87171",
                        fontSize: "12px",
                        marginTop: "6px",
                        display: "block",
                      }}
                    >
                      {errors.username}
                    </span>
                  )}
                </div>

                {/* EMAIL */}
                <div style={{ marginBottom: "18px" }}>
                  <label htmlFor="register-email" style={labelStyle}>
                    Email Address
                  </label>
                  <div style={{ position: "relative" }}>
                    <div style={iconBoxStyle}>
                      <LuMail size={18} />
                    </div>
                    <input
                      type="email"
                      id="register-email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isLoading}
                      style={inputStyle(errors.email)}
                      onFocus={focusHandler}
                      onBlur={blurHandler("email")}
                    />
                  </div>
                  {errors.email && (
                    <span
                      style={{
                        color: "#f87171",
                        fontSize: "12px",
                        marginTop: "6px",
                        display: "block",
                      }}
                    >
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* PASSWORD */}
                <div style={{ marginBottom: "8px" }}>
                  <label htmlFor="register-password" style={labelStyle}>
                    Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <div style={iconBoxStyle}>
                      <LuLock size={18} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="register-password"
                      name="password"
                      placeholder="Min 6 characters"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={isLoading}
                      style={{
                        ...inputStyle(errors.password),
                        paddingRight: "48px",
                      }}
                      onFocus={focusHandler}
                      onBlur={blurHandler("password")}
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
                      style={{
                        color: "#f87171",
                        fontSize: "12px",
                        marginTop: "6px",
                        display: "block",
                      }}
                    >
                      {errors.password}
                    </span>
                  )}
                </div>

                {/* Password strength bar */}
                {formData.password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    style={{ marginBottom: "20px" }}
                  >
                    <div
                      className="d-flex gap-1 mb-1"
                      style={{ marginTop: "10px" }}
                    >
                      {[1, 2, 3, 4].map((bar) => (
                        <div
                          key={bar}
                          style={{
                            flex: 1,
                            height: "4px",
                            borderRadius: "4px",
                            background:
                              bar <= passwordStrength.level
                                ? passwordStrength.color
                                : "rgba(255,255,255,0.06)",
                            transition: "all 0.3s ease",
                          }}
                        />
                      ))}
                    </div>
                    <span
                      style={{
                        fontSize: "11px",
                        color: passwordStrength.color,
                        fontWeight: 600,
                      }}
                    >
                      {passwordStrength.label}
                    </span>
                  </motion.div>
                )}

                {/* Password requirements */}
                {formData.password && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ marginBottom: "24px" }}
                  >
                    {[
                      {
                        met: formData.password.length >= 6,
                        text: "At least 6 characters",
                      },
                      {
                        met: /[A-Z]/.test(formData.password),
                        text: "One uppercase letter",
                      },
                      {
                        met: /[0-9]/.test(formData.password),
                        text: "One number",
                      },
                    ].map((req, i) => (
                      <div
                        key={i}
                        className="d-flex align-items-center gap-2"
                        style={{ marginBottom: "4px" }}
                      >
                        <div
                          style={{
                            width: "16px",
                            height: "16px",
                            borderRadius: "50%",
                            background: req.met
                              ? "rgba(34,197,94,0.15)"
                              : "rgba(255,255,255,0.04)",
                            border: req.met
                              ? "1px solid rgba(34,197,94,0.3)"
                              : "1px solid rgba(255,255,255,0.08)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.3s ease",
                            flexShrink: 0,
                          }}
                        >
                          {req.met && (
                            <LuCheck
                              size={10}
                              style={{ color: "#22c55e" }}
                            />
                          )}
                        </div>
                        <span
                          style={{
                            fontSize: "12px",
                            color: req.met ? "#22c55e" : "#666",
                            transition: "color 0.3s ease",
                          }}
                        >
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* SUBMIT */}
                <button
                  type="submit"
                  id="register-submit-btn"
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
                      Create Account <LuArrowRight size={18} />
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

              {/* Login link */}
              <p
                className="text-center mb-0"
                style={{ color: "#888", fontSize: "14px" }}
              >
                Already have an account?{" "}
                <Link
                  to="/login"
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
                  Sign In
                </Link>
              </p>
            </motion.div>
          </div>

          {/* ═══════════ RIGHT SIDE — Branding ═══════════ */}
          <div
            className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center position-relative order-1 order-lg-2"
            style={{
              background:
                "linear-gradient(135deg, #0f3460 0%, #16213e 30%, #1a1a2e 60%, #111111 100%)",
              overflow: "hidden",
            }}
          >
            {/* Decorative circles */}
            <motion.div
              style={{
                position: "absolute",
                top: "-80px",
                left: "-80px",
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(245,158,11,0.12), transparent 70%)",
              }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              style={{
                position: "absolute",
                bottom: "-60px",
                right: "-60px",
                width: "260px",
                height: "260px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(245,158,11,0.08), transparent 70%)",
              }}
              animate={{ scale: [1.1, 1, 1.1] }}
              transition={{ duration: 10, repeat: Infinity }}
            />

            {/* Rotating ring */}
            <motion.div
              animate={{ rotate: -360 }}
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
                <LuSparkles size={48} style={{ color: "#f59e0b" }} />
              </motion.div>

              <h2
                className="fw-bold mb-3"
                style={{ color: "#f0f0f0", fontSize: "2rem" }}
              >
                Join{" "}
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
                Create your account today and unlock access to premium
                collections, exclusive deals, and a personalized shopping
                experience.
              </p>

              {/* Benefits */}
              <div
                className="d-flex flex-column gap-3 mt-4"
                style={{ textAlign: "left", maxWidth: "280px", margin: "0 auto" }}
              >
                {[
                  "Exclusive member discounts",
                  "Early access to new arrivals",
                  "Order tracking & history",
                ].map((benefit, i) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.15 }}
                    className="d-flex align-items-center gap-3"
                  >
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        background: "rgba(245,158,11,0.1)",
                        border: "1px solid rgba(245,158,11,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <LuCheck size={14} style={{ color: "#f59e0b" }} />
                    </div>
                    <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px" }}>
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
