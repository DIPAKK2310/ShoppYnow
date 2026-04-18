import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addcart } from "../redux/Slice";
import axios from "axios";
import SkeletonCard from "../components/ui/SkeletonCard.jsx";
import { useQuery } from "@tanstack/react-query";
import { FaFilter } from "react-icons/fa";

export default function ProductsPage() {
  const [filterData, setFilteredData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendData = (value) => {
    dispatch(addcart(value));
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
  }, [selectedCategories, selectedPrices, products]);

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

  // Open the product details page
  const openPage = (x) => {
    navigate(`/productdetails/${x.category}/${x.id}`);
  };

  if (isError) {
    return (
      <div className="text-center mt-5">
        <h4>Something went wrong 😢</h4>
        <p>{error.message}</p>
        <button className="btn btn-primary" onClick={refetch}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <main>
      <div className="container-fluid ">
<button
  className="btn btn-primary d-md-none mb-3"
  data-bs-toggle="offcanvas"
  data-bs-target="#mobileSidebar"
>
  <FaFilter />
  </button>
  {/* Mobile Sidebar (Offcanvas) */}
<div
  className="offcanvas offcanvas-start"
  tabIndex="-1"
  id="mobileSidebar"
>
  <div className="offcanvas-header">
    <h5 className="offcanvas-title">Filters</h5>
    <button
      type="button"
      className="btn-close"
      data-bs-dismiss="offcanvas"
    ></button>
  </div>

  <div className="offcanvas-body">
    {/* Categories */}
    <div className="mb-4">
      <h6 className="text-uppercase fw-bold mb-3">Categories</h6>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="all-mobile"
          checked={selectedCategories.includes("All")}
          onChange={() => handleCategoryChange("All")}
        />
        <label className="form-check-label" htmlFor="all-mobile">
          All
        </label>
      </div>

      {["Men", "Women", "Shoes", "Electronic", "Beauty"].map((cat) => (
        <div className="form-check" key={cat}>
          <input
            className="form-check-input"
            type="checkbox"
            id={`${cat}-mobile`}
            checked={selectedCategories.includes(cat)}
            onChange={() => handleCategoryChange(cat)}
          />
          <label className="form-check-label" htmlFor={`${cat}-mobile`}>
            {cat}
          </label>
        </div>
      ))}
    </div>

    {/* Price Filter */}
    <div>
      <h6 className="text-uppercase fw-bold mb-3">Filter by Price</h6>

      {["40-80", "80-120", "121-160", "161-200", "201-250"].map(
        (price) => (
          <div className="form-check" key={price}>
            <input
              className="form-check-input"
              type="checkbox"
              id={`${price}-mobile`}
              value={price}
              checked={selectedPrices.includes(price)}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor={`${price}-mobile`}>
              ₹{price}
            </label>
          </div>
        ),
      )}
    </div>
  </div>
</div>
        <div className="d-flex">
          {/* Sidebar */}
          {/* Mobile Filter Button */}
          <div className="col-md-3 p-3 border-end d-none d-md-block">
            {/* Categories */}
            <div className="mb-4">
              <h6 className="text-uppercase  fw-bold mb-3">
                Categories
              </h6>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="all"
                  checked={selectedCategories.includes("All")}
                  onChange={() => handleCategoryChange("All")}
                />
                <label className="form-check-label" htmlFor="all">
                  All
                </label>
              </div>

              {["Men", "Women", "Shoes", "Electronic", "Beauty"].map((cat) => (
                <div className="form-check" key={cat}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={cat}
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                  />
                  <label className="form-check-label" htmlFor={cat}>
                    {cat}
                  </label>
                </div>
              ))}
            </div>

            {/* Price Filter */}
            <div>
              <h6 className="text-uppercase  fw-bold mb-3">
                Filter by Price
              </h6>

              {["40-80", "80-120", "121-160", "161-200", "201-250"].map(
                (price) => (
                  <div className="form-check" key={price}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={price}
                      value={price}
                      checked={selectedPrices.includes(price)}
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor={price}>
                      ₹{price}
                    </label>
                  </div>
                ),
              )}

              {/* Selected Price Display */}
              <div className="mt-3">
                <small className="text-muted fw-bold">
                  Selected Price Ranges:
                </small>
                <ul className="mb-0">
                  {selectedPrices.map((price) => (
                    <li key={price}>{price}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="products-container ps-5 pt-4">
            <div className="row g-4 justify-content-center justify-content-lg-start">
              {isLoading ? (
                Array(8)
                  .fill()
                  .map((_, i) => (
                    <div key={i} className="col-12 col-md-6 col-lg-3 mb-4">
                      <SkeletonCard />
                    </div>
                  ))
              ) : filterData.length === 0 ? (
                <p>No products found.</p> // Show message if no products match the filter
              ) : (
                filterData.map((product, index) => (
                  <div
                    key={product.id || index}
                    className="col-12 col-md-6 col-lg-3 my-4 mb-4"
                  >
                    <div className="card h-100">
                      <img
                        src={product.imageUrl}
                        onClick={() => openPage(product)}
                        className="card-img-top"
                        style={{ height: "15rem" }}
                        alt={product.title}
                        loading="lazy"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">
                          {Array.isArray(product.description)
                            ? product.description[0]
                            : product.description || "No description available"}
                        </p>
                        <div className="d-flex align-item-center justify-content-between">
                          <span className="card-text">
                            Price: ${product.price}
                          </span>
                          <button
                            onClick={() => sendData(product)}
                            className="btn btn-primary"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
