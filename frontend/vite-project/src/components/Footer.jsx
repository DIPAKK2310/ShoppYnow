// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className=" bg-dark text-white py-5 ">
      <div className="hyperlink container">
        <div className=" row ">
          {/* Column 1: Company Information */}
          <div className=" col-12 col-md-4 mb-4">
            <h5>Company</h5>
            <div className=" d-flex flex-column">
              <a href="/about-us" className="text-white mb-2">About Us</a>
              <a href="/careers" className="text-white mb-2">Careers</a>
              <a href="/privacy-policy" className="text-white mb-2">Privacy Policy</a>
              <a href="/terms" className="text-white mb-2">Terms & Conditions</a>
            </div>
          </div>

          {/* Column 2: Customer Service */}
          <div className="col-12 col-md-4 mb-4">
            <h5>Customer Service</h5>
            <div className="d-flex flex-column">
              <a href="/contact-us" className="text-white mb-2">Contact Us</a>
              <a href="/returns" className="text-white mb-2">Returns</a>
              <a href="/shipping-info" className="text-white mb-2">Shipping Information</a>
              <a href="/faq" className="text-white mb-2">FAQ</a>
            </div>
          </div>

          {/* Column 3: Social Media and Newsletter */}
          <div className="col-12 col-md-4 mb-4">
            <h5>Connect With Us</h5>
            <div className="d-flex flex-column">
              <a href="https://facebook.com" className="text-white mb-2" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
              <a href="https://twitter.com" className="text-white mb-2" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
              <a href="https://instagram.com" className="text-white mb-2" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <a href="https://linkedin.com" className="text-white mb-2" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <hr className="border-white" />
        <div className="row mt-3">
          <div className="col text-center">
            <p className="mb-0 ps-1">&copy; 2025 Your Company Name. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
