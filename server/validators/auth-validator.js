// ZOD
const {z}=require("zod");



// create an object schema for registration

const signupSchema = z.object({
    username:z
    .string({required_error:"Name is Required"})
    .trim()
    .min(3,{message:"Name must be atleast of 3 character"})
    .max(255,{message:"can not be greater than 255 characters"}),

    email:z
    .string({required_error:"Email is Required"})
    .trim()
    .email({message:"Invalid Email Adress"})
    .min(3,{message:"EmailNam must be atleast of 3 character"})
    .max(255,{message:"can not be greater than 255 characters"}),
    phone:z
    .string({required_error:"Phone is Required"})
    .trim()
    .min(10,{message:"Phone number must be valid"})
    .max(13,{message:"phone number can not exceed 13"}),
    password:z
    .string({required_error:"password is Required"})
    .trim()
    .min(6,{message:"password must be atleast of 3 character"})
    .max(255,{message:"can not be greater than 255 characters"}),








});


module.exports=signupSchema;

