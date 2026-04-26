import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LuSend,
  LuMail,
  LuMapPin,
  LuTwitter,
  LuGithub,
  LuLinkedin,
} from "react-icons/lu";
import { contactSchema } from "../lib/contactSchema";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [debouncedName, setDebouncedName] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Debounce logic (300ms delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedName(formData.name);
    }, 300);

    return () => clearTimeout(timer);
  }, [formData.name]);

  // ✅ Real-time validation for NAME only
  useEffect(() => {
    if (!debouncedName) return;

    const result = contactSchema.shape.name.safeParse(debouncedName);

    if (!result.success) {
      setErrors((prev) => ({
        ...prev,
        name: result.error.flatten().fieldErrors.name,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        name: undefined,
      }));
    }
  }, [debouncedName]);

  // ✅ Submit validation (full form)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({});
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
    <section className="py-5" style={{ backgroundColor: "#111" }}>
      <div className="container">
        <div className="row g-5">

          {/* LEFT */}
          <motion.div
            className="col-lg-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="fw-bold mb-3 display-5">Get in Touch</h1>
            <p className="mb-4">
              Have a question or project idea? I'd love to hear from you.
            </p>

            <div className="d-flex align-items-center gap-3 mb-3">
              <LuMail /> hello@example.com
            </div>

            <div className="d-flex align-items-center gap-3 mb-4">
              <LuMapPin /> San Francisco, California
            </div>
          </motion.div>

          {/* FORM */}
          <motion.div
            className="col-lg-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <form onSubmit={handleSubmit}>

              {/* NAME */}
              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <div className="text-danger">{errors.name[0]}</div>
                )}
              </div>

              {/* EMAIL */}
              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="text-danger">{errors.email[0]}</div>
                )}
              </div>

              {/* SUBJECT */}
              <div className="mb-3">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  className="form-control"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              {/* MESSAGE */}
              <div className="mb-3">
                <label>Message</label>
                <textarea
                  name="message"
                  className={`form-control ${errors.message ? "is-invalid" : ""}`}
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                />
                {errors.message && (
                  <div className="text-danger">{errors.message[0]}</div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary d-flex gap-2 align-items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <LuSend />
              </button>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;