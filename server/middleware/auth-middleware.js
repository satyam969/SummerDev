// to verify where we get the json token or not
const jwt=require("jsonwebtoken");
const User=require("../models/user-module");

// next call krne k bad hi agle page pe jyega otherwise not
const authMidleware=async (req,res,next)=>{

    const token=req.header('Authorization');


    if(!token){

        return res.status(401).json({message:"Unauthorised HTTP, Token not provided"});


    }

    // postman se header ke through jo token aa rha hai 


// token is in the format bearer token
const jwtToken=token.replace("Bearer","").trim();

console.log("token from auth middleware",jwtToken);





try{

// jwt.verify se ho jyega 
// jwt.sign k andr jo jwtsecretkey define ki hai
    const isVerified=jwt.verify(jwtToken,process.env.JWT_SECRET_KEY);
    // password chor kr sb chahiye 
const userData=await User.findOne({email:isVerified.email}).select({password:0});


    // isVerified me sara deta mil jyega :- userID,emasil,isAdmin bs yhi 3 milega 
    // sirf yhi 3no data milega jo cheese jwt.sign ke andras a payload  pass ki hai 
    console.log("verified",userData);

// creation of custom properties
req.user=userData;
req.token=token;
req.userID=userData._id;
// ab front end pe in sb property ke throgh data phucha skte hai


// move to next middle ware or route handler
    next();
} catch(error) {

    return res.status(401).json({message:"Unauthorised Invalid Token"});

}

};

module.exports=authMidleware;