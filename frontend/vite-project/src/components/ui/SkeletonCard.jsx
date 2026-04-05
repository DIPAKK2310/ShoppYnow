const SkeletonCard = () => {
  return (
    <div className="card col-12 col-md-6 col-lg-3 my-4">
      <div className="placeholder-glow">
        <div className="placeholder w-100" style={{ height: "15rem" }}></div>
      </div>
      <div className="card-body">
        <div className="placeholder col-6 mb-2"></div>
        <div className="placeholder col-7 mb-2"></div>
        <div className="placeholder col-4"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;