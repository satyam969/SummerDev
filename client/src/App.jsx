import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  Home  from "./pages/home";

import  Contact  from "./pages/contact";

import  Register  from "./pages/register";
import  Login  from "./pages/login";
import NNavbar from "./navbar";
import Error from "./pages/notfound";
import Logout from "./pages/logout";
import Question from "./pages/questions";
import AddQuestion from "./pages/addquestion";



const App = () => {



  return (
    <Router>
<NNavbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addquestion" element={<AddQuestion />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/questions" element={<Question />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={ <Logout/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </Router>
  );
};

export default App;