import React from 'react';



const HeroSection = () => {
  return (
    <>
    <div className="container-fluid hero-section bg-primary text-white d-flex align-items-center justify-content-center w-100"
     style={{
     height: "78rem",
     width:"100vw",
     backgroundImage:"url(https://images.unsplash.com/photo-1518002171953-a080ee817e1f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA==)",
     backgroundSize:"cover",
     
      }}
      >
      
      <div className="row w-100 mx-5 mb-5"
       style={{ zIndex: 2 }}>
        <div className="col-12 col-md-6 text-center text-md-start">
          <h1 className="display-3 fw-bold text-white fade-in-animation">Shop the Best Products at Unbeatable Prices!</h1>
          <p className="lead mt-3 text-white fade-in-animation" >
            Explore our exclusive collection with free shipping on all orders. Don't miss out!
          </p>
          <a href="#shop-now" className="btn btn-primary btn-lg mt-4 fade-in-animation">Shop Now</a>
        </div>
  
      </div>
    </div>

    </>
    
  );
  
};


export default HeroSection;
