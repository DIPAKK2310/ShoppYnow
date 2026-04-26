import { motion } from "framer-motion";
import { LuStar, LuQuote } from "react-icons/lu";

const testimonials = [
  {
    id: 1,
    name: "Isabelle Laurent",
    role: "Fashion Editor",
    avatar: "IL",
    rating: 5,
    text: "The craftsmanship is unparalleled. Every piece I've purchased feels like it was made exclusively for me — timeless and effortlessly elegant.",
  },
  {
    id: 2,
    name: "Alexander Chen",
    role: "Creative Director",
    avatar: "AC",
    rating: 5,
    text: "Finally, a brand that understands modern luxury. The attention to detail, from stitching to packaging, is nothing short of extraordinary.",
  },
  {
    id: 3,
    name: "Sofia Martinez",
    role: "Style Consultant",
    avatar: "SM",
    rating: 5,
    text: "I recommend this collection to all my clients. The quality speaks for itself — refined materials, impeccable fits, and designs that transcend seasons.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-5" style={{ background: "#0f0f0f" }}>
      <div className="container">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5 text-light"
        >
          <small className="text-uppercase text-warning fw-semibold">
            Testimonials
          </small>

          <h2 className="mt-3 fw-light display-6">
            What Our Clients Say
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="row g-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="col-md-4"
            >
              <div className="border rounded p-4 h-100 bg-dark text-light position-relative">

                {/* Quote Icon */}
                <LuQuote size={28} className="text-warning mb-3" />

                {/* Stars */}
                <div className="mb-3 d-flex gap-1">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <LuStar key={idx} size={16} className="text-warning" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-secondary small mb-4">
                  "{t.text}"
                </p>

                {/* Author */}
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "#ffc10722",
                      color: "#ffc107",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {t.avatar}
                  </div>

                  <div>
                    <p className="mb-0 small fw-semibold">
                      {t.name}
                    </p>
                    <small className="text-secondary">
                      {t.role}
                    </small>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;