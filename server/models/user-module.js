// creating a user schema according which data can be send 
// itna hi data chahiye mujhe na km na jyada
const bcrypt=require("bcryptjs");
const mongoose =require("mongoose");
const jwt=require("jsonwebtoken");


// ZOD validification ke through hmlog 
// condition dal skte hai password kitne length ka hona chahiye ,...
// bina password dale data enter nhi kr skte ...


const userSchema =new mongoose.Schema({
    username:{
        type:String,required:true,
    },
    email:{
        type:String,required:true,
    },phone:{
        type:String,required:true,
    },
    password:{
        type:String,require:true,
    },isAdmin:{
        type:Boolean,default:false,
    }
})

// Models: act as a higher level abstraction that interacts with the database based on the defined schema 
// it represents a collection and provides  an interface for querrying,creating ,updating,and deleting documents in that collection 
// models are created from schema and enable you to work with mongodb data in a more structured manner in your application

// define the model , collection name
// 1st letter should be capital


//  v impt
// securing the password 
// acts as a middleware data save hone se pehle ye apna kaam krega
userSchema.pre('save',async function(){
console.log("this",this);
// this will give the data which is to be stored at database
const user=this;

// agr paswword change hi nhi huwa to aage bdha do
// toh is store kro
// already login
if(!user.isModified('password')){
    next();
}

// agr new password ya phir new account 
// 1st time password bn rha 
try{
    const saltRound= await bcrypt.genSalt(10);

const hash_password=await bcrypt.hash(user.password,saltRound);
user.password=hash_password;

}catch(error){
    next(error);
}


})





// compare the password
userSchema.methods.comparepassword=async function (password){
// this ke andr sra data aa jata hai
    return bcrypt.compare(password,this.password)
}







// json web token :- it is a compact and self-contaired way for securily 
// transmitting information between parties as json object
// JWT TOKENS ARE USED FOR:-
// 1.Authentication:-verifying the identity of user
// 2.Authorisation:-determining what actions user or client is allowed to perform

// Components of JWT:-
// header:-The JWT header contains metadata about a JWT, including the key identifier, what algorithm was used to sign in and other information.
// payload:-contains claims like user id,username
// signature:-to verify taht the sender of jwt is who it says it is and to ensure taht the message is not changed along the way

// jwt me mostly string ban kr kam krte hai data k sath

// json web token are not stored in the database usse hme ya to cookies ya phir local storage me save rkhna hai
// server assign krta hai ye tok

// iss syntax se hm kitne bhi function create kr skte hai aur khi bhi use kr skte hai
userSchema.methods.generateToken = async function(){

    try{
        return jwt.sign({
            // passing payload ye data frontend ko mil jyega 
            // jb hmara jwt token verify hojyega
            userID:this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin

        },
        // pass signature
        process.env.JWT_SECRET_KEY,
        // optional
        {
        expiresIn:"30d"}
    );

    }catch(error){
        console.error(error);
    }



};













// colection ke database ke users wale me iska data ja ke fill hoga that is mernstack->users
const User=new mongoose.model("User",userSchema);


module.exports=User;

