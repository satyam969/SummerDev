require("dotenv").config();
// top pe hi likhna wo code for env
const express = require("express");
const app = express();
const authRoute = require("./router/auth-router");
const connectDb=require("./utils/db");
const contactRoute=require("./router/contact-router")
const questionRouter=require("./router/question-route")
const replyRoute=require("./router/replies-route")
const cors=require("cors")



// ek aur step krna hoga wrna data nhi jyega database pe 
const corsOptions={
    origin:"http://localhost:5173",
    methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials:true,
}
// cors ko btana hai ki 5173 bhi mera hi part hai 
// data jaye isliye sbse upar isko state kro 
app.use(cors(corsOptions));




// middle ware to make this server compatable for json file 
// middle ware aage wle code ko bhi 
// ye aage wle code ko kharab kr dega bht impt hai middleware ka use janana

app.use(express.json());

// parses incoming request from bodies with json payloads 
// place it before any routes that need to handle any json data





// adding contact route 
app.use("/api/form", contactRoute)



// lect 3
// "/"" represents the root path
// (req,res) arrow function handling and constructing response
// res.send("hello world") sends the hello world message 

// nodemon ko pta kaise chlega ki ye router is server se linked hai 
// so we need to export router
// mount kha krana chahte ho
app.use("/api/auth", authRoute)



// for questions route 
app.use("/api/auth/questions",questionRouter);



//  for reply route

app.use("/api/auth/reply",replyRoute);








const PORT = 5000;

// if connection established then 
// as connectdb will return promise 






connectDb().then(()=>{
    app.listen(PORT, () => {
        console.log(`server is running at port :- ${PORT}`)
    })

}
    )
    .catch((e)=>{
    console.log("error in connecting server")
})