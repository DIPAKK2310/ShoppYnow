const SkeletonCard = () => {
  return (
    <div className="card my-4 mb-4 h-100 w-100">
      
      {/* Image (same height) */}
      <div
        className="placeholder-glow card-img-top"
        style={{ height: "15rem",width: "18rem" }}
      >
        <span className="placeholder w-100 h-100"></span>
      </div>

      {/* Body */}
      <div className="card-body d-flex flex-column">
        
        {/* Title */}
        <div className="placeholder-glow mb-2">
          <span className="placeholder col-8"></span>
        </div>

        {/* Description (2 lines like real) */}
        <div className="placeholder-glow mb-2">
          <span className="placeholder col-10 d-block mb-1"></span>
          <span className="placeholder col-7 d-block"></span>
        </div>

        {/* Price */}
        <div className="placeholder-glow mb-3">
          <span className="placeholder col-4"></span>
        </div>

        {/* Button (push to bottom like real card) */}
        <div className="mt-auto">
          <span className="placeholder col-6 btn btn-primary disabled"></span>
        </div>

      </div>
    </div>
  );
};

export default SkeletonCard;