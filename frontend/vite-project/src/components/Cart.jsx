import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { removecart } from '../redux/Slice';

export default function Cart() {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart);

  // State variables for calculated values
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [vatAmount, setVatAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [deliveryDate, setDeliveryDate] = useState(''); // New state for delivery date

  useEffect(() => {
    console.log("Cart Data: ", cartData); // Debugging step to inspect cartData

    // Calculate total price when cartData changes
    const calculateTotalPrice = () => {
      return cartData.reduce((total, item) => {
        // Ensure item.price is a number, if not fallback to 0
        const itemPrice = parseFloat(item.price) || 0;
        return total + itemPrice;
      }, 0);
    };

    const calculatedTotalPrice = calculateTotalPrice();
    const calculatedDeliveryCharge = calculatedTotalPrice > 100 ? 10 : 0;
    const calculatedVatAmount = calculatedTotalPrice * 0.1; // VAT is 10%
    const calculatedFinalAmount = calculatedTotalPrice + calculatedDeliveryCharge + calculatedVatAmount;

    // Set state variables with the calculated values
    setTotalPrice(calculatedTotalPrice);
    setDeliveryCharge(calculatedDeliveryCharge);
    setVatAmount(calculatedVatAmount);
    setFinalAmount(calculatedFinalAmount);

    // Calculate delivery date: 5 business days from today
    const today = new Date();
    const deliveryDay = new Date(today);
    deliveryDay.setDate(today.getDate() + 5); // Add 5 days

    // Format the date in a readable format (e.g., January 20, 2025)
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    setDeliveryDate(deliveryDay.toLocaleDateString('en-US', options));

  }, [cartData]); // Re-run this when cartData changes

  // Remove item from cart
  const removeData = (item) => {
    dispatch(removecart(item));
  };

  // Safe function to format numbers
  const formatNumber = (value) => (typeof value === 'number' ? value.toFixed(2) : '0.00');

  return (
    <>
      <section className="h-100 gradient-custom">
        <div className="container py-5">
          <div className="row d-flex justify-content-center my-4">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Cart - {cartData.length} items</h5>
                </div>
                <div className="card-body">
                  {cartData.map((value, index) => (
                    <div key={index}>
                      <div className="row">
                        <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                          <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                            <img src={value.imageUrl} className="w-100" />
                            <a href="#!">
                              <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }} />
                            </a>
                          </div>
                        </div>
                        <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                          <p><strong>{value.name}</strong></p>
                          <p>Color: red</p>
                          <p>Size: M</p>
                          <button
                            type="button"
                            onClick={() => removeData(value)}
                            className="btn btn-primary btn-sm me-1 mb-2"
                            title="Remove item"
                          >
                            <DeleteIcon />
                          </button>
                          <button type="button" className="btn btn-danger btn-sm mb-2" title="Move to the wish list">
                            <FavoriteBorderIcon />
                          </button>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                          <p className="text-start text-md-center">
                            <strong>${value.price}</strong>
                          </p>
                          <span>{value.description}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Shiping delivery */}
              <div className="card mb-4">
                <div className="card-body">
                  <p><strong>Expected shipping delivery</strong></p>
                  {/* Display the delivery date here */}
                  <p>{deliveryDate}</p>
                </div>
              </div>
              {/* We accept */}
              <div className="card mb-4 mb-lg-0">
                <div className="card-body">
                  <p><strong>We accept</strong></p>
                  <img className="me-2" width="45px" src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg" alt="Visa" />
                  <img className="me-2" width="45px" src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg" alt="American Express" />
                  <img className="me-2" width="45px" src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg" alt="Mastercard" />
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products
                      <span>${formatNumber(totalPrice)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Shipping
                      <span>{deliveryCharge === 0 ? 'Gratis' : `$${formatNumber(deliveryCharge)}`}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      VAT (10%)
                      <span>${formatNumber(vatAmount)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                        <strong>
                          <p className="mb-0">(including VAT)</p>
                        </strong>
                      </div>
                      <span><strong>${formatNumber(finalAmount)}</strong></span>
                    </li>
                  </ul>
                  <button type="button" className="btn btn-primary btn-lg btn-block">
                    Go to checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
