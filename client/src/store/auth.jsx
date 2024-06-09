// context api ke use se hm iss funcn ko sare jagah share kr denge
import {createContext, useContext, useEffect, useState} from "react"


// context is a feature that allows you to share state data between components
//  without explicitly passing the data through each level of the component 

export const AuthContext= createContext();


// auth provider funcn ke through hi hm data ko provide krnge 
// as a value props hoga ek jha apko data pass kr dena hai
export const AuthProvider= ({children})=>{

// ek state variable lgega 
const [token,setToken]=useState(localStorage.getItem('token'));

const [user,setUser]=useState("");

// is loading for checking if user data was got or not

const [isloading,setIsloading]=useState(true);


const authorizationToken = `Bearer ${token}`;


const [question,setData]=useState([]);
// {
//     _id:"",
//     service:"",
//     description:"",
//     price:"",
//     provider:"",
// }


// url change for deployment;
const API=import.meta.env.VITE_APP_URI_API;




// children ka C capital nhi hon achahiye ditto likhna hoga 
const storetokenInLS=(serverToken)=>{

// token update turant kr do and then turant change ho jyega logout me
setToken(serverToken);



    // local storage se nikalne ke liye getItem hota hai
    return localStorage.setItem("token",serverToken)

}


// conditional rendering type ka kuch krna hoga tki jb 
// logout dike tb register,login na dikhe
// token hai toh true otherwise false
let isLoggedIn=!!token;
// console.log("isLoggedin",isLoggedIn);







// tackling the logout functionality 
// basically jb hm local storage s etoken delete kr denge tbhi logout hoga 
const LogoutUser=()=>{
    setToken("");
    return localStorage.removeItem('token')
}







// jwt authentication to get currently logged user data
// user ka dat mujhe bhut sare pages ke liye chahiye hoga toh hr jagah
// call krne kinjagah mai use ek jagah call krkr bki
//  jgh import kra skta hu usecontext hook ki mdd se


const userAuthentication= async ()=>{
    // token upar wala hi hai
    try{
    
    const response=await fetch(`${API}/api/auth/user`,{
            method:"GET",
            headers:{
                Authorization: authorizationToken,
        },
        })
    
    if(response.ok){
    const data =await response.json();
    // console.log("user data ",data)

    setUser(data);
    setIsloading(false);
   
    }
    else{
        console.error(" Error fetching user data");
        setIsloading(false);
    }


    } catch(error){
        console.log(error);
    }
    
    
    
    
    };
    




    const getData = async () => {
        try {
            const response = await fetch(`${API}/api/auth/questions/getallquestions`, {
                method: "GET"
            });

            if (response.ok) {
                const questions = await response.json();
                setData(questions.questions);
            }
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };








    
    // sirf user authentication call krne se bar bar call hoga lkin ek hi bar krna hai so useEffect
    // userAuthentication();
    // iske according agr khi bhi ek bar auth call ho rha hai 
    // fix the toggle functionality in login,register 
    // jo ek bar refresh krne k bad hat kr logout hote the loginkrne ke bad


    useEffect(() => {
       
        userAuthentication();
        getData();

    }, []);

    


    return <AuthContext.Provider value={{storetokenInLS,LogoutUser,isLoggedIn,isloading,question,authorizationToken,user,API}}>
        {children}
    </AuthContext.Provider>

}



// consumer ki jagah hm use context use krte hai
// jo bhi chahta hai 
// custom hook bnana hoga 
// main pe app ko Auth-provider ke andar wrap krna jruri hai


export const useAuth=()=>{
// sara Authcontext apne andar sama liya hai
const authContextvalue=useContext(AuthContext);

if(!authContextvalue){
    throw new Error("useAuth used outside of provider");
}
    return authContextvalue;
}




