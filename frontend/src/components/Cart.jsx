import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removecart } from "../redux/Slice";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  LuShoppingCart,
  LuTrash2,
  LuTruck,
  LuShieldCheck,
  LuCreditCard,
  LuPackage,
  LuChevronRight,
  LuArrowRight,
} from "react-icons/lu";
import toast from "react-hot-toast";

export default function Cart() {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart.items);

  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [vatAmount, setVatAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [deliveryDate, setDeliveryDate] = useState("");

  useEffect(() => {
    const calcTotal = cartData.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);
    const calcDelivery = calcTotal > 100 ? 10 : 0;
    const calcVat = calcTotal * 0.1;
    setTotalPrice(calcTotal);
    setDeliveryCharge(calcDelivery);
    setVatAmount(calcVat);
    setFinalAmount(calcTotal + calcDelivery + calcVat);

    const d = new Date();
    d.setDate(d.getDate() + 5);
    setDeliveryDate(d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }));
  }, [cartData]);

  /* Group items by _id so duplicates show as quantity */
  const groupedItems = cartData.reduce((acc, item) => {
    const existing = acc.find((g) => g._id === item._id);
    if (existing) {
      existing.qty += 1;
    } else {
      acc.push({ ...item, qty: 1 });
    }
    return acc;
  }, []);

  const removeData = (item) => {
    dispatch(removecart(item._id));
    toast.error(`${item.name} removed from cart ❌`);
  };

  const fmt = (v) => (typeof v === "number" ? v.toFixed(2) : "0.00");

  /* ── EMPTY STATE ── */
  if (cartData.length === 0) {
    return (
      <div style={{ background: "#111111", minHeight: "100vh" }} className="d-flex align-items-center justify-content-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center" style={{ padding: 60 }}>
          <div style={{ width: 100, height: 100, borderRadius: "50%", background: "rgba(245,158,11,0.08)", border: "2px solid rgba(245,158,11,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px" }}>
            <LuShoppingCart size={44} style={{ color: "#f59e0b", opacity: 0.7 }} />
          </div>
          <h3 className="fw-bold mb-2" style={{ color: "#e8e8e8" }}>Your cart is empty</h3>
          <p style={{ color: "#888", marginBottom: 28, fontSize: 15 }}>Looks like you haven't added anything yet.</p>
          <Link to="/products" className="btn d-inline-flex align-items-center gap-2" style={{ background: "linear-gradient(135deg,#f59e0b,#f97316)", color: "#111", borderRadius: 50, padding: "12px 32px", fontWeight: 700, fontSize: 14, border: "none", textDecoration: "none" }}>
            Browse Products <LuArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ background: "#111111", minHeight: "100vh" }}>
      {/* ── Breadcrumb ── */}
      <div style={{ background: "rgba(245,158,11,0.04)", borderBottom: "1px solid rgba(245,158,11,0.08)" }}>
        <div className="container py-3">
          <nav className="d-flex align-items-center gap-2" style={{ fontSize: 13, color: "#888" }}>
            <Link to="/" style={{ color: "#888", textDecoration: "none" }}>Home</Link>
            <LuChevronRight size={12} />
            <span style={{ color: "#f59e0b" }}>Cart</span>
          </nav>
        </div>
      </div>

      {/* ── Header ── */}
      <div className="container pt-5 pb-3">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="d-flex align-items-center gap-3 mb-2">
          <LuShoppingCart size={28} style={{ color: "#f59e0b" }} />
          <h2 className="fw-bold mb-0" style={{ color: "#f0f0f0" }}>
            Shopping{" "}
            <span style={{ background: "linear-gradient(135deg,#f59e0b,#f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Cart</span>
          </h2>
        </motion.div>
        <p style={{ color: "#888", fontSize: 14 }}>{cartData.length} item{cartData.length !== 1 ? "s" : ""} in your cart</p>
      </div>

      {/* ── Main ── */}
      <div className="container pb-5">
        <div className="row g-4">
          {/* ── Cart Items ── */}
          <div className="col-12 col-lg-8">
            <AnimatePresence>
              {groupedItems.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  style={{
                    background: "linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 16, padding: 20, marginBottom: 16,
                    transition: "border-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(245,158,11,0.2)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
                >
                  <div className="row align-items-center g-3">
                    {/* Image */}
                    <div className="col-12 col-sm-3">
                      <Link to={`/products/${item._id}`}>
                        <div style={{ borderRadius: 12, overflow: "hidden", background: "rgba(255,255,255,0.02)" }}>
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            style={{ width: "100%", height: 120, objectFit: "cover", transition: "transform 0.3s ease" }}
                            onError={(e) => { e.target.src = "https://placehold.co/300x200/1a1a1a/f59e0b?text=No+Image"; }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                          />
                        </div>
                      </Link>
                    </div>

                    {/* Info */}
                    <div className="col-12 col-sm-5">
                      <Link to={`/products/${item._id}`} style={{ textDecoration: "none" }}>
                        <h6 className="fw-bold mb-1" style={{ color: "#e8e8e8", fontSize: 15 }}>{item.name}</h6>
                      </Link>
                      {item.category && (
                        <span style={{ padding: "3px 10px", borderRadius: 50, background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.15)", color: "#f59e0b", fontSize: 11, fontWeight: 600 }}>
                          {item.category}
                        </span>
                      )}
                      <p style={{ color: "#777", fontSize: 13, marginTop: 8, marginBottom: 0, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                        {Array.isArray(item.description) ? item.description[0] : item.description || ""}
                      </p>
                    </div>

                    {/* Qty & Price */}
                    <div className="col-6 col-sm-2 text-center">
                      <div style={{ color: "#888", fontSize: 12, marginBottom: 4 }}>Qty</div>
                      <span className="fw-bold" style={{ color: "#e8e8e8", fontSize: 16 }}>{item.qty}</span>
                    </div>

                    {/* Price & Actions */}
                    <div className="col-6 col-sm-2 text-end">
                      <span className="fw-bold d-block mb-2" style={{ background: "linear-gradient(135deg,#f59e0b,#f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: "1.1rem" }}>
                        ${fmt(item.price * item.qty)}
                      </span>
                      <button
                        onClick={() => removeData(item)}
                        className="btn d-inline-flex align-items-center gap-1"
                        style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", borderRadius: 10, padding: "6px 12px", fontSize: 12, fontWeight: 600, transition: "all 0.3s ease" }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
                      >
                        <LuTrash2 size={13} /> Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Shipping & Payment Info */}
            <div className="row g-3 mt-2">
              <div className="col-12 col-md-6">
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 20 }}>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <LuTruck size={18} style={{ color: "#f59e0b" }} />
                    <span className="fw-bold" style={{ color: "#e8e8e8", fontSize: 14 }}>Estimated Delivery</span>
                  </div>
                  <p style={{ color: "#aaa", fontSize: 14, marginBottom: 0 }}>{deliveryDate}</p>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 20 }}>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <LuCreditCard size={18} style={{ color: "#f59e0b" }} />
                    <span className="fw-bold" style={{ color: "#e8e8e8", fontSize: 14 }}>We Accept</span>
                  </div>
                  <div className="d-flex gap-2">
                    <img width="40" src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg" alt="Visa" style={{ borderRadius: 4, background: "#fff", padding: 4 }} />
                    <img width="40" src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg" alt="Amex" style={{ borderRadius: 4, background: "#fff", padding: 4 }} />
                    <img width="40" src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg" alt="Mastercard" style={{ borderRadius: 4, background: "#fff", padding: 4 }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Order Summary ── */}
          <div className="col-12 col-lg-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ position: "sticky", top: 100 }}>
              <div style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 28, overflow: "hidden", position: "relative" }}>
                {/* Decorative glow */}
                <div style={{ position: "absolute", top: -40, right: -40, width: 120, height: 120, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,158,11,0.08),transparent 70%)" }} />

                <div className="d-flex align-items-center gap-2 mb-4">
                  <LuPackage size={20} style={{ color: "#f59e0b" }} />
                  <h5 className="fw-bold mb-0" style={{ color: "#e8e8e8" }}>Order Summary</h5>
                </div>

                {/* Line items */}
                <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 16, marginBottom: 16 }}>
                  {[
                    { label: `Products (${cartData.length})`, value: `$${fmt(totalPrice)}` },
                    { label: "Shipping", value: deliveryCharge === 0 ? "Free" : `$${fmt(deliveryCharge)}`, highlight: deliveryCharge === 0 },
                    { label: "VAT (10%)", value: `$${fmt(vatAmount)}` },
                  ].map((row, i) => (
                    <div key={i} className="d-flex justify-content-between align-items-center mb-3">
                      <span style={{ color: "#aaa", fontSize: 14 }}>{row.label}</span>
                      <span style={{ color: row.highlight ? "#22c55e" : "#e8e8e8", fontSize: 14, fontWeight: 600 }}>{row.value}</span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <span className="fw-bold" style={{ color: "#e8e8e8", fontSize: 16 }}>Total</span>
                    <div style={{ color: "#666", fontSize: 11 }}>Including VAT</div>
                  </div>
                  <span className="fw-bold" style={{ background: "linear-gradient(135deg,#f59e0b,#f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: "1.5rem" }}>
                    ${fmt(finalAmount)}
                  </span>
                </div>

                {/* Checkout */}
                <button
                  className="btn w-100 d-flex align-items-center justify-content-center gap-2"
                  style={{ background: "linear-gradient(135deg,#f59e0b,#f97316)", color: "#111", borderRadius: 14, padding: "16px 24px", fontWeight: 700, fontSize: 15, border: "none", transition: "all 0.3s ease" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(245,158,11,0.3)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  Proceed to Checkout <LuArrowRight size={18} />
                </button>

                {/* Trust badges */}
                <div className="d-flex align-items-center justify-content-center gap-3 mt-4">
                  <div className="d-flex align-items-center gap-1" style={{ color: "#666", fontSize: 12 }}>
                    <LuShieldCheck size={14} style={{ color: "#f59e0b" }} /> Secure
                  </div>
                  <div className="d-flex align-items-center gap-1" style={{ color: "#666", fontSize: 12 }}>
                    <LuTruck size={14} style={{ color: "#f59e0b" }} /> Fast Shipping
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
