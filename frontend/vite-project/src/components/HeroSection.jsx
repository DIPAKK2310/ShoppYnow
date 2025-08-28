import React from 'react'
import HeroImage from '../assets/HeroImage.png'


export const HeroSection = () => {
  return (
   <section className="position-relative d-flex align-items-center justify-content-center overflow-hidden" style={{ minHeight: "90vh" }}>
      {/* Background Image + Overlay */}
      <div className="position-absolute top-0 start-0 w-100 h-100">
        <div
          className="w-100 h-100"
          style={{
            backgroundImage: `url(${HeroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.9)",
            position: "relative",
          }}
        >
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            // style={{
            //   background: "linear-gradient(to right, rgba(13,110,253,0.8), rgba(13,110,253,0.6), transparent)",
            // }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="position-relative z-1 container text-center text-white px-3">
        <div className="mx-auto" style={{ maxWidth: "900px" }}>
          <h1 className="display-4 fw-bold mb-3" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
            Luxury Redefined
          </h1>
          <p className="lead mb-4 text-white-50" style={{ fontSize: "1.25rem" }}>
            Discover our exclusive collection of premium fashion and accessories,
            crafted for those who appreciate timeless elegance.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <button className="btn  btn-lg px-4 py-3 rounded-pill">
              Shop Collection
            </button>
            <button className="btn btn-outline-light btn-lg px-4 py-3 rounded-pill">
              View Lookbook
            </button>
          </div>
        </div>
      </div>

      {/* Decorative bounce indicator */}
      <div
        className="position-absolute bottom-0 start-50 translate-middle-x mb-4"
        style={{ animation: "bounce 2s infinite" }}
      >
        <div
          style={{
            width: "6px",
            height: "40px",
            backgroundColor: "rgba(255,255,255,0.5)",
            borderRadius: "999px",
          }}
        />
      </div>

      {/* Inline styles for bounce (could go into CSS file) */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, -10px); }
        }
      `}</style>
    </section>
  )
}


export default HeroSection;
