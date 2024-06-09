import { useState, useEffect } from "react";
// import { useAuth } from "./store/auth";
import { toast } from 'react-toastify';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useAuth } from "../store/auth";

const Contact = () => {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });

  const {  user } = useAuth();
  
  const API = import.meta.env.VITE_APP_URI_API;

  const [userdata, setUserdata] = useState(true);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/api/form/contact`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });

      if (response.ok) {
        toast.success("Message sent successfully");
        const res_data = await response.json();
        setContact({
          ...contact,
          message: "",
        });
      } else {
        setContact({
          username: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      toast.error("Message not sent");
    }
  };

  useEffect(() => {
    if (userdata && user) {
      setContact({
        username: user.userData.username,
        email: user.userData.email,
        message: "",
      });
      setUserdata(false);
    }
  }, [user, userdata]);

  return (
    <>
      <Container className="section-contact">
        <Row className="contact-content">
          <Col>
            <h1 className="main-heading">Contact Us</h1>
          </Col>
        </Row>

        <Row className="grid-two-cols">
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  autoComplete="off"
                  value={contact.username}
                  onChange={handleInput}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  autoComplete="off"
                  value={contact.email}
                  onChange={handleInput}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formMessage" className="mt-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message"
                  autoComplete="off"
                  value={contact.message}
                  onChange={handleInput}
                  required
                  rows={6}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-4">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Contact;
