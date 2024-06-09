import { Button } from "react-bootstrap";
import {Link} from'react-router-dom'
const Home=()=>{


    return <>
    
    <h1>Welcome To Code Casade</h1>


    

    <div className="flex" > <h2>Top Questions</h2>
 
    <Link to='/addquestion'><Button>Ask Question</Button></Link></div>
    
    </>
    
    
    
    
    }
    
    export default Home;