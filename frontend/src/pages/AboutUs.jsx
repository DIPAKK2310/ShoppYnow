// src/pages/AboutUs.jsx
import React, { useEffect } from "react";
import { motion } from "motion/react";
import {
  LuShoppingCart,
  LuTruck,
  LuShieldCheck,
  LuUsers,
  LuBadgeCheck,
  LuHeart,
  LuTarget,
  LuSparkles,
  LuGlobe,
  LuHeadphones,
  LuArrowUp,
  LuArrowRight,
  LuInfo,
} from "react-icons/lu";

const values = [
  {
    icon: <LuHeart size={28} />,
    title: "Customer First",
    content:
      "Every decision we make starts with our customers. Your satisfaction drives our innovation, shapes our products, and defines our success.",
  },
  {
    icon: <LuShieldCheck size={28} />,
    title: "Trust & Security",
    content:
      "We protect your data with bank-level encryption and maintain transparent practices that earn your confidence with every transaction.",
  },
  {
    icon: <LuSparkles size={28} />,
    title: "Quality Assurance",
    content:
      "Every product on ShoppYnow passes rigorous quality checks. We partner only with verified sellers who share our commitment to excellence.",
  },
  {
    icon: <LuGlobe size={28} />,
    title: "Inclusive Access",
    content:
      "We believe great products should be accessible to everyone. Our platform is designed to serve diverse communities across India.",
  },
];

const features = [
  {
    icon: <LuShoppingCart size={32} />,
    title: "Wide Product Range",
    content:
      "From trending fashion to cutting-edge electronics — discover thousands of curated products all in one place.",
  },
  {
    icon: <LuTruck size={32} />,
    title: "Lightning-Fast Delivery",
    content:
      "Experience swift and reliable shipping with real-time tracking. Get your orders delivered right to your doorstep.",
  },
  {
    icon: <LuShieldCheck size={32} />,
    title: "Secure Payments",
    content:
      "Shop with peace of mind. All transactions are protected with 256-bit SSL encryption and PCI-DSS compliance.",
  },
  {
    icon: <LuHeadphones size={32} />,
    title: "24/7 Customer Support",
    content:
      "Our dedicated support team is always here to help via chat, email, or phone — day and night, 365 days a year.",
  },
];

const stats = [
  { number: "10K+", label: "Happy Customers", icon: <LuUsers size={24} /> },
  { number: "5K+", label: "Products Sold", icon: <LuShoppingCart size={24} /> },
  { number: "2K+", label: "Orders Delivered", icon: <LuTruck size={24} /> },
  { number: "99%", label: "Satisfaction Rate", icon: <LuBadgeCheck size={24} /> },
];

