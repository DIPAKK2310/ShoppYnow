import React from "react";
import {
  LuShoppingCart,
  LuTruck,
  LuShieldCheck,
  LuUsers,
  LuBadgeCheck,
} from "react-icons/lu";

const About = () => {
  return (
    <div className="bg-black">

      {/* HERO SECTION */}
      <section className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="display-5 fw-bold">
              Welcome to <span className="text-primary">ShoppYnow</span>
            </h1>
            <p className="lead text-muted mt-3">
              Your trusted destination for fashion, electronics, and everyday essentials —
              delivered fast, securely, and affordably.
            </p>
          </div>

          <div className="col-md-6 text-center mt-4 mt-md-0">
            <img
              src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a"
              alt="shopping"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="container py-5">
        <h2 className="fw-bold text-center mb-4">Our Story</h2>
        <p className="text-muted text-center w-75 mx-auto">
          ShoppYnow started with a simple vision — to make online shopping easy,
          reliable, and accessible to everyone. We noticed how complicated and
          inconsistent many platforms were, and decided to build a seamless
          experience focused on speed, trust, and customer satisfaction.
        </p>
      </section>

      {/* FEATURES */}
      <section className="container py-5">
        <h2 className="fw-bold text-center mb-5">Why Choose Us</h2>

        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <LuShoppingCart size={40} className="text-primary mb-3" />
            <h5>Wide Product Range</h5>
            <p className="text-muted">
              From clothing to electronics, everything you need in one place.
            </p>
          </div>

          <div className="col-md-4 mb-4">
            <LuTruck size={40} className="text-primary mb-3" />
            <h5>Fast Delivery</h5>
            <p className="text-muted">
              Reliable and quick shipping to get your products on time.
            </p>
          </div>

          <div className="col-md-4 mb-4">
            <LuShieldCheck size={40} className="text-primary mb-3" />
            <h5>Secure Payments</h5>
            <p className="text-muted">
              Your transactions are protected with industry-grade security.
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white py-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-3 mb-4">
              <LuUsers size={35} className="text-primary mb-2" />
              <h4>10K+</h4>
              <p className="text-muted">Happy Customers</p>
            </div>

            <div className="col-md-3 mb-4">
              <LuShoppingCart size={35} className="text-primary mb-2" />
              <h4>5K+</h4>
              <p className="text-muted">Products Sold</p>
            </div>

            <div className="col-md-3 mb-4">
              <LuTruck size={35} className="text-primary mb-2" />
              <h4>2K+</h4>
              <p className="text-muted">Orders Delivered</p>
            </div>

            <div className="col-md-3 mb-4">
              <LuBadgeCheck size={35} className="text-primary mb-2" />
              <h4>99%</h4>
              <p className="text-muted">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-5 text-center">
        <h2 className="fw-bold mb-3">Start Shopping with Confidence</h2>
        <p className="text-muted mb-4">
          Discover quality products, great deals, and a seamless shopping experience.
        </p>
        <a href="/products" className="btn btn-primary px-4 py-2">
          Shop Now
        </a>
      </section>
    </div>
  );
};

export default About;