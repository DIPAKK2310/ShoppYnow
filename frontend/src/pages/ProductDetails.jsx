import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addcart } from "../redux/Slice.js";
import axios from "axios";
import { motion } from "motion/react";
import {
  LuShoppingCart,
  LuHeart,
  LuChevronRight,
  LuStar,
  LuPackage,
  LuShieldCheck,
  LuTruck,
  LuRotateCcw,
  LuMinus,
  LuPlus,
  LuZoomIn,
} from "react-icons/lu";
import toast from "react-hot-toast";
import ReviewPage from "./ReviewPage";

/* ── skeleton placeholder ── */
const SkeletonBlock = ({ width = "100%", height = "20px", radius = "8px", style = {} }) => (
  <div
    style={{
      width, height, borderRadius: radius,
      background: "linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.5s infinite",
      ...style,
    }}
  />
);

const LoadingSkeleton = () => (
  <div style={{ background: "#111111", minHeight: "100vh" }}>
    <div className="container py-5">
      <SkeletonBlock width="180px" height="14px" style={{ marginBottom: 40 }} />
      <div className="row g-5">
        <div className="col-12 col-lg-6">
          <SkeletonBlock height="480px" radius="20px" />
        </div>
        <div className="col-12 col-lg-6">
          <SkeletonBlock width="100px" height="14px" style={{ marginBottom: 16 }} />
          <SkeletonBlock width="80%" height="32px" style={{ marginBottom: 12 }} />
          <SkeletonBlock width="60%" height="24px" style={{ marginBottom: 24 }} />
          <SkeletonBlock width="140px" height="36px" style={{ marginBottom: 32 }} />
          <SkeletonBlock height="1px" style={{ marginBottom: 24 }} />
          <SkeletonBlock height="80px" style={{ marginBottom: 24 }} />
          <SkeletonBlock height="1px" style={{ marginBottom: 24 }} />
          <SkeletonBlock height="56px" radius="14px" style={{ marginBottom: 12 }} />
          <SkeletonBlock height="56px" radius="14px" />
        </div>
      </div>
    </div>
  </div>
);

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [imgZoomed, setImgZoomed] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(`${BASE_URL}/api/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.response?.data?.message || "Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id, BASE_URL]);

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) dispatch(addcart(product));
    toast.success(`${product.name} × ${quantity} added to cart 🛒`);
  };

  /* ── LOADING ── */
  if (loading) return <LoadingSkeleton />;

  /* ── ERROR ── */
  if (error || !product) {
    return (
      <div
        style={{ background: "#111111", minHeight: "100vh" }}
        className="d-flex align-items-center justify-content-center"
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center" style={{ padding: 60 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(239,68,68,0.1)", border: "2px solid rgba(239,68,68,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <LuPackage size={36} style={{ color: "#ef4444" }} />
          </div>
          <h4 className="fw-bold mb-2" style={{ color: "#e8e8e8" }}>Product not found</h4>
          <p style={{ color: "#888", marginBottom: 24 }}>{error || "This product may have been removed."}</p>
          <button onClick={() => navigate("/products")} className="btn" style={{ background: "linear-gradient(135deg,#f59e0b,#f97316)", color: "#111", borderRadius: 50, padding: "10px 32px", fontWeight: 600, border: "none" }}>
            Browse Products
          </button>
        </motion.div>
      </div>
    );
  }

  /* ── helper data ── */
  const hasDiscount = product.discountprice && product.discountprice < product.price;
  const discountPercent = hasDiscount ? Math.round((1 - product.discountprice / product.price) * 100) : 0;
  const displayPrice = hasDiscount ? product.discountprice : product.price;
  const rating = product.ratings?.average || 0;
  const totalReviews = product.ratings?.totalReviews || 0;

  const perks = [
    { icon: <LuTruck size={18} />, label: "Free Shipping", sub: "On orders over $50" },
    { icon: <LuShieldCheck size={18} />, label: "Secure Checkout", sub: "SSL encrypted" },
    { icon: <LuRotateCcw size={18} />, label: "Easy Returns", sub: "30-day policy" },
  ];

  return (
    <div style={{ background: "#111111", minHeight: "100vh" }}>
      {/* ── Breadcrumb ── */}
      <div style={{ background: "rgba(245,158,11,0.04)", borderBottom: "1px solid rgba(245,158,11,0.08)" }}>
        <div className="container py-3">
          <motion.nav initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="d-flex align-items-center gap-2" style={{ fontSize: 13, color: "#888" }}>
            <Link to="/" style={{ color: "#888", textDecoration: "none" }}>Home</Link>
            <LuChevronRight size={12} />
            <Link to="/products" style={{ color: "#888", textDecoration: "none" }}>Products</Link>
            <LuChevronRight size={12} />
            <span style={{ color: "#f59e0b" }}>{product.name}</span>
          </motion.nav>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="container py-5">
        <div className="row g-5">
          {/* ─── IMAGE ─── */}
          <div className="col-12 col-lg-6">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div
                onClick={() => setImgZoomed(!imgZoomed)}
                style={{
                  position: "relative", borderRadius: 20, overflow: "hidden", cursor: "zoom-in",
                  background: "linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {/* badges */}
                {product.category && (
                  <span style={{ position: "absolute", top: 16, left: 16, zIndex: 2, padding: "6px 16px", borderRadius: 50, background: "rgba(17,17,17,0.85)", backdropFilter: "blur(8px)", border: "1px solid rgba(245,158,11,0.25)", color: "#f59e0b", fontSize: 12, fontWeight: 600, letterSpacing: 0.5 }}>
                    {product.category}
                  </span>
                )}
                {hasDiscount && (
                  <span style={{ position: "absolute", top: 16, right: 16, zIndex: 2, padding: "6px 14px", borderRadius: 50, background: "linear-gradient(135deg,#f59e0b,#f97316)", color: "#111", fontSize: 12, fontWeight: 700 }}>
                    -{discountPercent}%
                  </span>
                )}
                {/* zoom icon */}
                <div style={{ position: "absolute", bottom: 16, right: 16, zIndex: 2, width: 40, height: 40, borderRadius: 12, background: "rgba(17,17,17,0.7)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <LuZoomIn size={18} style={{ color: "#f59e0b" }} />
                </div>

                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{
                    width: "100%", height: imgZoomed ? "600px" : "480px", objectFit: "cover",
                    transition: "all 0.5s ease", transform: imgZoomed ? "scale(1.15)" : "scale(1)",
                  }}
                  onError={(e) => { e.target.src = "https://placehold.co/600x480/1a1a1a/f59e0b?text=No+Image"; }}
                />
              </div>
            </motion.div>
          </div>

          {/* ─── DETAILS ─── */}
          <div className="col-12 col-lg-6">
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
              {/* category tag */}
              <div className="d-flex align-items-center gap-2 mb-3">
                <LuPackage size={16} style={{ color: "#f59e0b" }} />
                <span style={{ color: "#f59e0b", fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" }}>
                  {product.category}
                </span>
              </div>

              {/* name */}
              <h1 className="fw-bold mb-3" style={{ color: "#f0f0f0", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", lineHeight: 1.3 }}>
                {product.name}
              </h1>

              {/* rating */}
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="d-flex align-items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <LuStar key={s} size={16} fill={s <= rating ? "#f59e0b" : "transparent"} style={{ color: s <= rating ? "#f59e0b" : "rgba(255,255,255,0.15)" }} />
                  ))}
                </div>
                <span style={{ color: "#888", fontSize: 13 }}>
                  {rating > 0 ? `${rating.toFixed(1)} (${totalReviews} reviews)` : "No reviews yet"}
                </span>
              </div>

              {/* price */}
              <div className="d-flex align-items-baseline gap-3 mb-4">
                <span className="fw-bold" style={{ background: "linear-gradient(135deg,#f59e0b,#f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: "2rem" }}>
                  ${displayPrice}
                </span>
                {hasDiscount && (
                  <span style={{ color: "#666", textDecoration: "line-through", fontSize: "1.1rem" }}>${product.price}</span>
                )}
              </div>

              {/* divider */}
              <div style={{ height: 1, background: "linear-gradient(to right,rgba(245,158,11,0.2),transparent)", marginBottom: 24 }} />

              {/* description */}
              <div className="mb-4">
                <h6 className="fw-bold mb-2" style={{ color: "#e8e8e8", fontSize: 14 }}>About this product</h6>
                <p style={{ color: "#aaa", fontSize: 14, lineHeight: 1.8 }}>
                  {Array.isArray(product.description) ? product.description.join(" ") : product.description || "No description available."}
                </p>
              </div>

              {/* variants */}
              {product.variants?.length > 0 && (
                <div className="mb-4">
                  <h6 className="fw-bold mb-2" style={{ color: "#e8e8e8", fontSize: 14 }}>Available Variants</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {product.variants.map((v, i) => (
                      <span key={i} style={{ padding: "6px 14px", borderRadius: 50, background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", color: "#f59e0b", fontSize: 12, fontWeight: 600 }}>
                        {v.size && `Size: ${v.size}`}{v.size && v.color && " · "}{v.color && `Color: ${v.color}`}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* divider */}
              <div style={{ height: 1, background: "linear-gradient(to right,rgba(245,158,11,0.2),transparent)", marginBottom: 24 }} />

              {/* quantity */}
              <div className="d-flex align-items-center gap-4 mb-4">
                <span style={{ color: "#aaa", fontSize: 14, fontWeight: 600 }}>Quantity</span>
                <div className="d-flex align-items-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, overflow: "hidden" }}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ background: "transparent", border: "none", color: "#f59e0b", padding: "10px 14px", cursor: "pointer", fontSize: 16 }}><LuMinus size={16} /></button>
                  <span style={{ padding: "10px 20px", color: "#e8e8e8", fontWeight: 700, fontSize: 15, minWidth: 40, textAlign: "center", borderLeft: "1px solid rgba(255,255,255,0.06)", borderRight: "1px solid rgba(255,255,255,0.06)" }}>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} style={{ background: "transparent", border: "none", color: "#f59e0b", padding: "10px 14px", cursor: "pointer", fontSize: 16 }}><LuPlus size={16} /></button>
                </div>
              </div>

              {/* action buttons */}
              <div className="d-flex flex-column gap-3 mb-4">
                <button
                  onClick={handleAddToCart}
                  className="btn d-flex align-items-center justify-content-center gap-2"
                  style={{ background: "linear-gradient(135deg,#f59e0b,#f97316)", color: "#111", borderRadius: 14, padding: "16px 24px", fontWeight: 700, fontSize: 15, border: "none", transition: "all 0.3s ease" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(245,158,11,0.3)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <LuShoppingCart size={18} />
                  Add to Cart — ${(displayPrice * quantity).toFixed(2)}
                </button>
                <button
                  className="btn d-flex align-items-center justify-content-center gap-2"
                  style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", color: "#f59e0b", borderRadius: 14, padding: "14px 24px", fontWeight: 600, fontSize: 14, transition: "all 0.3s ease" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(245,158,11,0.15)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(245,158,11,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <LuHeart size={18} />
                  Add to Wishlist
                </button>
              </div>

              {/* perks */}
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 20 }}>
                {perks.map((p, i) => (
                  <div key={i} className="d-flex align-items-center gap-3" style={{ padding: "10px 0", borderBottom: i < perks.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(245,158,11,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#f59e0b", flexShrink: 0 }}>{p.icon}</div>
                    <div>
                      <div style={{ color: "#e8e8e8", fontSize: 13, fontWeight: 600 }}>{p.label}</div>
                      <div style={{ color: "#666", fontSize: 12 }}>{p.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Review Section ── */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <div style={{ marginTop: 60, background: "linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "40px 30px" }}>
            <ReviewPage />
          </div>
        </motion.div>
      </div>

      {/* ── Inline Styles ── */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
