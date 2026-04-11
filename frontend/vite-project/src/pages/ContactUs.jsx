import React, { useState } from "react";
import {
  LuMail,
  LuPhone,
  LuMapPin,
  LuClock,
  LuMessageCircle,
  LuHeadphones,
  LuShieldCheck,
  LuSend,
} from "react-icons/lu";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("Please fill all required fields");
      return;
    }

    alert("Message sent!");
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div>
      {/* HERO */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-lg-6">
              <p className="text-uppercase text-primary fw-bold">Contact Us</p>
              <h1 className="display-5">
                Let's Start a <span className="text-primary">Conversation</span>
              </h1>
              <p className="text-muted">
                Whether you have a question or need help — we're here for you.
              </p>
            </div>

            <div className="col-lg-6 text-center">
              <LuMail size={80} className="text-primary" />
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT METHODS */}
      <section className="py-5 border-top border-bottom">
        <div className="container">
          <div className="row g-4">
            {[
              { icon: LuMail, title: "Email", detail: "hello@luxestore.com" },
              { icon: LuPhone, title: "Call", detail: "+1 555 000" },
              { icon: LuMapPin, title: "Visit", detail: "New York" },
              { icon: LuClock, title: "Hours", detail: "10AM - 8PM" },
            ].map((item, i) => (
              <div className="col-md-6 col-lg-3" key={i}>
                <div className="card text-center p-3 h-100">
                  <item.icon size={28} className="mx-auto mb-2 text-primary" />
                  <h5>{item.title}</h5>
                  <p className="text-muted small">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM + SIDE */}
      <section className="py-5">
        <div className="container">
          <div className="row g-5">
            {/* FORM */}
            <div className="col-lg-6">
              <h3>Send a Message</h3>

              <form onSubmit={handleSubmit} className="card p-4">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label>Name *</label>
                    <input
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label>Email *</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label>Subject</label>
                  <input
                    className="form-control"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>

                <div className="mt-3">
                  <label>Message *</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <button className="btn btn-primary mt-4 w-100">
                  <LuSend size={16} className="me-2" />
                  Send Message
                </button>
              </form>
            </div>

            {/* RIGHT SIDE */}
            <div className="col-lg-6">
              <div className="card p-4 text-center mb-4">
                <LuMapPin size={40} className="text-primary mb-2" />
                <h5>Our Store</h5>
                <p className="text-muted">123 Fashion Ave, NY</p>
              </div>

              {[
                {
                  icon: LuMessageCircle,
                  title: "Live Chat",
                  desc: "Instant answers from support.",
                },
                {
                  icon: LuHeadphones,
                  title: "Support",
                  desc: "Priority support team.",
                },
                {
                  icon: LuShieldCheck,
                  title: "Secure",
                  desc: "Your data is safe.",
                },
              ].map((item, i) => (
                <div className="card p-3 mb-3 d-flex flex-row" key={i}>
                  <item.icon size={22} className="me-3 text-primary" />
                  <div>
                    <h6>{item.title}</h6>
                    <p className="text-muted small">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;