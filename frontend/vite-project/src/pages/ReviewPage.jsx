import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const ReviewPage = () => {
  // State to track the selected rating
  const [rating, setRating] = useState(0);

  // Handle click event to set the rating
  const handleStarClick = (starIndex) => {
    setRating(starIndex);
  };

  // Function to render the stars
  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          style={{ fontSize: "30px", cursor: "pointer" }}
          onClick={() => handleStarClick(i)}
        >
          {i <= rating ? (
            <strong style={{ color: "#FFD700" }}>★</strong> // Filled star
          ) : (
            <strong>☆</strong> // Empty star
          )}
        </span>
      );
    }
    return stars;
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col className="text-center">
          <h2>Product Review</h2>
          <div className="star-rating mb-3">
            <p>Click to rate:</p>
            <div>{renderStars()}</div>
          </div>
          <div>
            <p>
              Your Rating:{" "}
              {rating > 0
                ? `${rating} star${rating > 1 ? "s" : ""}`
                : "No rating yet"}
            </p>
          </div>
          <Button variant="primary" onClick={() => alert(`You rated ${rating} star(s)`)}>Submit Review</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ReviewPage;
