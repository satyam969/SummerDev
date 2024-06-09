import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

const AddQuestion = () => {
  const [question, setQuestion] = useState({
   title:"",
   description:"",
   output:"",
   tags:""

  });

  const navigate = useNavigate();


  const API = import.meta.env.VITE_APP_URI_API;
  const{authorizationToken}=useAuth();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setQuestion({
      ...question,
      [name]: value,
    });
  };

  const handleSubmit =  (e) => {
    e.preventDefault();
console.log(question);
    try {

      const response =fetch(`${API}/api/auth/questions/newquestion`,{
        method:"Post",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken
      },
      body:JSON.stringify(question)
      })
      
console.log(response);
    

        toast.success("question added");


     

      setQuestion(
        {
          title:"",
          description:"",
          output:"",
          tags:""
       
        }
      )

    } catch (error) {
      console.log(error);
    }



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
            <Button variant="primary" type="submit" onClick={handleSubmit} className="mt-4">
             Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddQuestion;
