import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addcart } from "../redux/Slice";
import axios from "axios";
import SkeletonCard from "../components/ui/SkeletonCard.jsx";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "motion/react";
import {
  LuFilter,
  LuShoppingCart,
  LuPackage,
  LuSearch,
  LuX,
  LuSlidersHorizontal,
  LuChevronRight,
} from "react-icons/lu";
import toast from "react-hot-toast";

const categories = ["Men", "Women", "Shoes", "Electronic", "Beauty"];
const priceRanges = ["40-80", "80-120", "121-160", "161-200", "201-250"];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

export default function ProductsPage() {
  const [filterData, setFilteredData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendData = (value) => {
    dispatch(addcart(value));
      toast.success(`${value.name} added to cart 🛒`);

  };

  const fetchProducts = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
    return res.data;
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5, // 5 min cache
  });

  const products = data || [];

  // Filter products based on selected categories and prices
  useEffect(() => {
    filterProducts();
  }, [selectedCategories, selectedPrices, products, searchTerm]);

  const filterProducts = () => {
    let filtered = products;

    // Filter by categories
    if (selectedCategories.length > 0 && !selectedCategories.includes("All")) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category),
      );
    }

    // Filter by price
    if (selectedPrices.length > 0) {
      filtered = filtered.filter((product) => {
        return selectedPrices.some((range) => {
          const [minPrice, maxPrice] = range.split("-").map(Number);
          return product.price >= minPrice && product.price <= maxPrice;
        });
      });
    }

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    setFilteredData(filtered);
  };

  // Handle checkbox change for categories
  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) => {
      if (category === "All") {
        return prevCategories.includes("All") ? [] : ["All"];
      }
      return prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category];
    });
  };

  // Handle checkbox change for price
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedPrices((prevState) => {
      if (prevState.includes(value)) {
        return prevState.filter((price) => price !== value);
      } else {
        return [...prevState, value];
      }
    });
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedPrices([]);
    setSearchTerm("");
  };

  const activeFiltersCount =
    selectedCategories.length + selectedPrices.length + (searchTerm ? 1 : 0);

  // Open the product details page
  const openPage = (x) => {
    navigate(`/productdetails/${x.category}/${x.id}`);
  };

  /* ═══════════ FILTER SIDEBAR CONTENT (shared between desktop & mobile) ═══════════ */
  const FilterContent = () => (
    <>
      {/* Categories */}
      <div className="mb-4">
        <h6
          className="text-uppercase fw-bold mb-3"
          style={{
            color: "#f59e0b",
            fontSize: "12px",
            letterSpacing: "2px",
          }}
        >
          Categories
        </h6>

        {/* All checkbox */}
        <label
          className="d-flex align-items-center gap-2 mb-2"
          style={{
            cursor: "pointer",
            padding: "8px 12px",
            borderRadius: "10px",
            background: selectedCategories.includes("All")
              ? "rgba(245, 158, 11, 0.1)"
              : "transparent",
            border: selectedCategories.includes("All")
              ? "1px solid rgba(245, 158, 11, 0.25)"
              : "1px solid transparent",
            transition: "all 0.3s ease",
          }}
        >
          <input
            type="checkbox"
            checked={selectedCategories.includes("All")}
            onChange={() => handleCategoryChange("All")}
            style={{ display: "none" }}
          />
          <div
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "5px",
              border: selectedCategories.includes("All")
                ? "2px solid #f59e0b"
                : "2px solid rgba(255,255,255,0.2)",
              background: selectedCategories.includes("All")
                ? "#f59e0b"
                : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
              flexShrink: 0,
            }}
          >
            {selectedCategories.includes("All") && (
              <span style={{ color: "#111", fontSize: "12px", fontWeight: "bold" }}>✓</span>
            )}
          </div>
          <span
            style={{
              color: selectedCategories.includes("All") ? "#f59e0b" : "#aaa",
              fontSize: "14px",
            }}
          >
            All Categories
          </span>
        </label>

        {categories.map((cat) => (
          <label
            key={cat}
            className="d-flex align-items-center gap-2 mb-2"
            style={{
              cursor: "pointer",
              padding: "8px 12px",
              borderRadius: "10px",
              background: selectedCategories.includes(cat)
                ? "rgba(245, 158, 11, 0.1)"
                : "transparent",
              border: selectedCategories.includes(cat)
                ? "1px solid rgba(245, 158, 11, 0.25)"
                : "1px solid transparent",
              transition: "all 0.3s ease",
            }}
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat)}
              onChange={() => handleCategoryChange(cat)}
              style={{ display: "none" }}
            />
            <div
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "5px",
                border: selectedCategories.includes(cat)
                  ? "2px solid #f59e0b"
                  : "2px solid rgba(255,255,255,0.2)",
                background: selectedCategories.includes(cat)
                  ? "#f59e0b"
                  : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
                flexShrink: 0,
              }}
            >
              {selectedCategories.includes(cat) && (
                <span style={{ color: "#111", fontSize: "12px", fontWeight: "bold" }}>✓</span>
              )}
            </div>
            <span
              style={{
                color: selectedCategories.includes(cat) ? "#f59e0b" : "#aaa",
                fontSize: "14px",
              }}
            >
              {cat}
            </span>
          </label>
        ))}
      </div>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(245,158,11,0.2), transparent)",
          marginBottom: "20px",
        }}
      />

      {/* Price Filter */}
      <div className="mb-4">
        <h6
          className="text-uppercase fw-bold mb-3"
          style={{
            color: "#f59e0b",
            fontSize: "12px",
            letterSpacing: "2px",
          }}
        >
          Price Range
        </h6>

        {priceRanges.map((price) => (
          <label
            key={price}
            className="d-flex align-items-center gap-2 mb-2"
            style={{
              cursor: "pointer",
              padding: "8px 12px",
              borderRadius: "10px",
              background: selectedPrices.includes(price)
                ? "rgba(245, 158, 11, 0.1)"
                : "transparent",
              border: selectedPrices.includes(price)
                ? "1px solid rgba(245, 158, 11, 0.25)"
                : "1px solid transparent",
              transition: "all 0.3s ease",
            }}
          >
            <input
              type="checkbox"
              value={price}
              checked={selectedPrices.includes(price)}
              onChange={handleCheckboxChange}
              style={{ display: "none" }}
            />
            <div
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "5px",
                border: selectedPrices.includes(price)
                  ? "2px solid #f59e0b"
                  : "2px solid rgba(255,255,255,0.2)",
                background: selectedPrices.includes(price)
                  ? "#f59e0b"
                  : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
                flexShrink: 0,
              }}
            >
              {selectedPrices.includes(price) && (
                <span style={{ color: "#111", fontSize: "12px", fontWeight: "bold" }}>✓</span>
              )}
            </div>
            <span
              style={{
                color: selectedPrices.includes(price) ? "#f59e0b" : "#aaa",
                fontSize: "14px",
              }}
            >
              ${price}
            </span>
          </label>
        ))}
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <button
          onClick={clearAllFilters}
          className="btn w-100"
          style={{
            background: "rgba(245, 158, 11, 0.08)",
            border: "1px solid rgba(245, 158, 11, 0.2)",
            color: "#f59e0b",
            borderRadius: "10px",
            padding: "10px",
            fontSize: "13px",
            fontWeight: "600",
            transition: "all 0.3s ease",
          }}
        >
          <LuX size={14} className="me-1" />
          Clear All Filters ({activeFiltersCount})
        </button>
      )}
    </>
  );

  /* ═══════════ ERROR STATE ═══════════ */
  if (isError) {
    return (
      <div
        style={{ background: "#111111", minHeight: "100vh" }}
        className="d-flex align-items-center justify-content-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
          style={{ padding: "60px 30px" }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "rgba(239, 68, 68, 0.1)",
              border: "2px solid rgba(239, 68, 68, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
            }}
          >
            <LuX size={36} style={{ color: "#ef4444" }} />
          </div>
          <h4 className="fw-bold mb-2" style={{ color: "#e8e8e8" }}>
            Something went wrong 😢
          </h4>
          <p className="text-secondary mb-4">{error.message}</p>
          <button
            onClick={refetch}
            className="btn"
            style={{
              background: "linear-gradient(135deg, #f59e0b, #f97316)",
              color: "#111",
              borderRadius: "50px",
              padding: "10px 32px",
              fontWeight: "600",
              fontSize: "14px",
              border: "none",
            }}
          >
            Retry
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ background: "#111111", minHeight: "100vh" }}>
      {/* ═══════════ HERO HEADER ═══════════ */}
      <section
        style={{
          background:
            "linear-gradient(135deg, #111111 0%, #1a1a2e 40%, #16213e 70%, #0f3460 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
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
          <div className="row align-items-center py-3">
            <div className="col-md-7">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="d-flex align-items-center gap-2 mb-3">
                  <LuPackage size={20} style={{ color: "#f59e0b" }} />
                  <span
                    className="text-uppercase fw-semibold"
                    style={{
                      color: "#f59e0b",
                      fontSize: "13px",
                      letterSpacing: "3px",
                    }}
                  >
                    Our Collection
                  </span>
                </div>
                <h1
                  className="display-4 fw-bold mb-3"
                  style={{ color: "#f0f0f0" }}
                >
                  Explore{" "}
                  <span
                    style={{
                      background:
                        "linear-gradient(135deg, #f59e0b, #f97316)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Products
                  </span>
                </h1>
                <p
                  className="lead mb-0"
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    maxWidth: "480px",
                    lineHeight: "1.8",
                  }}
                >
                  Discover curated products from verified sellers. Quality you
                  can trust, prices you'll love.
                </p>
              </motion.div>
            </div>

            <div className="col-md-5 d-none d-md-block">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-center"
              >
                <div
                  style={{
                    width: "200px",
                    height: "200px",
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
                  <LuShoppingCart
                    size={70}
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

      {/* ═══════════ SEARCH & FILTER BAR ═══════════ */}
      <div
        style={{
          background: "rgba(245, 158, 11, 0.06)",
          borderTop: "1px solid rgba(245, 158, 11, 0.15)",
          borderBottom: "1px solid rgba(245, 158, 11, 0.08)",
        }}
      >
        <div className="container py-3 d-flex flex-wrap align-items-center justify-content-between gap-3">
          {/* Search */}
          <div
            className="d-flex align-items-center flex-grow-1"
            style={{
              maxWidth: "400px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              padding: "8px 16px",
            }}
          >
            <LuSearch size={18} style={{ color: "#f59e0b", flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search products..."
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

          {/* Results count + mobile filter */}
          <div className="d-flex align-items-center gap-3">
            <span className="text-secondary small">
              <strong style={{ color: "#f59e0b" }}>{filterData.length}</strong>{" "}
              products found
            </span>

            {/* Mobile filter button */}
            <button
              className="btn d-md-none"
              data-bs-toggle="offcanvas"
              data-bs-target="#mobileSidebar"
              style={{
                background: "rgba(245, 158, 11, 0.1)",
                border: "1px solid rgba(245, 158, 11, 0.25)",
                color: "#f59e0b",
                borderRadius: "10px",
                padding: "8px 16px",
                fontSize: "13px",
              }}
            >
              <LuSlidersHorizontal size={16} className="me-1" />
              Filters
              {activeFiltersCount > 0 && (
                <span
                  className="ms-1"
                  style={{
                    background: "#f59e0b",
                    color: "#111",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: "700",
                  }}
                >
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════ MOBILE OFFCANVAS ═══════════ */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="mobileSidebar"
        style={{
          background: "#141414",
          borderRight: "1px solid rgba(245,158,11,0.1)",
          maxWidth: "300px",
        }}
      >
        <div
          className="offcanvas-header"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            padding: "20px",
          }}
        >
          <h5
            className="offcanvas-title fw-bold d-flex align-items-center gap-2"
            style={{ color: "#e8e8e8" }}
          >
            <LuFilter size={18} style={{ color: "#f59e0b" }} />
            Filters
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div className="offcanvas-body" style={{ padding: "20px" }}>
          <FilterContent />
        </div>
      </div>

      {/* ═══════════ MAIN CONTENT ═══════════ */}
      <div className="container-fluid py-4">
        <div className="row">
          {/* ═══════════ DESKTOP SIDEBAR ═══════════ */}
          <div
            className="col-lg-3 col-xl-2 d-none d-md-block"
            style={{ position: "sticky", top: "80px", alignSelf: "start" }}
          >
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px",
                padding: "24px",
              }}
            >
              <div className="d-flex align-items-center gap-2 mb-4">
                <LuFilter size={18} style={{ color: "#f59e0b" }} />
                <h6
                  className="mb-0 fw-bold"
                  style={{ color: "#e8e8e8", fontSize: "15px" }}
                >
                  Filters
                </h6>
              </div>
              <FilterContent />
            </div>
          </div>

          {/* ═══════════ PRODUCTS GRID ═══════════ */}
          <div className="col-12 col-md-9 col-xl-10">
            {/* Active filter chips */}
            {activeFiltersCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="d-flex flex-wrap gap-2 mb-4 px-2"
              >
                {selectedCategories.map((cat) => (
                  <span
                    key={cat}
                    className="d-flex align-items-center gap-1"
                    style={{
                      padding: "4px 14px",
                      borderRadius: "50px",
                      background: "rgba(245, 158, 11, 0.1)",
                      border: "1px solid rgba(245, 158, 11, 0.25)",
                      color: "#f59e0b",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {cat}
                    <LuX
                      size={12}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleCategoryChange(cat)}
                    />
                  </span>
                ))}
                {selectedPrices.map((price) => (
                  <span
                    key={price}
                    className="d-flex align-items-center gap-1"
                    style={{
                      padding: "4px 14px",
                      borderRadius: "50px",
                      background: "rgba(245, 158, 11, 0.1)",
                      border: "1px solid rgba(245, 158, 11, 0.25)",
                      color: "#f59e0b",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    ₹{price}
                    <LuX
                      size={12}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        handleCheckboxChange({ target: { value: price } })
                      }
                    />
                  </span>
                ))}
              </motion.div>
            )}

            <div className="row g-4 px-2">
              {isLoading ? (
                Array(8)
                  .fill()
                  .map((_, i) => (
                    <div
                      key={i}
                      className="col-12 col-sm-6 col-lg-4 col-xl-3"
                    >
                      <SkeletonCard />
                    </div>
                  ))
              ) : filterData.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="col-12 text-center py-5"
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
                    <LuSearch size={32} style={{ color: "#f59e0b", opacity: 0.6 }} />
                  </div>
                  <h5 className="fw-bold mb-2" style={{ color: "#e8e8e8" }}>
                    No products found
                  </h5>
                  <p className="text-secondary mb-3" style={{ fontSize: "14px" }}>
                    Try adjusting your filters or search term
                  </p>
                  <button
                    onClick={clearAllFilters}
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
                    Clear Filters
                  </button>
                </motion.div>
              ) : (
                <AnimatePresence>
                  {filterData.map((product, index) => (
                    <motion.div
                      key={product.id || index}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={cardVariants}
                      className="col-12 col-sm-6 col-lg-4 col-xl-3"
                    >
                      <div
                        className="product-card h-100"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                          border: "1px solid rgba(255,255,255,0.07)",
                          borderRadius: "16px",
                          overflow: "hidden",
                          transition: "all 0.4s ease",
                          cursor: "default",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {/* Image */}
                        <div
                          style={{
                            position: "relative",
                            overflow: "hidden",
                            cursor: "pointer",
                          }}
                          onClick={() => openPage(product)}
                        >
                          <img
                            src={product.imageUrl}
                            alt={product.title || product.name}
                            loading="lazy"
                            style={{
                              width: "100%",
                              height: "220px",
                              objectFit: "cover",
                              transition: "transform 0.4s ease",
                            }}
                            className="product-image"
                          />
                          {/* Category badge */}
                          <span
                            style={{
                              position: "absolute",
                              top: "12px",
                              left: "12px",
                              padding: "4px 12px",
                              borderRadius: "50px",
                              background: "rgba(17,17,17,0.8)",
                              backdropFilter: "blur(8px)",
                              border: "1px solid rgba(245, 158, 11, 0.2)",
                              color: "#f59e0b",
                              fontSize: "11px",
                              fontWeight: "600",
                              letterSpacing: "0.5px",
                            }}
                          >
                            {product.category}
                          </span>
                          {/* View overlay */}
                          <div
                            className="product-overlay"
                            style={{
                              position: "absolute",
                              inset: 0,
                              background:
                                "linear-gradient(to top, rgba(17,17,17,0.6), transparent)",
                              opacity: 0,
                              transition: "opacity 0.3s ease",
                              display: "flex",
                              alignItems: "flex-end",
                              justifyContent: "center",
                              paddingBottom: "16px",
                            }}
                          >
                            <span
                              className="d-flex align-items-center gap-1"
                              style={{
                                color: "#f59e0b",
                                fontSize: "13px",
                                fontWeight: "600",
                              }}
                            >
                              View Details <LuChevronRight size={14} />
                            </span>
                          </div>
                        </div>

                        {/* Body */}
                        <div
                          style={{
                            padding: "20px",
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <h6
                            className="fw-bold mb-2"
                            style={{
                              color: "#e8e8e8",
                              fontSize: "15px",
                              lineHeight: "1.4",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {product.name}
                          </h6>
                          <p
                            className="text-secondary mb-3"
                            style={{
                              fontSize: "13px",
                              lineHeight: "1.6",
                              overflow: "hidden",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {Array.isArray(product.description)
                              ? product.description[0]
                              : product.description || "No description available"}
                          </p>

                          <div
                            className="d-flex justify-content-between align-items-center mt-auto"
                          >
                            <span
                              className="fw-bold"
                              style={{
                                background:
                                  "linear-gradient(135deg, #f59e0b, #f97316)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                fontSize: "1.15rem",
                              }}
                            >
                              ${product.price}
                            </span>
                            <button
                              onClick={() => sendData(product)}
                              className="btn d-flex align-items-center gap-1"
                              style={{
                                background: "rgba(245, 158, 11, 0.1)",
                                border: "1px solid rgba(245, 158, 11, 0.25)",
                                color: "#f59e0b",
                                borderRadius: "50px",
                                padding: "6px 16px",
                                fontSize: "12px",
                                fontWeight: "600",
                                transition: "all 0.3s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                  "linear-gradient(135deg, #f59e0b, #f97316)";
                                e.currentTarget.style.color = "#111";
                                e.currentTarget.style.transform = "translateY(-1px)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                  "rgba(245, 158, 11, 0.1)";
                                e.currentTarget.style.color = "#f59e0b";
                                e.currentTarget.style.transform = "translateY(0)";
                              }}
                            >
                              <LuShoppingCart size={14} />
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════ STYLES ═══════════ */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .product-card:hover {
          border-color: rgba(245, 158, 11, 0.2) !important;
          background: linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02)) !important;
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(245, 158, 11, 0.08);
        }

        .product-card:hover .product-image {
          transform: scale(1.05);
        }

        .product-card:hover .product-overlay {
          opacity: 1 !important;
        }

        /* Custom scrollbar for sidebar */
        .col-lg-3::-webkit-scrollbar,
        .col-xl-2::-webkit-scrollbar {
          width: 4px;
        }
        .col-lg-3::-webkit-scrollbar-thumb,
        .col-xl-2::-webkit-scrollbar-thumb {
          background: rgba(245,158,11,0.2);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
