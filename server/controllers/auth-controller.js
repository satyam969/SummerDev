const bcrypt=require("bcryptjs");
// getting the user module 
const User=require("../models/user-module")




// using bcrpt.js to ptotect the password by hashing
// const bcrypt=require("bcryptjs");




// dispatch is the function that carries out action
// action is the description of what you want to do 
// diapatch is router
// action is what is happeniung
// here this is controllers 
// handling the incoming request,interact with models,and send responses back to cients 





const home = async(req,res)=>{
    try{
        res.status(200).send("welcome to world best mern series")

    } catch(error) {
        console.log(error)
    }
}






// code to send data to our databse 



const register = async(req,res)=>{
    try{
        // jo data hm denge wo req.body me store hoga
        console.log(req.body);
       
        const {username,email,phone,password} =req.body;

// check whether the email already exists or not

const Userexist = await User.findOne({email})

if(Userexist){
    return res.status(400).send("message: email already exist")
}



// jitna bar salt kro ge utna strong password bnega
// sync for synchronic
// const salt=bcrypt.genSaltSync(10);
// asynchronously
// hash the password

// agr module me pre wala tareka nhi use krna hai toh
// const saltRound=10;
// const hash_password=await bcrypt.hash(password,salt);
// const Usercreated=await User.create({username,email,phone,password:hash_password});
// ye 2 line jyada ho gya yha nhi hona chahiye 

const Usercreated=await User.create({username,email,phone,password});




// json token ko bhi server pe pass kr denge 
        res.status(201).send({msg: "Usercreated",token: await Usercreated.generateToken(),userID:Usercreated._id.toString()})
// abhi hmara file json file se comptaatable nhi hai so abhi postman me kuch bhi display nhi kerega
// so we need to use middleware
    } catch(error) {
        console.log(error)
    }
}

// user login logic
// register krne k bad phir se knhi login krne ke liye 
// register wale scherma se hi hmara kam ho jyega so hme ek aur banne ki jruruat nhi hai
const login=async(req,res)=>{

    try{
const {email,password}=req.body;

const userExist=await User.findOne({email});

// userexist me sara data mil jyega 

if(!userExist){
    return res.status(400).json({message:"Invalid Credentials"});
}
else{




// if user exist so compare password enterd from existing password
// is chij ke liye hm khud se ek nya function bna skte hai 
// const user =await bcrypt.compare(password,userExist.password)
// comnpare password mere user module pe hai
const user=await userExist.comparepassword(password);


if(user){

    res.status(200).send({msg: "Succesfully login",token: await userExist.generateToken(),userID:userExist._id.toString()})
    
}
else{
    res.status(401).json({message:"INvalid Email or password "})
}


}


    }
    catch(error){
        res.status(500).json("internal server error");
        console.log(error);
        // error middleware ki mdd se error handle krnge ek jagah
        // next(error)likhne se wo direct client ko messgae na bhjte hue hmare error middle ware pe aayega jha se client ko message jyega

        // next(error);
    }


    

}



// to send user data
// '/user' pe usko user ka data mil jyega jo currently logged in hai
const user=async(req,res)=>{

    try{

        const userData=req.user;
        // req.user ko bhi define krna hoga 
        console.log(userData);
        // front end ko user data dena hai
return res.status(200).json({userData});

    }catch(error){
        console.log(`error from the user route ${error}`)
    }

}





module.exports={user,home,register,login};
