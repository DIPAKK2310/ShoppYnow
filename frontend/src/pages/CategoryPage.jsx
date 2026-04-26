import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const CategoryPage = () => {
  const handleCategoryClick = (category) => {
    // For now, just log the category. 
    // You can navigate to the category's page or fetch products related to that category.
    console.log(`Selected Category: ${category}`);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col className="text-center">
          <h2>Select a Category</h2>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs={12} sm={6} md={4} lg={2} className="mb-4">
          <Button
            variant="primary"
            block
            onClick={() => handleCategoryClick("Men")}
          >
            Men
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} lg={2} className="mb-4">
          <Button
            variant="secondary"
            block
            onClick={() => handleCategoryClick("Women")}
          >
            Women
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} lg={2} className="mb-4">
          <Button
            variant="success"
            block
            onClick={() => handleCategoryClick("Electronics")}
          >
            Electronics
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} lg={2} className="mb-4">
          <Button
            variant="danger"
            block
            onClick={() => handleCategoryClick("Beauty")}
          >
            Beauty
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} lg={2} className="mb-4">
          <Button
            variant="warning"
            block
            onClick={() => handleCategoryClick("Shoes")}
          >
            Shoes
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CategoryPage;
