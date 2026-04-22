const SkeletonCard = () => {
  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "16px",
        overflow: "hidden",
        height: "100%",
      }}
    >
      {/* Image skeleton */}
      <div
        style={{
          height: "220px",
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s infinite",
        }}
      />

      {/* Body */}
      <div style={{ padding: "20px" }}>
        {/* Category badge */}
        <div
          style={{
            width: "70px",
            height: "20px",
            borderRadius: "50px",
            background: "rgba(245, 158, 11, 0.08)",
            marginBottom: "12px",
            animation: "shimmer 1.5s infinite",
            backgroundSize: "200% 100%",
            backgroundImage:
              "linear-gradient(90deg, rgba(245,158,11,0.05) 25%, rgba(245,158,11,0.12) 50%, rgba(245,158,11,0.05) 75%)",
          }}
        />

        {/* Title */}
        <div
          style={{
            width: "75%",
            height: "18px",
            borderRadius: "8px",
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
            marginBottom: "10px",
          }}
        />

        {/* Description line 1 */}
        <div
          style={{
            width: "100%",
            height: "12px",
            borderRadius: "6px",
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
            marginBottom: "6px",
          }}
        />
        {/* Description line 2 */}
        <div
          style={{
            width: "60%",
            height: "12px",
            borderRadius: "6px",
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
            marginBottom: "16px",
          }}
        />

        {/* Price + button row */}
        <div className="d-flex justify-content-between align-items-center">
          <div
            style={{
              width: "60px",
              height: "22px",
              borderRadius: "8px",
              background:
                "linear-gradient(90deg, rgba(245,158,11,0.05) 25%, rgba(245,158,11,0.12) 50%, rgba(245,158,11,0.05) 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s infinite",
            }}
          />
          <div
            style={{
              width: "100px",
              height: "36px",
              borderRadius: "50px",
              background:
                "linear-gradient(90deg, rgba(245,158,11,0.06) 25%, rgba(245,158,11,0.14) 50%, rgba(245,158,11,0.06) 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s infinite",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;