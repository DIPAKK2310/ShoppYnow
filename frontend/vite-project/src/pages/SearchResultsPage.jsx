import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function SearchResultsPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query'); // Get the search query from URL

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/product/products?search=${searchQuery}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery]);

  return (
    <div>
      <h4>Search Results for: {searchQuery}</h4>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {searchResults.map((product) => (
            <div key={product.id} className="col-12 col-md-6 col-lg-4 col-xl-3 my-4">
              <div className="card" style={{ width: '18rem' }}>
                <img src={product.thumbnail} className="card-img-top" alt={product.title} />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">Price: ${product.price}</p>
                  <a href={`/productdetails/${product.id}`} className="btn btn-primary">View Details</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResultsPage;
