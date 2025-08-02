import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addcart } from '../redux/Slice';
import axios from 'axios';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filterData, setFilteredData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const sendData = (value) => {
    dispatch(addcart(value));
  };

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/product/products');
        setProducts(response.data);
        setFilteredData(response.data); // Initially, display all products
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, []);

  // Filter products based on selected categories and prices
  useEffect(() => {
    filterProducts();
  }, [selectedCategories, selectedPrices, products]);

  const filterProducts = () => {
    let filtered = products;

    // Filter by categories
    if (selectedCategories.length > 0 && !selectedCategories.includes('All')) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Filter by price
    if (selectedPrices.length > 0) {
      filtered = filtered.filter((product) => {
        return selectedPrices.some((range) => {
          const [minPrice, maxPrice] = range.split('-').map(Number);
          return product.price >= minPrice && product.price <= maxPrice;
        });
      });
    }

    setFilteredData(filtered);
  };

  // Handle checkbox change for categories
  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) => {
      if (category === 'All') {
        return prevCategories.includes('All') ? [] : ['All'];
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

  return (
    <div className="container-fluid">
      <h4 className="ms-5">Products</h4>

      <div className="d-flex">
        {/* Sidebar */}
        <div className="sidebar ms-3">
          <h5>Categories</h5>
          <form>
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="all"
                checked={selectedCategories.includes('All')}
                onChange={() => handleCategoryChange('All')}
              />
              <label htmlFor="all">All</label>
            </div>
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="men"
                checked={selectedCategories.includes('Men')}
                onChange={() => handleCategoryChange('Men')}
              />
              <label htmlFor="men">Men</label>
            </div>
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="women"
                checked={selectedCategories.includes('Women')}
                onChange={() => handleCategoryChange('Women')}
              />
              <label htmlFor="women">Women</label>
            </div>
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="shoes"
                checked={selectedCategories.includes('Shoes')}
                onChange={() => handleCategoryChange('Shoes')}
              />
              <label htmlFor="shoes">Shoes</label>
            </div>
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="electronics"
                checked={selectedCategories.includes('Electronic')}
                onChange={() => handleCategoryChange('Electronic')}
              />
              <label htmlFor="electronics">Electronics</label>
            </div>
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="beauty"
                checked={selectedCategories.includes('Beauty')}
                onChange={() => handleCategoryChange('Beauty')}
              />
              <label htmlFor="beauty">Beauty</label>
            </div>
          </form>
          <br />
           {/* Filter on price */}
        <div className='sidebar ms-1 '>
          <h3>Filter by Price:</h3>
          <div>
            <input
              type="checkbox"
              id="price_40_80"
              value="40-80"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="price_40_80">$40 - $80</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="price_80_120"
              value="80-120"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="price_80_120">$80 - $120</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="price_121_160"
              value="121-160"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="price_121_160">$121 - $160</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="price_161_200"
              value="161-200"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="price_161_200">$161 - $200</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="price_201_250"
              value="201-250"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="price_201_250">$201 - $250</label>
          </div>

          {/* Display selected price ranges */}
          <div>
            <h4>Selected Price Ranges:</h4>
            <ul>
              {selectedPrices.map((price) => (
                <li key={price}>{price}</li>
              ))}
            </ul>
          </div>
        </div>
        </div>

       

        {/* Products */}
        <div className="products-container ps-5">
          <div className="row">
            {filterData.length === 0 ? (
              <p>No products found.</p> // Show message if no products match the filter
            ) : (
              filterData.map((product, index) => (
                <div
                  key={product.id || index}
                  className="card col-12 col-md-6 col-lg-3 col-xl-2 mx-auto my-4"
                  style={{ width: '16rem',height:'32rem' }}
                  
                >
                  <img
                    src={product.imageUrl}
                    onClick={() => openPage(product)}
                    className="card-img-top"
                    style={{height:'15rem'}}
                    alt={product.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">
                      {Array.isArray(product.description)
                        ? product.description[0]
                        : product.description || 'No description available'}
                    </p>
                    <p className="card-text">Price: ${product.price}</p>
                    <button
                      onClick={() => sendData(product)}
                      className="btn btn-primary"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
