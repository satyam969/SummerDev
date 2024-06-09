const Question = require("../models/questions-model");
const Reply =require("../models/replies-model")


const newreply=async(req,res)=>{


  

try {
   
   const{id,index}=req.params;
    
const {reply}=req.body;

    if(!id){

        return res.status(500).send("No Comment found for Reply")
    }

    console.log(id,reply,index);


const comment= await Question.findOne({_id:id});

if(!comment){
    return res.status(500).send("Comment not found");
}
    const newreplie= await Reply.create({id,index,reply});
    

    if(newreplie){
        res.status(201).json({newreplie});
    }



    
} catch (error) {
    console.log(error);
}





}

const getallreply=async(req,res)=>{

const {id,index}=req.params;

console.log("get");
console.log(id,index);
try {
    if(!id || !index){
        return res.status(500).send("No Reply Found")
    }
    
  
   const response=await Reply.find({id,index});
    


        res.status(200).send({response});

 
    
    
    
} catch (error) {
    console.log(error);

}






}

module.exports={newreply,getallreply};