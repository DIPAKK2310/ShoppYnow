import React from "react";
import {
  LuFacebook,
  LuTwitter,
  LuInstagram,
  LuLinkedin,
  LuMail,
  LuPhone,
  LuMapPin,
} from "react-icons/lu";

const Footer = () => {
  return (
    <footer
      className="text-light pt-5 pb-3"
      style={{ background: "#0f0f0f" }}
    >
      <div className="container">
        <div className="row g-4">

          {/* Brand + Contact */}
          <div className="col-md-4">
            <h4 className="fw-bold mb-3 text-warning">YourBrand</h4>
            <p className="text-secondary small">
              Premium fashion & lifestyle products crafted with elegance and
              quality. Elevate your everyday style.
            </p>

            <div className="mt-3 d-flex flex-column gap-2 small">
              <span className="d-flex align-items-center gap-2 text-secondary">
                <LuMapPin /> Mumbai, India
              </span>
              <span className="d-flex align-items-center gap-2 text-secondary">
                <LuPhone /> +91 98765 43210
              </span>
              <span className="d-flex align-items-center gap-2 text-secondary">
                <LuMail /> support@yourbrand.com
              </span>
            </div>
          </div>

          {/* Company */}
          <div className="col-6 col-md-2">
            <h6 className="fw-semibold mb-3">Company</h6>
            <ul className="list-unstyled small">
              <li><a href="#" className="footer-link">About Us</a></li>
              <li><a href="#" className="footer-link">Careers</a></li>
              <li><a href="#" className="footer-link">Privacy Policy</a></li>
              <li><a href="#" className="footer-link">Terms</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-6 col-md-3">
            <h6 className="fw-semibold mb-3">Support</h6>
            <ul className="list-unstyled small">
              <li><a href="#" className="footer-link">Contact Us</a></li>
              <li><a href="#" className="footer-link">Returns</a></li>
              <li><a href="#" className="footer-link">Shipping Info</a></li>
              <li><a href="#" className="footer-link">FAQ</a></li>
            </ul>
          </div>

          {/* Social */}
          <div className="col-md-3">
            <h6 className="fw-semibold mb-3">Follow Us</h6>

            <div className="d-flex gap-3">
              <a href="#" className="social-icon"><LuFacebook /></a>
              <a href="#" className="social-icon"><LuTwitter /></a>
              <a href="#" className="social-icon"><LuInstagram /></a>
              <a href="#" className="social-icon"><LuLinkedin /></a>
            </div>

            <p className="small text-secondary mt-3">
              Stay connected for latest updates & offers.
            </p>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-secondary mt-4" />

        {/* Bottom */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center small text-secondary">
          <p className="mb-0">
            © 2026 YourBrand. All rights reserved.
          </p>
          <p className="mb-0">
            Designed with ❤️ by DK
          </p>
        </div>
      </div>

      {/* Extra Styles */}
      <style>{`
        .footer-link {
          color: #aaa;
          text-decoration: none;
          transition: 0.3s;
        }

        .footer-link:hover {
          color: #ffc107;
          transform: translateX(4px);
        }

        .social-icon {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          color: #fff;
          transition: 0.3s;
        }

        .social-icon:hover {
          background: #ffc107;
          color: #000;
          transform: translateY(-3px);
        }
      `}</style>
    </footer>
  );
};

export default Footer;