// src/pages/FAQ.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LuCircleHelp,
  LuChevronDown,
  LuShoppingCart,
  LuCreditCard,
  LuTruck,
  LuRotateCcw,
  LuUserCog,
  LuMessageCircleQuestion,
  LuFileText,
  LuArrowUp,
  LuMail,
  LuSearch,
  LuX,
} from "react-icons/lu";

const faqCategories = [
  {
    id: "orders",
    icon: <LuShoppingCart size={20} />,
    label: "Orders",
  },
  {
    id: "payments",
    icon: <LuCreditCard size={20} />,
    label: "Payments",
  },
  {
    id: "shipping",
    icon: <LuTruck size={20} />,
    label: "Shipping",
  },
  {
    id: "returns",
    icon: <LuRotateCcw size={20} />,
    label: "Returns",
  },
  {
    id: "account",
    icon: <LuUserCog size={20} />,
    label: "Account",
  },
  {
    id: "general",
    icon: <LuMessageCircleQuestion size={20} />,
    label: "General",
  },
];

const faqData = [
  {
    category: "orders",
    question: "How do I place an order on ShoppYnow?",
    answer:
      "Simply browse our catalog, add products to your cart, and proceed to checkout. You can shop as a guest or create an account for a faster experience. Once your order is confirmed, you'll receive an email with all the details.",
  },
  {
    category: "orders",
    question: "Can I modify or cancel my order after placing it?",
    answer:
      "You can modify or cancel your order within 1 hour of placing it, provided it hasn't been dispatched yet. Go to 'My Orders' in your account dashboard or contact our support team for assistance.",
  },
  {
    category: "orders",
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you'll receive a tracking link via email and SMS. You can also track your order from the 'My Orders' section in your account. We provide real-time updates so you always know where your package is.",
  },
  {
    category: "orders",
    question: "What happens if an item is out of stock?",
    answer:
      "If an item goes out of stock after you've placed an order, we'll notify you immediately and offer either a full refund or a similar product recommendation. You can also opt to be notified when the item is back in stock.",
  },
  {
    category: "payments",
    question: "What payment methods do you accept?",
    answer:
      "We accept Credit/Debit cards (Visa, Mastercard, RuPay), UPI (Google Pay, PhonePe, Paytm), Net Banking, popular wallets, and Cash on Delivery (COD) for eligible orders. All online payments are processed through secure, encrypted payment gateways.",
  },
  {
    category: "payments",
    question: "Is it safe to use my credit card on ShoppYnow?",
    answer:
      "Absolutely. We use 256-bit SSL encryption and are PCI-DSS compliant. Your payment information is never stored on our servers. All transactions are processed through trusted, industry-leading payment partners.",
  },
  {
    category: "payments",
    question: "Are there any EMI options available?",
    answer:
      "Yes! We offer No-Cost EMI and Standard EMI options on select bank credit cards for orders above ₹3,000. Available EMI plans range from 3 to 12 months depending on the bank and product.",
  },
  {
    category: "payments",
    question: "What should I do if my payment fails?",
    answer:
      "If your payment fails, please check your bank balance and try again. If the amount was debited but the order wasn't confirmed, the refund will be initiated automatically within 5-7 business days. Contact support if the issue persists.",
  },
  {
    category: "shipping",
    question: "How long does delivery take?",
    answer:
      "Standard delivery takes 5-7 business days. Express delivery is available in select metro cities with 1-3 day shipping. Delivery timelines may vary based on your location and product availability.",
  },
  {
    category: "shipping",
    question: "Do you offer free shipping?",
    answer:
      "Yes! We offer free standard shipping on all orders above ₹999. For orders below ₹999, a flat shipping fee of ₹49 applies. Express shipping charges are calculated at checkout based on your location.",
  },
  {
    category: "shipping",
    question: "Do you ship internationally?",
    answer:
      "Currently, we ship only within India. We're working on expanding to international markets soon. Stay tuned for updates by subscribing to our newsletter!",
  },
  {
    category: "shipping",
    question: "What if my package is damaged during shipping?",
    answer:
      "If you receive a damaged package, please take photos and contact our support team within 48 hours of delivery. We'll arrange a free replacement or full refund — no questions asked.",
  },
  {
    category: "returns",
    question: "What is your return policy?",
    answer:
      "We offer a 7-day hassle-free return window from the date of delivery. Products must be unused, unwashed, and in their original packaging with all tags attached. Some items like intimate wear and personalized products are non-returnable.",
  },
  {
    category: "returns",
    question: "How do I initiate a return?",
    answer:
      "Go to 'My Orders', select the order you want to return, and click 'Request Return'. Choose your reason, and our pickup partner will collect the item from your address within 2-3 business days.",
  },
  {
    category: "returns",
    question: "When will I receive my refund?",
    answer:
      "Refunds are processed within 7-10 business days after we receive and inspect the returned item. The amount will be credited to your original payment method. For COD orders, refunds are transferred to your bank account.",
  },
  {
    category: "returns",
    question: "Can I exchange a product instead of returning it?",
    answer:
      "Yes! We offer exchanges for size and color variations. While initiating a return, simply select the 'Exchange' option and choose your preferred size or color. The replacement will be shipped once we receive the original item.",
  },
  {
    category: "account",
    question: "How do I create an account?",
    answer:
      "Click on 'Register' in the top navigation bar, fill in your details (name, email, password), and you're all set! You can also sign up during checkout for a seamless experience.",
  },
  {
    category: "account",
    question: "I forgot my password. How do I reset it?",
    answer:
      "Click on 'Login', then select 'Forgot Password'. Enter your registered email address, and we'll send you a password reset link. The link is valid for 24 hours. If you don't receive the email, check your spam folder.",
  },
  {
    category: "account",
    question: "How do I update my profile information?",
    answer:
      "Log in to your account and navigate to 'Profile Settings'. You can update your name, email, phone number, and saved addresses. Changes are saved instantly.",
  },
  {
    category: "account",
    question: "Can I delete my account?",
    answer:
      "Yes, you can request account deletion by contacting our support team at support@shoppynow.com. Please note that account deletion is permanent and all your order history and saved data will be removed.",
  },
  {
    category: "general",
    question: "Is ShoppYnow a legitimate company?",
    answer:
      "Yes! ShoppYnow is a registered e-commerce platform based in Mumbai, India. We work with verified sellers and trusted brands to bring you quality products at competitive prices. We comply with all applicable Indian e-commerce regulations.",
  },
  {
    category: "general",
    question: "How can I contact customer support?",
    answer:
      "You can reach us via email at support@shoppynow.com, call us at +91 98765 43210, or use the Contact form on our website. Our support team is available 24/7 and typically responds within 48 business hours.",
  },
  {
    category: "general",
    question: "Do you have a mobile app?",
    answer:
      "We're currently developing our mobile app for both Android and iOS platforms. In the meantime, our website is fully responsive and optimized for mobile browsing. Stay tuned for the app launch!",
  },
  {
    category: "general",
    question: "How do I subscribe to your newsletter?",
    answer:
      "You can subscribe to our newsletter by entering your email in the footer section of our website. You'll receive updates on new arrivals, exclusive deals, and seasonal promotions directly in your inbox.",
  },
];

