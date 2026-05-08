import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { LuLogOut, LuCheck } from "react-icons/lu";
import { useAuth } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Logout() {
  const { removeToken } = useAuth();
  const navigate = useNavigate();
  const [phase, setPhase] = useState("logging-out"); // "logging-out" | "done"

  useEffect(() => {
    // Show the animation first, then perform logout
    const logoutTimer = setTimeout(() => {
      removeToken();
      toast.success("You have been logged out successfully.");
      setPhase("done");
    }, 1200);

    const redirectTimer = setTimeout(() => {
      navigate("/login");
    }, 2400);

    return () => {
      clearTimeout(logoutTimer);
      clearTimeout(redirectTimer);
    };
  }, [removeToken, navigate]);

  /* ─── Floating particles ─── */
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 5 + 2,
    x: 50 + (Math.random() - 0.5) * 40,
    y: 50 + (Math.random() - 0.5) * 40,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 1,
  }));

  return (
    <div
      style={{
        background: "#111111",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245,158,11,0.06), transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "rgba(245,158,11,0.2)",
            left: `${p.x}%`,
            top: `${p.y}%`,
            pointerEvents: "none",
          }}
          animate={{
            y: [-15, 15, -15],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          textAlign: "center",
          padding: "60px 48px",
          borderRadius: "24px",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
          border: "1px solid rgba(255,255,255,0.07)",
          maxWidth: "400px",
          width: "100%",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Animated icon */}
        <motion.div
          style={{
            width: "90px",
            height: "90px",
            margin: "0 auto 28px",
            borderRadius: "50%",
            background:
              phase === "done"
                ? "rgba(34,197,94,0.1)"
                : "rgba(245,158,11,0.08)",
            border:
              phase === "done"
                ? "2px solid rgba(34,197,94,0.25)"
                : "2px solid rgba(245,158,11,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.5s ease",
          }}
        >
          {phase === "done" ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
            >
              <LuCheck size={40} style={{ color: "#22c55e" }} />
            </motion.div>
          ) : (
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <LuLogOut size={40} style={{ color: "#f59e0b" }} />
            </motion.div>
          )}
        </motion.div>

        {/* Title */}
        <h3
          className="fw-bold mb-2"
          style={{ color: "#f0f0f0", fontSize: "1.5rem" }}
        >
          {phase === "done" ? "See You Soon!" : "Logging Out..."}
        </h3>

        {/* Subtitle */}
        <p style={{ color: "#888", fontSize: "14px", marginBottom: "28px" }}>
          {phase === "done"
            ? "You have been safely logged out."
            : "Securely signing you out of your account..."}
        </p>

        {/* Progress bar */}
        <div
          style={{
            width: "100%",
            height: "4px",
            borderRadius: "4px",
            background: "rgba(255,255,255,0.06)",
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
            style={{
              height: "100%",
              borderRadius: "4px",
              background:
                phase === "done"
                  ? "linear-gradient(90deg, #22c55e, #10b981)"
                  : "linear-gradient(90deg, #f59e0b, #f97316)",
              transition: "background 0.5s ease",
            }}
          />
        </div>

        <p
          style={{
            color: "#666",
            fontSize: "12px",
            marginTop: "16px",
            marginBottom: 0,
          }}
        >
          Redirecting to login...
        </p>
      </motion.div>
    </div>
  );
}
