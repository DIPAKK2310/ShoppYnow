import { motion } from "framer-motion";
import { Container, Button } from "react-bootstrap";
import { LuArrowRight, LuShoppingBag  } from "react-icons/lu";
import heroBg from "../assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section
      className="position-relative w-100 vh-100 overflow-hidden"
      style={{ backgroundColor: "#000" }}
    >
      {/* Background Image */}
      <img
        src={heroBg}
        alt="Luxury fashion collection"
        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
      />

      {/* Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.7), rgba(0,0,0,0.3))",
        }}
      />

      {/* Content */}
      <div className="position-relative d-flex align-items-center vh-100 text-white">
        <Container>
          <div style={{ maxWidth: "600px" }}>
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-uppercase fw-medium mb-3"
              style={{ letterSpacing: "0.3em", color: "#f59e0b" }}
            >
              New Collection 2026
            </motion.p>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="fw-light mb-4"
              style={{
                fontSize: "clamp(3rem, 6vw, 5rem)",
                lineHeight: "1.1",
              }}
            >
              Redefine <br />
              <span style={{ fontStyle: "italic", color: "#f59e0b" }}>
                Your Style
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-4"
              style={{ fontSize: "1.1rem", color: "#ddd", maxWidth: "450px" }}
            >
              Discover curated pieces crafted for those who demand elegance
              without compromise. Premium materials, timeless design.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="d-flex flex-wrap gap-3"
            >
              <a href="/ProductsPages">
              <Button
                variant="warning"
                size="lg"
                className="d-flex align-items-center gap-2 px-4 py-2"

              >

                <LuShoppingBag  size={20} />
                Shop Now
              </Button>
                </a>

              <a href="#features">

              <Button
                variant="outline-light"
                size="lg"
                className="d-flex align-items-center gap-2 px-4 py-2"
                >
                Explore
                <LuArrowRight size={20} />
              </Button>
                </a>
            </motion.div>

          </div>
        </Container>
      </div>
    </section>
  );
};

export default HeroSection;