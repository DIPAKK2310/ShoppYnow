import { useState } from "react";
import { motion } from "framer-motion";
import { LuSend } from "react-icons/lu";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    // Simple alert instead of shadcn toast
    alert("✅ Subscribed successfully!");

    setEmail("");
  };

  return (
    <section
      className="position-relative overflow-hidden py-5"
      style={{ background: "#111" }}
    >
      {/* Decorative Background */}
      <div className="position-absolute top-0 start-0 w-100 h-100 opacity-25">
        <div
          className="position-absolute rounded-circle"
          style={{
            width: "300px",
            height: "300px",
            background: "#ffc107",
            filter: "blur(120px)",
            top: "-120px",
            right: "-120px",
          }}
        />
        <div
          className="position-absolute rounded-circle"
          style={{
            width: "300px",
            height: "300px",
            background: "#ffc107",
            filter: "blur(120px)",
            bottom: "-120px",
            left: "-120px",
          }}
        />
      </div>

      <div className="container position-relative">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center text-light">

            {/* Title */}
            <motion.small
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-uppercase text-warning fw-semibold"
            >
              Stay Connected
            </motion.small>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-3 fw-light display-6"
            >
              Join the Inner Circle
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-3 text-secondary"
            >
              Be the first to access new arrivals, exclusive offers, and curated
              style inspiration — delivered straight to your inbox.
            </motion.p>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4 d-flex flex-column flex-sm-row gap-2"
            >
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ height: "48px" }}
              />

              <button
                type="submit"
                className="btn btn-warning d-flex align-items-center justify-content-center gap-2"
                style={{ height: "48px" }}
              >
                Subscribe
                <LuSend />
              </button>
            </motion.form>

            {/* Footer text */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-3 small text-secondary"
            >
              No spam, ever. Unsubscribe anytime.
            </motion.p>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;