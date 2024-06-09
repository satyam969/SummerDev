import { useEffect } from "react"
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";







const Logout=()=>{
    

    const{LogoutUser}=useAuth();
    const{isLoggedIn}=useAuth();


useEffect(()=>{

LogoutUser();


},[isLoggedIn])

return <Navigate to="/login"></Navigate>



}


export default Logout