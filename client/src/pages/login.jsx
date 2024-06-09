import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify"

import { useAuth } from "../store/auth";



const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { storetokenInLS } = useAuth();


  const API = import.meta.env.VITE_APP_URI_API;

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();

      if (response.ok) {
        toast.success("Log In Successful");
        storetokenInLS(res_data.token);
        setUser({ email: "", password: "" });
        navigate("/");
      } else {
        setUser({ email: "", password: "" });
        toast.error(res_data.message ? res_data.message : res_data.extraDetails);
      }
    } catch (error) {
      console.log("Log in data sending error", error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1 className="main-heading mb-3">Login Form</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={user.email}
                onChange={handleInput}
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={user.password}
                onChange={handleInput}
                placeholder="Enter password"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-4">
              Log In
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
