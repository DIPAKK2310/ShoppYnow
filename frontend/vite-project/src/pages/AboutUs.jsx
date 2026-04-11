import { motion } from "framer-motion";
import {
  LuSend,
  LuUsers,
  LuAward,
  LuHeart,
  LuGlobe,
  LuCheckCircle,
} from "react-icons/lu";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const stats = [
  { icon: LuUsers, value: "50K+", label: "Happy Customers" },
  { icon: LuAward, value: "12+", label: "Years of Excellence" },
  { icon: LuHeart, value: "200+", label: "Brands Curated" },
  { icon: LuGlobe, value: "30+", label: "Countries Served" },
];

const values = [
  {
    title: "Premium Quality",
    description:
      "Every piece is carefully selected to meet the highest standards.",
  },
  {
    title: "Sustainable Fashion",
    description: "We partner with ethical brands.",
  },
  {
    title: "Timeless Design",
    description: "Our curation focuses on timeless pieces.",
  },
  {
    title: "Exceptional Service",
    description: "We ensure a seamless shopping experience.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
};

const About = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent!");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">

            {/* LEFT */}
            <div className="col-lg-6 mb-4">
              <motion.div {...fadeUp} transition={{ duration: 0.7 }}>
                <p className="text-uppercase text-primary small">Our Story</p>
                <h1 className="display-5 fw-light">
                  Crafting <span className="text-primary fst-italic">Elegance</span>
                </h1>
                <p className="text-muted">
                  Fashion is more than clothing — it's identity. We bring curated luxury collections.
                </p>
              </motion.div>
            </div>

            {/* RIGHT */}
            <div className="col-lg-6 text-center">
              <motion.div {...fadeUp} transition={{ duration: 0.7 }}>
                <LuAward size={100} className="text-primary" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-5 border-top border-bottom">
        <div className="container">
          <div className="row text-center">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div className="col-6 col-md-3 mb-4" key={i}>
                  <motion.div {...fadeUp} transition={{ delay: i * 0.1 }}>
                    <Icon size={30} className="mb-2 text-primary" />
                    <h4>{stat.value}</h4>
                    <p className="text-muted small">{stat.label}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-4">
            <p className="text-uppercase text-primary small">What Drives Us</p>
            <h2>Our Core Values</h2>
          </div>

          <div className="row">
            {values.map((v, i) => (
              <div className="col-md-6 col-lg-3 mb-4" key={i}>
                <motion.div
                  {...fadeUp}
                  transition={{ delay: i * 0.1 }}
                  className="p-3 border rounded h-100"
                >
                  <LuCheckCircle className="text-primary mb-2" size={24} />
                  <h6>{v.title}</h6>
                  <p className="text-muted small">{v.description}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row">

            {/* LEFT */}
            <div className="col-lg-6 mb-4">
              <motion.div {...fadeUp}>
                <p className="text-uppercase text-primary small">Get In Touch</p>
                <h2>
                  We'd Love to <span className="text-primary fst-italic">Hear</span>
                </h2>
                <p className="text-muted">
                  Have questions? Drop a message and we’ll reply soon.
                </p>
              </motion.div>
            </div>

            {/* FORM */}
            <div className="col-lg-6">
              <motion.form
                {...fadeUp}
                onSubmit={handleSubmit}
                className="p-4 border rounded bg-white"
              >
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                <button className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2">
                  <LuSend />
                  Send Message
                </button>
              </motion.form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;