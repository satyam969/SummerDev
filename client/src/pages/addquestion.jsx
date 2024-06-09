import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const AddQuestion = () => {
  const [question, setQuestion] = useState({
   title:"",
   description:"",
   output:"",
   tags:""

  });

  const navigate = useNavigate();



  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...question,
      [name]: value,
    });
  };

  const handleSubmit =  (e) => {
    e.preventDefault();
//     try {
//       const response = await fetch(`${API}/api/auth/AddQuestion`, {
//         method: 'POST',
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(user),
//       });

//       const res_data = await response.json();

//       if (response.ok) {
//         toast.success("Log In Successful");
//         storetokenInLS(res_data.token);
//         setUser({ email: "", password: "" });
//         navigate("/");
//       } else {
//         setUser({ email: "", password: "" });
//         toast.error(res_data.message ? res_data.message : res_data.extraDetails);
//       }
//     } catch (error) {
//       console.log("Log in data sending error", error);
    
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1 className="main-heading mb-3">AddQuestion Form</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={question.title}
                onChange={handleInput}
                placeholder="Enter title"
              />
            </Form.Group>
            <Form.Group controlId="formdescription" className="mt-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  autoComplete="off"
                  placeholder="Enter description"
                  value={question.description}
                  onChange={handleInput}
                  required
                  rows={6}
                />
              </Form.Group>
              <Form.Group controlId="formoutput" className="mt-3">
                <Form.Label>Output</Form.Label>
                <Form.Control
                  as="textarea"
                  name="output"
                  placeholder="Enter output you want"
                  autoComplete="off"
                  value={question.output}
                  onChange={handleInput}
                  required
                  rows={6}
                />
              </Form.Group>
              <Form.Group controlId="formtags" className="mt-3">
                <Form.Label>Tags</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter tags for the question"
                  name="tags"
                  autoComplete="off"
                  value={question.tags}
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
  );
};

export default AddQuestion;
