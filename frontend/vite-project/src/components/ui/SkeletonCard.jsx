const SkeletonCard = () => {
  return (
    <div className="card my-4 mb-4">
      
      {/* Image */}
      <div className="placeholder-glow">
        <div
          className="placeholder w-100"
          style={{ height: "15rem" }}
        ></div>
      </div>

      {/* Body */}
      <div className="card-body">
        
        {/* Title */}
        <div className="placeholder-glow mb-2">
          <span className="placeholder col-6"></span>
        </div>

        {/* Description */}
        <div className="placeholder-glow mb-2">
          <span className="placeholder col-8"></span>
          <span className="placeholder col-7"></span>
        </div>

        {/* Price */}
        <div className="placeholder-glow mb-3">
          <span className="placeholder col-4"></span>
        </div>

        {/* Button */}
        <div className="placeholder-glow">
          <span className="placeholder col-6 btn btn-primary disabled"></span>
        </div>

      </div>
    </div>
  );
};

export default SkeletonCard;