import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './store/auth';


function NavScrollExample() {

  const [search,setSearch]=useState("");
const[filter,setFilter]=useState([]);

  const{isLoggedIn}=useAuth();
  const {question}=useAuth();

  const navigate=useNavigate();

  const API = import.meta.env.VITE_APP_URI_API;

  const handleInput=(e)=>{

    let sear=e.target.value;
    setSearch(sear);
console.log(search);
    
  }


  const searchResult = () => {
    if (question) {
      const filteredQuestions = question.filter(questio => questio.title.toLowerCase().includes(search.toLowerCase()));
      if(filteredQuestions){
        setFilter(filteredQuestions);
      }
    }
  }

  useEffect(() => {
    searchResult();
  }, [search]);

console.log(filter)

  const handleSearch=(e)=>{
e.preventDefault();





  }


  const getsinglequestion=(id)=>{

    navigate(`/${id}`);
  }




  
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand >Code Casade</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavLink className={"link"} to ="/">Home</NavLink>
            <NavLink className={"link"} to ="/questions">Questions</NavLink>
            

            
            
            <NavLink className={"link"} to ="/contact">Contact</NavLink>
            
          {!isLoggedIn? <div className=""> <NavLink className={"link"} to ="/login">Login</NavLink>
            <NavLink className={"link"} to ="/register">Register</NavLink></div>:
            <NavLink className={"link"} to ="/logout">Logout</NavLink>
            }

            
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              value={search}
              onChange={handleInput}
              className="search me-2"
              aria-label="Search"
            />
            <div className="matchres">


            {filter.map((filt) => (
              <Button className='srcres' onClick={()=>getsinglequestion(filt._id)} key={filt._id}>{filt.title}</Button>
            ))}


            </div>
            <Button className="searchbut"variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;