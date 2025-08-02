import React from 'react';
import Carousalimg1 from  '../assets/Carousal-img1.jpg';
import Carousalimg2 from  '../assets/Carousal-img2.jpg';
import Carousalimg3 from  '../assets/Carousal-img3.jpg';

const Carousal = () => {
  return (
    <>
      <div id="carouselExample" className="carousel slide mx-3" data-bs-ride="carousel">
        <div className="carousel-inner">
          {/* First Carousel Item */}
          <div className="carousel-item active">
            <img 
              src={Carousalimg1}
              className="d-block w-100" 
              alt="Carousel Image 1" 
            />
          </div>

          {/* Second Carousel Item */}
          <div className="carousel-item">
            <img 
              src={Carousalimg2}
              className="d-block w-100" 
              alt="Carousel Image 2" 
            />
          </div>

          {/* Third Carousel Item */}
          <div className="carousel-item">
            <img 
              src={Carousalimg3}
              className="d-block w-100 " 
              alt="Carousel Image 3" 
              style={{height:"29rem",width:"18rem"}}
            />
          </div>
        </div>

        {/* Carousel Controls */}
        <button 
          className="carousel-control-prev" 
          type="button" 
          data-bs-target="#carouselExample" 
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button 
          className="carousel-control-next" 
          type="button" 
          data-bs-target="#carouselExample" 
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default Carousal;
