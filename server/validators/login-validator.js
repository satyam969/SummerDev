const {z}=require("zod");


// making  alogin schema 


const loginschema=z.object({
    email:z
    .string({required_error:"Email is Required"})
    .trim()
    .email({message:"Invalid Email Adress"})
    .min(3,{message:"EmailNam must be atleast of 3 character"})
    .max(255,{message:"can not be greater than 255 characters"}),
    password:z
    .string({required_error:"password is Required"})
    .trim()
    .min(6,{message:"password must be atleast of 3 character"})
    .max(255,{message:"can not be greater than 255 characters"}),
})


module.exports=loginschema;