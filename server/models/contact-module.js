// agr hm chahte hai ki user bina login kiye bhi hmse contact kr paye toh 
// uske liye nya schema bnana hoga 

const {Schema,model}=require("mongoose");

const contactschema =new Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    message:{type:String,required:true},
}
)


// create  a model or a collection named contacts 
const Contact= new model("Contact",contactschema);

module.exports=Contact;