// src/pages/PrivacyPolicy.jsx
import React, { useEffect } from "react";
import { motion } from "motion/react";
import {
  LuShieldCheck,
  LuCookie,
  LuDatabase,
  LuLock,
  LuUserCheck,
  LuRefreshCw,
  LuMail,
  LuEye,
  LuFileText,
  LuArrowUp,
} from "react-icons/lu";

const sections = [
  {
    icon: <LuDatabase size={28} />,
    title: "1. Information We Collect",
    content:
      "We collect personal information when you make a purchase, register an account, or use our website. This ensures a seamless shopping experience tailored just for you.",
    items: [
      "Your full name & contact details",
      "Email address & phone number",
      "Billing and shipping addresses",
      "Payment & transaction details",
      "Browsing behavior & preferences",
      "Device information & IP address",
    ],
  },
  {
    icon: <LuEye size={28} />,
    title: "2. How We Use Your Information",
    content:
      "The information we collect empowers us to serve you better. We use it responsibly and transparently.",
    items: [
      "Process transactions & deliver products",
      "Personalize your shopping experience",
      "Send order updates & promotional offers",
      "Improve our website & customer service",
      "Prevent fraud & ensure account security",
      "Analyze trends to enhance our catalog",
    ],
  },
  {
    icon: <LuCookie size={28} />,
    title: "3. Cookies & Tracking",
    content:
      "We use cookies and similar technologies to enhance your shopping experience. Cookies help us remember your preferences, track your activity, and personalize content. You can manage cookie preferences through your browser settings, though some features may not function optimally without them.",
    items: [
      "Essential cookies for site functionality",
      "Analytics cookies for performance insights",
      "Marketing cookies for relevant promotions",
      "Preference cookies for personalization",
    ],
  },
  {
    icon: <LuLock size={28} />,
    title: "4. Data Protection & Security",
    content:
      "We implement industry-leading security measures to protect your personal information. Your data is stored in a secure, encrypted environment with multiple layers of protection.",
    items: [
      "256-bit SSL encryption for all data transfers",
      "PCI-DSS compliant payment processing",
      "Regular security audits & penetration testing",
      "Two-factor authentication support",
    ],
  },
  {
    icon: <LuUserCheck size={28} />,
    title: "5. Your Rights & Choices",
    content:
      "You have full control over your personal data. We respect and uphold your rights under applicable privacy laws.",
    items: [
      "Access & download your personal data",
      "Request corrections to inaccurate data",
      "Request permanent deletion of your data",
      "Opt-out of marketing communications",
      "Withdraw consent at any time",
      "Lodge a complaint with supervisory authorities",
    ],
  },
  {
    icon: <LuRefreshCw size={28} />,
    title: "6. Policy Updates",
    content:
      'We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. When significant changes are made, we will notify you via email or a prominent notice on our website. The "Last Updated" date will always reflect the most current version.',
    items: [],
  },
  {
    icon: <LuMail size={28} />,
    title: "7. Contact Us",
    content:
      "If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your personal data, please don't hesitate to reach out to our dedicated privacy team.",
    items: [
      "Email: support@shoppynow.com",
      "Phone: +91 98765 43210",
      "Address: 123 ShoppYnow St., Mumbai, India",
      "Response time: Within 48 business hours",
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const PrivacyPolicy = () => {
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

        <div className="container py-5">
          <div className="row align-items-center py-4">
            <div className="col-md-7">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="d-flex align-items-center gap-2 mb-3">
                  <LuShieldCheck size={20} style={{ color: "#f59e0b" }} />
                  <span
                    className="text-uppercase fw-semibold"
                    style={{
                      color: "#f59e0b",
                      fontSize: "13px",
                      letterSpacing: "3px",
                    }}
                  >
                    Your Privacy Matters
                  </span>
                </div>
                <h1
                  className="display-4 fw-bold mb-3"
                  style={{ color: "#0f0f0f" !== "#0f0f0f" ? "#0f0f0f" : "#f0f0f0" }}
                >
                  Privacy{" "}
                  <span
                    style={{
                      background:
                        "linear-gradient(135deg, #f59e0b, #f97316)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Policy
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
                  At <strong style={{ color: "#f59e0b" }}>ShoppYnow</strong>, 
                  protecting your personal information is our top priority. 
                  Read how we safeguard your data with industry-leading practices.
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
                  <LuShieldCheck
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

      {/* ═══════════ LAST UPDATED BAR ═══════════ */}
      <div
        style={{
          background: "rgba(245, 158, 11, 0.06)",
          borderTop: "1px solid rgba(245, 158, 11, 0.15)",
          borderBottom: "1px solid rgba(245, 158, 11, 0.08)",
        }}
      >
        <div className="container py-3 d-flex flex-wrap justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <LuFileText size={16} style={{ color: "#f59e0b" }} />
            <span className="text-secondary small">
              Last Updated: <strong style={{ color: "#aaa" }}>April 21, 2026</strong>
            </span>
          </div>
          <span className="text-secondary small">
            Effective for all ShoppYnow users worldwide
          </span>
        </div>
      </div>

      {/* ═══════════ POLICY SECTIONS ═══════════ */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {sections.map((section, index) => (
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
                  className="policy-card"
                >
                  {/* Section Header */}
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
                      {section.icon}
                    </div>
                    <h3
                      className="mb-0 fw-bold"
                      style={{ color: "#0f0f0f" !== "#0f0f0f" ? "#0f0f0f" : "#e8e8e8", fontSize: "1.3rem" }}
                    >
                      {section.title}
                    </h3>
                  </div>

                  {/* Content */}
                  <p
                    className="text-secondary mb-3"
                    style={{ lineHeight: "1.8", paddingLeft: "63px" }}
                  >
                    {section.content}
                  </p>

                  {/* List Items */}
                  {section.items.length > 0 && (
                    <div style={{ paddingLeft: "63px" }}>
                      <div className="row">
                        {section.items.map((item, i) => (
                          <div
                            key={i}
                            className="col-md-6 mb-2"
                          >
                            <div
                              className="d-flex align-items-start gap-2"
                              style={{ fontSize: "14px" }}
                            >
                              <span
                                style={{
                                  color: "#f59e0b",
                                  marginTop: "4px",
                                  flexShrink: 0,
                                  fontSize: "8px",
                                }}
                              >
                                ●
                              </span>
                              <span className="text-secondary">{item}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════ TRUST BANNER ═══════════ */}
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
            <LuShieldCheck
              size={40}
              className="mb-3"
              style={{ color: "#f59e0b" }}
            />
            <h4 className="fw-bold mb-2" style={{ color: "#e8e8e8" }}>
              Your Trust is Our Foundation
            </h4>
            <p
              className="text-secondary mx-auto mb-4"
              style={{ maxWidth: "600px" }}
            >
              ShoppYnow is committed to maintaining the highest standards of data
              privacy and security. We comply with GDPR, CCPA, and other
              applicable privacy regulations.
            </p>
            <div className="d-flex justify-content-center gap-4 flex-wrap">
              {["GDPR Compliant", "SSL Encrypted", "PCI-DSS Certified"].map(
                (badge, i) => (
                  <span
                    key={i}
                    style={{
                      padding: "8px 20px",
                      borderRadius: "50px",
                      border: "1px solid rgba(245, 158, 11, 0.3)",
                      color: "#f59e0b",
                      fontSize: "13px",
                      fontWeight: "600",
                      letterSpacing: "0.5px",
                      background: "rgba(245, 158, 11, 0.06)",
                    }}
                  >
                    {badge}
                  </span>
                )
              )}
            </div>
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
        .policy-card:hover {
          border-color: rgba(245, 158, 11, 0.2) !important;
          background: linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02)) !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(245, 158, 11, 0.06);
        }
      `}</style>
    </div>
  );
};

export default PrivacyPolicy;
