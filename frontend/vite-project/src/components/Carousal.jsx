// import React from 'react';
// import Carousalimg1 from  '../assets/Carousal-img1.jpg';
// import Carousalimg2 from  '../assets/Carousal-img2.jpg';
// import Carousalimg3 from  '../assets/Carousal-img3.jpg';

// const Carousal = () => {
//   return (
//     <>
//       <div id="carouselExample" className="carousel slide mx-3" data-bs-ride="carousel">
//         <div className="carousel-inner">
//           {/* First Carousel Item */}
//           <div className="carousel-item active">
//             <img 
//               src={Carousalimg1}
//               className="d-block w-100" 
//               alt="Carousel Image 1" 
//             />
//           </div>

//           {/* Second Carousel Item */}
//           <div className="carousel-item">
//             <img 
//               src={Carousalimg2}
//               className="d-block w-100" 
//               alt="Carousel Image 2" 
//             />
//           </div>

//           {/* Third Carousel Item */}
//           <div className="carousel-item">
//             <img 
//               src={Carousalimg3}
//               className="d-block w-100 " 
//               alt="Carousel Image 3" 
//               style={{height:"29rem",width:"18rem"}}
//             />
//           </div>
//         </div>

//         {/* Carousel Controls */}
//         <button 
//           className="carousel-control-prev" 
//           type="button" 
//           data-bs-target="#carouselExample" 
//           data-bs-slide="prev"
//         >
//           <span className="carousel-control-prev-icon" aria-hidden="true" />
//           <span className="visually-hidden">Previous</span>
//         </button>
//         <button 
//           className="carousel-control-next" 
//           type="button" 
//           data-bs-target="#carouselExample" 
//           data-bs-slide="next"
//         >
//           <span className="carousel-control-next-icon" aria-hidden="true" />
//           <span className="visually-hidden">Next</span>
//         </button>
//       </div>
//     </>
//   );
// };

// export default Carousal;



import { motion } from "framer-motion";
import { LuTimer, LuArrowRight } from "react-icons/lu";

const Carousal = () => {
  return (
    <section
      className="position-relative overflow-hidden py-5"
      style={{ backgroundColor: "#111" }}
    >
      {/* Decorative background */}
      <div className="position-absolute top-0 start-0 w-100 h-100 opacity-25">
        <div
          className="position-absolute rounded-circle"
          style={{
            width: "250px",
            height: "250px",
            background: "#ffc107",
            filter: "blur(100px)",
            top: "-80px",
            left: "-80px",
          }}
        />
        <div
          className="position-absolute rounded-circle"
          style={{
            width: "250px",
            height: "250px",
            background: "#ffc107",
            filter: "blur(100px)",
            bottom: "-80px",
            right: "-80px",
          }}
        />
      </div>

      <div className="container position-relative">
        <div className="row align-items-center g-5">
          
          {/* LEFT */}
          <div className="col-lg-6 text-center text-lg-start text-light">
            
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill border border-warning bg-dark mb-3"
            >
              <LuTimer size={16} className="text-warning" />
              <small className="text-uppercase fw-semibold text-warning">
                Limited Time
              </small>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="fw-light display-5"
            >
              Up to <span className="text-warning">40% Off</span>
              <br />
              Spring Collection
            </motion.h2>

            {/* Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-3 text-secondary"
            >
              Discover exclusive deals on handcrafted luxury pieces. Offer ends
              soon — elevate your wardrobe before it's too late.
            </motion.p>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-4"
            >
              <button className="btn btn-warning px-4 py-2 d-inline-flex align-items-center gap-2">
                Shop the Sale
                <LuArrowRight />
              </button>
            </motion.div>
          </div>

          {/* RIGHT (Countdown) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-lg-6"
          >
            <div className="row text-center g-3">
              {[
                { value: "03", label: "Days" },
                { value: "18", label: "Hours" },
                { value: "45", label: "Mins" },
                { value: "22", label: "Secs" },
              ].map((item) => (
                <div key={item.label} className="col-3">
                  <div className="border rounded bg-dark text-light py-4">
                    <h3 className="fw-light text-warning mb-1">
                      {item.value}
                    </h3>
                    <small className="text-uppercase text-secondary">
                      {item.label}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Carousal;
