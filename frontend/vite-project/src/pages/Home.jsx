import { useAuth } from "../store/AuthContext";

import Footer from "../components/Footer";
import Carousal from "../components/Carousal";
import HeroSection from "../components/HeroSection";
import { Shoes } from "../components/Shoes";

import { Container } from "react-bootstrap";

function Home() {
  const { user } = useAuth();

  return (
    <>
      {/* HERO SECTION */}
      <HeroSection />

      {/* MAIN CONTENT */}
      <main>
        <Container className="py-5">

          {/* USER GREETING */}
          <div className="mb-4 text-white">
            {user ? (
              <h4>Welcome {user.username}</h4>
            ) : (
              <h4>Guest Login</h4>
            )}
          </div>

          {/* PAGE TITLE */}
          <h2 className="mb-4">Welcome to the Home Page</h2>

          {/* SHOES SECTION */}
          <section className="mb-5">
            <Shoes />
          </section>

          {/* CAROUSEL SECTION */}
          <section className="mb-5">
            <Carousal />
          </section>

        </Container>
      </main>

      {/* FOOTER */}
      <Footer />
    </>
  );
}

export default Home;