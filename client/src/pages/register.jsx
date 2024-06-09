import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify"
import { useAuth } from "../store/auth";

const Register = () => {
  const [user, setUser] = useState({
    username: "", email: "", phone: "", password: "",
  });


  const { storetokenInLS } = useAuth();


  const API = import.meta.env.VITE_APP_URI_API;

  const navigate = useNavigate();

  const handleInput = (e) => {
    var name = e.target.name;
    var value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Example fetch request (commented out, assuming you're handling the request elsewhere)
    try {
      const response = await fetch(`${API}/api/auth/register`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const res_data = await response.json();
      if (response.ok) {
        storetokenInLS(res_data.token);
        setUser({ username: "", email: "", phone: "", password: "" });
        toast.success("Registration successful");
        navigate("/");
      } else {
        toast.error(res_data.message ? res_data.message : res_data.extraDetails);
        setUser({ username: "", email: "", phone: "", password: "" });
      }
    } catch (error) {
      console.log("register data sending error");
    }
  };

  return (
    <Container>
      <h1>WELCOME TO Register PAGE</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={user.username}
              onChange={handleInput}
              placeholder="Enter username"
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={user.email}
              onChange={handleInput}
              placeholder="Enter email"
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="number"
              name="phone"
              value={user.phone}
              onChange={handleInput}
              placeholder="Enter phone number"
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={user.password}
              onChange={handleInput}
              placeholder="Enter password"
            />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Register Now
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
