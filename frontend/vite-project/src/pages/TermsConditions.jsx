// src/pages/TermsConditions.jsx
import React, { useEffect } from "react";
import { motion } from "motion/react";
import {
  LuFileText,
  LuShoppingCart,
  LuCreditCard,
  LuTruck,
  LuRotateCcw,
  LuScale,
  LuBan,
  LuShieldCheck,
  LuTriangleAlert ,
  LuMail,
  LuArrowUp,
  LuScrollText,
} from "react-icons/lu";

const sections = [
  {
    icon: <LuScrollText size={28} />,
    title: "1. Acceptance of Terms",
    content:
      "By accessing or using the ShoppYnow website, mobile application, or any of our services, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions. If you do not agree, please discontinue use of our platform immediately.",
    items: [
      "You must be at least 18 years old to use our services",
      "You agree to provide accurate & truthful information",
      "You are responsible for maintaining account confidentiality",
      "Violation of terms may result in account suspension",
    ],
  },
  {
    icon: <LuShoppingCart size={28} />,
    title: "2. Orders & Purchases",
    content:
      "When you place an order on ShoppYnow, you are making an offer to purchase. We reserve the right to accept or decline your order based on product availability, pricing accuracy, and other factors.",
    items: [
      "All orders are subject to availability & confirmation",
      "Prices are displayed in INR & include applicable taxes",
      "We reserve the right to cancel orders due to errors",
      "Order confirmation is sent via email upon acceptance",
      "Quantity limits may apply on certain products",
      "Promotional pricing may have specific conditions",
    ],
  },
  {
    icon: <LuCreditCard size={28} />,
    title: "3. Payment Terms",
    content:
      "We offer multiple secure payment methods for your convenience. All transactions are processed through encrypted payment gateways to ensure your financial data remains safe.",
    items: [
      "Accepted: Credit/Debit cards, UPI, Net Banking, Wallets",
      "All payments are securely processed via SSL encryption",
      "Cash on Delivery available for eligible orders",
      "Refunds are processed to the original payment method",
      "Payment must be completed before order dispatch",
      "EMI options available on select banks & products",
    ],
  },
  {
    icon: <LuTruck size={28} />,
    title: "4. Shipping & Delivery",
    content:
      "We strive to deliver your orders promptly and safely. Delivery timelines may vary based on your location, product availability, and external factors beyond our control.",
    items: [
      "Standard delivery within 5–7 business days",
      "Express delivery available in select metro cities",
      "Free shipping on orders above ₹999",
      "Tracking details shared via email & SMS",
      "Delivery to valid Indian addresses only",
      "Delays due to natural events are not our liability",
    ],
  },
  {
    icon: <LuRotateCcw size={28} />,
    title: "5. Returns & Refunds",
    content:
      "We want you to be completely satisfied with your purchase. If you're not happy with a product, our hassle-free return policy has got you covered.",
    items: [
      "7-day return window from date of delivery",
      "Products must be unused & in original packaging",
      "Refunds processed within 7–10 business days",
      "Return shipping costs may apply in certain cases",
      "Non-returnable items are clearly marked on product pages",
      "Exchange option available for size & color issues",
    ],
  },
  {
    icon: <LuShieldCheck size={28} />,
    title: "6. Intellectual Property",
    content:
      "All content on ShoppYnow — including logos, text, graphics, images, and software — is our intellectual property or that of our licensors. Unauthorized use is strictly prohibited.",
    items: [
      "All trademarks & logos are property of ShoppYnow",
      "Content may not be reproduced without written consent",
      "User-generated content grants us a non-exclusive license",
      "Report IP infringement to our legal team",
    ],
  },
  {
    icon: <LuBan size={28} />,
    title: "7. Prohibited Activities",
    content:
      "To maintain a safe and trustworthy marketplace, certain activities are strictly prohibited on our platform. Violation may lead to immediate account termination.",
    items: [
      "Using the platform for any unlawful purpose",
      "Submitting false or misleading information",
      "Attempting to interfere with site security",
      "Reselling products commercially without authorization",
      "Creating multiple accounts for fraudulent purposes",
      "Harassing other users or our support team",
    ],
  },
  {
    icon: <LuTriangleAlert  size={28} />,
    title: "8. Limitation of Liability",
    content:
      "ShoppYnow shall not be held liable for any indirect, incidental, or consequential damages arising from your use of our services. Our total liability is limited to the amount paid for the specific product or service in question.",
    items: [
      "We are not liable for third-party actions or services",
      "Product images are illustrative & may vary slightly",
      "Service interruptions due to maintenance are expected",
      "Force majeure events release us from obligations",
    ],
  },
  {
    icon: <LuScale size={28} />,
    title: "9. Governing Law & Disputes",
    content:
      "These terms shall be governed by the laws of India. Any disputes arising from these terms or your use of our services shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.",
    items: [
      "Governed by the laws of the Republic of India",
      "Disputes subject to Mumbai court jurisdiction",
      "Arbitration may be pursued for amicable resolution",
      "30-day notice required before legal proceedings",
    ],
  },
  {
    icon: <LuMail size={28} />,
    title: "10. Contact Us",
    content:
      "If you have any questions or concerns about these Terms & Conditions, please reach out to our team. We're here to help and will respond promptly.",
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

const TermsConditions = () => {
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
                  <LuFileText size={20} style={{ color: "#f59e0b" }} />
                  <span
                    className="text-uppercase fw-semibold"
                    style={{
                      color: "#f59e0b",
                      fontSize: "13px",
                      letterSpacing: "3px",
                    }}
                  >
                    Legal Agreement
                  </span>
                </div>
                <h1
                  className="display-4 fw-bold mb-3"
                  style={{ color: "#f0f0f0" }}
                >
                  Terms &{" "}
                  <span
                    style={{
                      background:
                        "linear-gradient(135deg, #f59e0b, #f97316)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Conditions
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
                  Please review the following terms that govern your use of{" "}
                  <strong style={{ color: "#f59e0b" }}>ShoppYnow</strong>.
                  By continuing to use our platform, you agree to abide by
                  these guidelines.
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
                  <LuScale
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
              Last Updated: <strong style={{ color: "#aaa" }}>April 22, 2026</strong>
            </span>
          </div>
          <span className="text-secondary small">
            Applicable to all ShoppYnow users in India
          </span>
        </div>
      </div>

      {/* ═══════════ TERMS SECTIONS ═══════════ */}
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
                  className="terms-card"
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
                      style={{ color: "#e8e8e8", fontSize: "1.3rem" }}
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

      {/* ═══════════ AGREEMENT BANNER ═══════════ */}
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
            <LuScale
              size={40}
              className="mb-3"
              style={{ color: "#f59e0b" }}
            />
            <h4 className="fw-bold mb-2" style={{ color: "#e8e8e8" }}>
              Fair & Transparent Commerce
            </h4>
            <p
              className="text-secondary mx-auto mb-4"
              style={{ maxWidth: "600px" }}
            >
              ShoppYnow is committed to maintaining a fair, transparent, and
              trustworthy marketplace. These terms ensure a safe shopping
              experience for everyone.
            </p>
            <div className="d-flex justify-content-center gap-4 flex-wrap">
              {["Consumer Protection", "Secure Transactions", "Fair Pricing"].map(
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
        .terms-card:hover {
          border-color: rgba(245, 158, 11, 0.2) !important;
          background: linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02)) !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(245, 158, 11, 0.06);
        }
      `}</style>
    </div>
  );
};

export default TermsConditions;
