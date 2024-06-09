// basically hm sb chiz contact form ke liye bina register kre krne ki 
// functionality add kr rhe hai toh user schema,auth,.. se koi lena dena na ho toh acha hoga 

const Contact=require("../models/contact-module");

const contactForm=async(req,res)=>{
try{

    const response =req.body;
    await Contact.create(response);
return res.status(200).json({message:"message send succesfully"});

}catch(error){
return res.status(500).json({meassage:"message not delivered"});
}
}


module.exports=contactForm;