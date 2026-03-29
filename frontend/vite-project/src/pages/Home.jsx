import { useAuth } from "../store/AuthContext";

import Footer from "../components/Footer";
import Carousal from "../components/Carousal";
import HeroSection from "../components/HeroSection";
import { Shoes } from "../components/Shoes";

import { Container } from "react-bootstrap";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/NewsLetter";

function Home() {
  const { user } = useAuth();

  return (
    <>
      {/* HERO SECTION */}
      <HeroSection />

      <Shoes />

      <Carousal />
      <Testimonials/>
      <Newsletter/>

      {/* FOOTER */}
      <Footer />
    </>
  );
}

export default Home;
