// src/pages/AboutUs.jsx
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <header className="bg-primary text-white text-center py-5">
        <h1>Welcome to ShoppYnow</h1>
        <p>Your one-stop eCommerce shop for all your needs!</p>
      </header>

      <Container className="py-5">
        <Row>
          <Col sm={12} md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Our Story</Card.Title>
                <Card.Text>
                  At ShoppYnow, we strive to make shopping easy, accessible, and enjoyable for everyone. We started with a simple mission: to bring a wide variety of quality products to our customers with excellent service. Over the years, we have expanded our collection and built a reputation for offering top-notch customer service and fast delivery.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={12} md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Our Mission</Card.Title>
                <Card.Text>
                  Our mission at ShoppYnow is to make online shopping simpler and more convenient for our customers. We offer a curated selection of products with unbeatable prices. Our goal is to bring convenience to your doorstep, with secure payment options, fast delivery, and excellent customer service.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col sm={12} md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Our Values</Card.Title>
                <Card.Text>
                  <ul>
                    <li><strong>Customer First:</strong> We always prioritize our customers' needs.</li>
                    <li><strong>Integrity:</strong> We believe in honesty and transparency in all our dealings.</li>
                    <li><strong>Innovation:</strong> We're constantly striving to improve and innovate for the benefit of our customers.</li>
                    <li><strong>Quality:</strong> We only offer products that meet the highest standards of quality.</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={12} md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Get in Touch</Card.Title>
                <Card.Text>
                  We'd love to hear from you! Whether you have questions, feedback, or suggestions, don't hesitate to reach out to us. We’re committed to providing excellent customer support and making your shopping experience seamless.
                </Card.Text>
                <Button variant="primary" href="/contact-us">
                  Contact Us
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <footer className="bg-dark text-white text-center py-4">
        <p>&copy; 2025 ShoppYnow. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;
