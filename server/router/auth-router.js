
// handling routers

// a router instance is  a complete middleware and routing system; for this reason it is often reffered to as a mini app
const express =require("express");
const router=express.Router();
const {user}=require("../controllers/auth-controller");
const {home}=require("../controllers/auth-controller");
const {register}=require("../controllers/auth-controller");
const {login}=require("../controllers/auth-controller")
const signupschema =require("../validators/auth-validator")
const loginschema =require("../validators/login-validator")
const validate =require("../middleware/validate-middleware");
const authMidleware=require("../middleware/auth-middleware");
// better way to get is get const authcontrollers =require("../controllers/auth-controller.js") and then use authcontrollers.home,... 
// then use authcontroller.user,.. other function

// app.get("/",(req,res)=>{
//     res.status(200).send("welcome to this")
// })


// router.get("/",(req,res)=>{
//     res.status(200).send("welcome to this using router")
// })

// or
router.route("/").get(home);
// router.route("/").get((req,res)=>{
//     res.status(200).send("welcome to this world using route router")
// }).post()...




// jb bhi register pe jyega wha registration hone se pehle hme zod me check krna hoga 
// pehle validate hoga phir register hoga 
router.route("/register").post(validate(signupschema),register);

router.route("/login").post(validate(loginschema),login);


// user ko login krne ke bad wo data hme get krna hai
// ek middleware add kro jo check krega ki json token shi h ki nhi
router.route('/user').get(authMidleware,user);















// lecture;-controllers
// ye router wali file toh theek hai lekin aek hi jagah request bhi karo aur respond bhi wo acha nhi lgega so we have controllers 
// mini app which keeps all the functionalities like registration,login,etc to keeep our router file clean
// most impt step is to export
module.exports=router;