const AccordionItem = ({ faq, isOpen, onToggle, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      className="mb-3"
    >
      <div
        className="faq-card"
        style={{
          background:
            isOpen
              ? "linear-gradient(135deg, rgba(245,158,11,0.06), rgba(255,255,255,0.02))"
              : "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
          border: isOpen
            ? "1px solid rgba(245, 158, 11, 0.2)"
            : "1px solid rgba(255,255,255,0.07)",
          borderRadius: "14px",
          overflow: "hidden",
          transition: "all 0.3s ease",
        }}
      >
        {/* Question */}
        <button
          onClick={onToggle}
          className="d-flex align-items-center justify-content-between w-100"
          style={{
            background: "transparent",
            border: "none",
            padding: "20px 24px",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <span
            className="fw-semibold"
            style={{
              color: isOpen ? "#f59e0b" : "#e0e0e0",
              fontSize: "15px",
              lineHeight: "1.5",
              paddingRight: "16px",
              transition: "color 0.3s ease",
            }}
          >
            {faq.question}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ flexShrink: 0 }}
          >
            <LuChevronDown
              size={20}
              style={{ color: isOpen ? "#f59e0b" : "#666" }}
            />
          </motion.div>
        </button>

        {/* Answer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div
                style={{
                  padding: "0 24px 20px 24px",
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                  paddingTop: "16px",
                }}
              >
                <p
                  className="text-secondary mb-0"
                  style={{ fontSize: "14px", lineHeight: "1.8" }}
                >
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState("orders");
  const [openIndex, setOpenIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Filter FAQs
  const filteredFaqs = searchTerm.trim()
    ? faqData.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : faqData.filter((faq) => faq.category === activeCategory);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  // Reset open index when switching categories
  useEffect(() => {
    setOpenIndex(0);
  }, [activeCategory, searchTerm]);

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
                  <LuCircleHelp size={20} style={{ color: "#f59e0b" }} />
                  <span
                    className="text-uppercase fw-semibold"
                    style={{
                      color: "#f59e0b",
                      fontSize: "13px",
                      letterSpacing: "3px",
                    }}
                  >
                    Help Center
                  </span>
                </div>
                <h1
                  className="display-4 fw-bold mb-3"
                  style={{ color: "#f0f0f0" }}
                >
                  Frequently Asked{" "}
                  <span
                    style={{
                      background:
                        "linear-gradient(135deg, #f59e0b, #f97316)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Questions
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
                  Find answers to your questions about{" "}
                  <strong style={{ color: "#f59e0b" }}>ShoppYnow</strong>.
                  Can't find what you're looking for? Feel free to contact our
                  support team.
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
                  <LuMessageCircleQuestion
                    size={80}
                    style={{ color: "#f59e0b", opacity: 0.8 }}
                  />
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

      {/* ═══════════ SEARCH BAR ═══════════ */}
      <div
        style={{
          background: "rgba(245, 158, 11, 0.06)",
          borderTop: "1px solid rgba(245, 158, 11, 0.15)",
          borderBottom: "1px solid rgba(245, 158, 11, 0.08)",
        }}
      >
        <div className="container py-3 d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div
            className="d-flex align-items-center flex-grow-1"
            style={{
              maxWidth: "500px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              padding: "10px 16px",
            }}
          >
            <LuSearch size={18} style={{ color: "#f59e0b", flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search your question..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#e8e8e8",
                fontSize: "14px",
                paddingLeft: "10px",
                width: "100%",
              }}
            />
            {searchTerm && (
              <LuX
                size={16}
                style={{ color: "#aaa", cursor: "pointer", flexShrink: 0 }}
                onClick={() => setSearchTerm("")}
              />
            )}
          </div>
          <span className="text-secondary small">
            <strong style={{ color: "#f59e0b" }}>{filteredFaqs.length}</strong>{" "}
            {filteredFaqs.length === 1 ? "question" : "questions"} found
          </span>
        </div>
      </div>

      {/* ═══════════ CATEGORY TABS + FAQ CONTENT ═══════════ */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Category tabs */}
            {!searchTerm && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="d-flex flex-wrap gap-2 mb-5 justify-content-center"
              >
                {faqCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className="btn d-flex align-items-center gap-2"
                    style={{
                      padding: "10px 20px",
                      borderRadius: "50px",
                      border:
                        activeCategory === cat.id
                          ? "1px solid rgba(245, 158, 11, 0.4)"
                          : "1px solid rgba(255,255,255,0.1)",
                      background:
                        activeCategory === cat.id
                          ? "linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.05))"
                          : "rgba(255,255,255,0.03)",
                      color: activeCategory === cat.id ? "#f59e0b" : "#888",
                      fontSize: "13px",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {cat.icon}
                    {cat.label}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Search active indicator */}
            {searchTerm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="d-flex align-items-center gap-2 mb-4"
              >
                <LuSearch size={16} style={{ color: "#f59e0b" }} />
                <span className="text-secondary small">
                  Showing results for:{" "}
                  <strong style={{ color: "#f59e0b" }}>"{searchTerm}"</strong>
                </span>
              </motion.div>
            )}

            {/* FAQ Accordion */}
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <AccordionItem
                  key={`${faq.category}-${index}`}
                  faq={faq}
                  index={index}
                  isOpen={openIndex === index}
                  onToggle={() => handleToggle(index)}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-5"
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: "rgba(245, 158, 11, 0.08)",
                    border: "2px solid rgba(245, 158, 11, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                  }}
                >
                  <LuSearch
                    size={32}
                    style={{ color: "#f59e0b", opacity: 0.6 }}
                  />
                </div>
                <h5 className="fw-bold mb-2" style={{ color: "#e8e8e8" }}>
                  No questions found
                </h5>
                <p
                  className="text-secondary mb-3"
                  style={{ fontSize: "14px" }}
                >
                  Try a different search term or browse by category
                </p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="btn"
                  style={{
                    background: "rgba(245, 158, 11, 0.1)",
                    border: "1px solid rgba(245, 158, 11, 0.25)",
                    color: "#f59e0b",
                    borderRadius: "50px",
                    padding: "8px 24px",
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                >
                  Clear Search
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* ═══════════ CONTACT CTA BANNER ═══════════ */}
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
            <LuMail
              size={40}
              className="mb-3"
              style={{ color: "#f59e0b" }}
            />
            <h4 className="fw-bold mb-2" style={{ color: "#e8e8e8" }}>
              Still Have Questions?
            </h4>
            <p
              className="text-secondary mx-auto mb-4"
              style={{ maxWidth: "500px" }}
            >
              Our support team is available 24/7 to help you. Reach out and
              we'll get back to you within 48 hours.
            </p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <a
                href="/contact"
                className="btn d-inline-flex align-items-center gap-2"
                style={{
                  padding: "12px 28px",
                  borderRadius: "50px",
                  border: "none",
                  color: "#111111",
                  fontSize: "14px",
                  fontWeight: "600",
                  background: "linear-gradient(135deg, #f59e0b, #f97316)",
                  transition: "all 0.3s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow =
                    "0 8px 24px rgba(245, 158, 11, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                <LuMail size={16} />
                Contact Support
              </a>
              <a
                href="mailto:support@shoppynow.com"
                className="btn d-inline-flex align-items-center gap-2"
                style={{
                  padding: "12px 28px",
                  borderRadius: "50px",
                  border: "1px solid rgba(245, 158, 11, 0.3)",
                  color: "#f59e0b",
                  fontSize: "14px",
                  fontWeight: "600",
                  background: "transparent",
                  transition: "all 0.3s ease",
                  textDecoration: "none",
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
                Email Us
              </a>
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
        .faq-card:hover {
          border-color: rgba(245, 158, 11, 0.15) !important;
          background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02)) !important;
        }
      `}</style>
    </div>
  );
};

export default FAQ;