const milestones = [
  { year: "2024", event: "ShoppYnow founded with a mission to simplify online shopping" },
  { year: "2024", event: "Launched our first 500 products across fashion & electronics" },
  { year: "2025", event: "Crossed 5,000 happy customers & expanded to 15+ categories" },
  { year: "2025", event: "Introduced express delivery & 24/7 customer support" },
  { year: "2026", event: "Reached 10K+ customers & launched mobile-first experience" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ background: "#111111", minHeight: "100vh" }}>
      {/* ═══════════ HERO SECTION ═══════════ */}
      <section
        style={{
          background:
            "linear-gradient(135deg, #111111 0%, #1a1a2e 40%, #16213e 70%, #0f3460 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative floating orbs */}
        <div
          style={{
            position: "absolute",
            top: "-60px",
            right: "-60px",
            width: "250px",
            height: "250px",
            background:
              "radial-gradient(circle, rgba(245, 158, 11, 0.15), transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-40px",
            left: "-40px",
            width: "200px",
            height: "200px",
            background:
              "radial-gradient(circle, rgba(245, 158, 11, 0.1), transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "300px",
            height: "300px",
            background:
              "radial-gradient(circle, rgba(245, 158, 11, 0.05), transparent 70%)",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        <div className="container py-5">
          <div className="row align-items-center py-4">
            <div className="col-md-7">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="d-flex align-items-center gap-2 mb-3">
                  <LuInfo size={20} style={{ color: "#f59e0b" }} />
                  <span
                    className="text-uppercase fw-semibold"
                    style={{
                      color: "#f59e0b",
                      fontSize: "13px",
                      letterSpacing: "3px",
                    }}
                  >
                    Our Story
                  </span>
                </div>
                <h1
                  className="display-4 fw-bold mb-3"
                  style={{ color: "#f0f0f0" }}
                >
                  About{" "}
                  <span
                    style={{
                      background:
                        "linear-gradient(135deg, #f59e0b, #f97316)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    ShoppYnow
                  </span>
                </h1>
                <p
                  className="lead mb-0"
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    maxWidth: "520px",
                    lineHeight: "1.8",
                  }}
                >
                  Your trusted destination for fashion, electronics, and
                  everyday essentials — delivered fast, securely, and
                  affordably. We're building the future of{" "}
                  <strong style={{ color: "#f59e0b" }}>online shopping</strong>{" "}
                  in India.
                </p>
              </motion.div>
            </div>

            <div className="col-md-5 text-center d-none d-md-block">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div
                  style={{
                    width: "220px",
                    height: "220px",
                    margin: "0 auto",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.03))",
                    border: "2px solid rgba(245, 158, 11, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <LuTarget
                    size={80}
                    style={{ color: "#f59e0b", opacity: 0.8 }}
                  />
                  {/* Rotating ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      position: "absolute",
                      inset: "-15px",
                      borderRadius: "50%",
                      border: "2px dashed rgba(245, 158, 11, 0.2)",
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ STATS BAR ═══════════ */}
      <div
        style={{
          background: "rgba(245, 158, 11, 0.06)",
          borderTop: "1px solid rgba(245, 158, 11, 0.15)",
          borderBottom: "1px solid rgba(245, 158, 11, 0.08)",
        }}
      >
        <div className="container py-4">
          <div className="row text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="col-6 col-md-3 mb-3 mb-md-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="d-flex flex-column align-items-center gap-1">
                  <span style={{ color: "#f59e0b" }}>{stat.icon}</span>
                  <h3
                    className="fw-bold mb-0"
                    style={{
                      background: "linear-gradient(135deg, #f59e0b, #f97316)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontSize: "1.8rem",
                    }}
                  >
                    {stat.number}
                  </h3>
                  <span
                    className="text-secondary small"
                    style={{ letterSpacing: "0.5px" }}
                  >
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════ OUR STORY ═══════════ */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "16px",
                  padding: "40px",
                }}
                className="about-card"
              >
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "12px",
                      background:
                        "linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.05))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#f59e0b",
                      flexShrink: 0,
                    }}
                  >
                    <LuTarget size={28} />
                  </div>
                  <h3
                    className="mb-0 fw-bold"
                    style={{ color: "#e8e8e8", fontSize: "1.3rem" }}
                  >
                    Our Mission
                  </h3>
                </div>
                <p
                  className="text-secondary mb-3"
                  style={{ lineHeight: "1.9", paddingLeft: "63px", fontSize: "15px" }}
                >
                  ShoppYnow started with a simple yet powerful vision — to make
                  online shopping <strong style={{ color: "#f59e0b" }}>easy, reliable, and accessible</strong> to
                  everyone. We noticed how complicated and inconsistent many
                  platforms were, and decided to build a seamless experience
                  focused on speed, trust, and customer satisfaction.
                </p>
                <p
                  className="text-secondary mb-0"
                  style={{ lineHeight: "1.9", paddingLeft: "63px", fontSize: "15px" }}
                >
                  Today, we serve thousands of happy customers across India,
                  offering curated products from verified sellers — all backed
                  by our commitment to quality, security, and exceptional
                  service. Our journey is just beginning, and we invite you to
                  be a part of it.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ═══════════ OUR VALUES ═══════════ */}
      <div className="container pb-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-5"
        >
          <span
            className="text-uppercase fw-semibold d-block mb-2"
            style={{ color: "#f59e0b", fontSize: "13px", letterSpacing: "3px" }}
          >
            What Drives Us
          </span>
          <h2 className="fw-bold" style={{ color: "#e8e8e8" }}>
            Our Core Values
          </h2>
        </motion.div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="row">
              {values.map((value, index) => (
                <div key={index} className="col-md-6 mb-4">
                  <motion.div
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={cardVariants}
                    style={{ height: "100%" }}
                  >
                    <div
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: "16px",
                        padding: "28px",
                        transition: "all 0.4s ease",
                        cursor: "default",
                        height: "100%",
                      }}
                      className="about-card"
                    >
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <div
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "12px",
                            background:
                              "linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.05))",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#f59e0b",
                            flexShrink: 0,
                          }}
                        >
                          {value.icon}
                        </div>
                        <h5
                          className="mb-0 fw-bold"
                          style={{ color: "#e8e8e8" }}
                        >
                          {value.title}
                        </h5>
                      </div>
                      <p
                        className="text-secondary mb-0"
                        style={{ lineHeight: "1.8", paddingLeft: "63px", fontSize: "14px" }}
                      >
                        {value.content}
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════ WHY CHOOSE US ═══════════ */}
      <section
        style={{
          background:
            "linear-gradient(135deg, rgba(245, 158, 11, 0.06), rgba(245, 158, 11, 0.01))",
          borderTop: "1px solid rgba(245, 158, 11, 0.1)",
          borderBottom: "1px solid rgba(245, 158, 11, 0.1)",
        }}
      >
        <div className="container py-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-5"
          >
            <span
              className="text-uppercase fw-semibold d-block mb-2"
              style={{ color: "#f59e0b", fontSize: "13px", letterSpacing: "3px" }}
            >
              Our Advantages
            </span>
            <h2 className="fw-bold" style={{ color: "#e8e8e8" }}>
              Why Choose ShoppYnow
            </h2>
          </motion.div>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  variants={cardVariants}
                  className="mb-4"
                >
                  <div
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: "16px",
                      padding: "32px",
                      transition: "all 0.4s ease",
                      cursor: "default",
                    }}
                    className="about-card"
                  >
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div
                        style={{
                          width: "56px",
                          height: "56px",
                          borderRadius: "14px",
                          background:
                            "linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.05))",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#f59e0b",
                          flexShrink: 0,
                        }}
                      >
                        {feature.icon}
                      </div>
                      <div>
                        <h4
                          className="mb-1 fw-bold"
                          style={{ color: "#e8e8e8", fontSize: "1.2rem" }}
                        >
                          {feature.title}
                        </h4>
                        <p
                          className="text-secondary mb-0"
                          style={{ lineHeight: "1.7", fontSize: "14px" }}
                        >
                          {feature.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ JOURNEY / TIMELINE ═══════════ */}
      <div className="container py-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-5"
        >
          <span
            className="text-uppercase fw-semibold d-block mb-2"
            style={{ color: "#f59e0b", fontSize: "13px", letterSpacing: "3px" }}
          >
            Our Journey
          </span>
          <h2 className="fw-bold" style={{ color: "#e8e8e8" }}>
            Key Milestones
          </h2>
        </motion.div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
                className="d-flex gap-3 mb-4"
              >
                <div
                  className="d-flex flex-column align-items-center"
                  style={{ minWidth: "60px" }}
                >
                  <span
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.05))",
                      color: "#f59e0b",
                      fontWeight: "700",
                      fontSize: "13px",
                      padding: "6px 12px",
                      borderRadius: "8px",
                      border: "1px solid rgba(245, 158, 11, 0.2)",
                    }}
                  >
                    {milestone.year}
                  </span>
                  {index < milestones.length - 1 && (
                    <div
                      style={{
                        width: "2px",
                        flex: 1,
                        background:
                          "linear-gradient(to bottom, rgba(245, 158, 11, 0.3), rgba(245, 158, 11, 0.05))",
                        marginTop: "8px",
                        minHeight: "20px",
                      }}
                    />
                  )}
                </div>
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "12px",
                    padding: "16px 20px",
                    flex: 1,
                    transition: "all 0.4s ease",
                  }}
                  className="about-card"
                >
                  <p
                    className="text-secondary mb-0"
                    style={{ fontSize: "14px", lineHeight: "1.7" }}
                  >
                    {milestone.event}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════ CTA BANNER ═══════════ */}
      <section
        style={{
          background:
            "linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(245, 158, 11, 0.02))",
          borderTop: "1px solid rgba(245, 158, 11, 0.1)",
          borderBottom: "1px solid rgba(245, 158, 11, 0.1)",
        }}
      >
        <div className="container py-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <LuShoppingCart
              size={40}
              className="mb-3"
              style={{ color: "#f59e0b" }}
            />
            <h4 className="fw-bold mb-2" style={{ color: "#e8e8e8" }}>
              Start Shopping with Confidence
            </h4>
            <p
              className="text-secondary mx-auto mb-4"
              style={{ maxWidth: "600px" }}
            >
              Discover quality products, great deals, and a seamless shopping
              experience. Join thousands of satisfied customers today.
            </p>
            <a
              href="/ProductsPages"
              className="btn d-inline-flex align-items-center gap-2"
              style={{
                padding: "12px 32px",
                borderRadius: "50px",
                border: "1px solid rgba(245, 158, 11, 0.4)",
                color: "#111111",
                fontSize: "14px",
                fontWeight: "600",
                letterSpacing: "0.5px",
                background: "linear-gradient(135deg, #f59e0b, #f97316)",
                transition: "all 0.3s ease",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 24px rgba(245, 158, 11, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              Shop Now <LuArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ BACK TO TOP ═══════════ */}
      <div className="container py-4 text-center">
        <button
          onClick={scrollToTop}
          className="btn"
          style={{
            background: "transparent",
            border: "1px solid rgba(245, 158, 11, 0.3)",
            color: "#f59e0b",
            borderRadius: "50px",
            padding: "10px 28px",
            fontSize: "14px",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(245, 158, 11, 0.1)";
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
            e.target.style.transform = "translateY(0)";
          }}
        >
          <LuArrowUp size={16} className="me-2" />
          Back to Top
        </button>
      </div>

      {/* ═══════════ HOVER STYLES ═══════════ */}
      <style>{`
        .about-card:hover {
          border-color: rgba(245, 158, 11, 0.2) !important;
          background: linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02)) !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(245, 158, 11, 0.06);
        }
      `}</style>
    </div>
  );
};

export default AboutUs;