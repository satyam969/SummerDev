import { Button } from "react-bootstrap";
import {Link} from'react-router-dom'
const Home=()=>{


    return <div className="home">
    
    <h1>Welcome To Code Casade</h1>

<h2>We at Code Casade </h2>


<h3>1. Get expert answers to all your questions and clear your doubts with our comprehensive online platform.</h3>
    <h3>
2. Say goodbye to confusion and uncertainty with our website dedicated to resolving all your doubts and queries.</h3>
<h3>3. Seek clarity and find solutions with our user-friendly website designed to address all your doubts.</h3>
<h3>4. Empower yourself with knowledge and understanding by using our intuitive platform to resolve all your uncertainties.</h3>
<h3>5. Stop second-guessing and start finding concrete answers to your questions on our informative and reliable website.</h3>

<h2>Features</h2>
<h3>1.Ask questions: Users can submit their questions on a specific topic or category.</h3>
   <h3>2.Answer questions: Experts or other users can provide helpful responses to the questions asked.</h3>
   <h3>3.Comment on doubts: Users can share their doubts or concerns related to a topic and receive feedback from the community.</h3>
<h3>4.Reply to doubts: Other users or moderators can reply to the doubts posted by users to provide clarification or additional information.</h3>

   <div className="flex" > 
 
    <Link to='/addquestion'><Button>Ask Question</Button></Link></div>
    
    </div>
    
    
    
    
    }
    
    export default Home;