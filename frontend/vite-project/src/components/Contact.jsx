import { useState } from "react";
import { motion } from "framer-motion";
import {
  LuSend,
  LuMail,
  LuMapPin,
  LuTwitter,
  LuGithub,
  LuLinkedin,
} from "react-icons/lu";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    alert("Message sent!");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    setIsSubmitting(false);
  };

  return (
    <section className="py-5">
      <div className="container">
        <div className="row g-5">

          {/* LEFT SIDE */}
          <motion.div
            className="col-lg-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="fw-bold mb-3 display-5">Get in Touch</h1>

            <p className="text-muted mb-4">
              Have a question, project idea, or just want to say hello?
              I'd love to hear from you.
            </p>

            {/* Email */}
            <a
              href="mailto:hello@example.com"
              className="d-flex align-items-center gap-3 mb-3 text-decoration-none text-muted"
            >
              <div className="bg-light p-2 rounded">
                <LuMail size={20} />
              </div>
              hello@example.com
            </a>

            {/* Location */}
            <div className="d-flex align-items-center gap-3 mb-4 text-muted">
              <div className="bg-light p-2 rounded">
                <LuMapPin size={20} />
              </div>
              San Francisco, California
            </div>

            {/* Social Icons */}
            <div className="d-flex gap-3">
              {[LuTwitter, LuGithub, LuLinkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  target="_blank"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="p-2 bg-light rounded text-dark"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SIDE FORM */}
          <motion.div
            className="col-lg-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <form onSubmit={handleSubmit}>

              <div className="row mb-3">
                <div className="col-sm-6">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="col-sm-6">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  name="subject"
                  className="form-control"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Message</label>
                <textarea
                  name="message"
                  rows="5"
                  className="form-control"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary d-flex align-items-center gap-2"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <LuSend size={16} />
              </button>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;