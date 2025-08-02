// src/pages/PrivacyPolicy.jsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-page">
      <header className="bg-primary text-white text-center py-5">
        <h1>Privacy Policy</h1>
        <p>Protecting your personal information is our priority</p>
      </header>

      <Container className="py-5">
        <Row>
          <Col sm={12}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>1. Information We Collect</Card.Title>
                <Card.Text>
                  We collect personal information when you make a purchase, register an account, or use our website. This information may include:
                  <ul>
                    <li>Your name</li>
                    <li>Email address</li>
                    <li>Billing and shipping addresses</li>
                    <li>Payment details</li>
                    <li>Browsing behavior on our website</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Body>
                <Card.Title>2. How We Use Your Information</Card.Title>
                <Card.Text>
                  The information we collect is used to:
                  <ul>
                    <li>Process transactions and deliver products</li>
                    <li>Personalize your shopping experience</li>
                    <li>Send order updates and promotional offers</li>
                    <li>Improve our website and customer service</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Body>
                <Card.Title>3. Cookies</Card.Title>
                <Card.Text>
                  We use cookies to enhance your shopping experience. Cookies help us remember your preferences, track your activity on our website, and personalize content. You can disable cookies in your browser settings, but some features of our website may not function properly without them.
                </Card.Text>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Body>
                <Card.Title>4. Data Protection</Card.Title>
                <Card.Text>
                  We implement a variety of security measures to protect your personal information. Your data is stored in a secure environment, and we use encryption to protect sensitive information like payment details.
                </Card.Text>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Body>
                <Card.Title>5. User Rights</Card.Title>
                <Card.Text>
                  You have the right to:
                  <ul>
                    <li>Access your personal data</li>
                    <li>Request corrections to your data</li>
                    <li>Request deletion of your data</li>
                    <li>Opt-out of marketing communications</li>
                  </ul>
                  If you wish to exercise any of these rights, please contact us at the email address provided below.
                </Card.Text>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Body>
                <Card.Title>6. Changes to This Privacy Policy</Card.Title>
                <Card.Text>
                  We may update this Privacy Policy from time to time. When we make changes, we will update the "Last Updated" date at the bottom of this page. We encourage you to review this page periodically to stay informed about how we are protecting your information.
                </Card.Text>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Body>
                <Card.Title>7. Contact Us</Card.Title>
                <Card.Text>
                  If you have any questions or concerns about this Privacy Policy or how we handle your personal data, please contact us:
                  <ul>
                    <li>Email: <a href="mailto:support@shoppynow.com">support@shoppynow.com</a></li>
                    <li>Phone: +1 (800) 123-4567</li>
                    <li>Address: 123 ShoppYnow St., City, Country</li>
                  </ul>
                </Card.Text>
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

export default PrivacyPolicy;
