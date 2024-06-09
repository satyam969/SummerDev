const mongoose=require("mongoose");


const repliesSchema= new mongoose.Schema({

    id:{type:String,required:true},
    index:{type:String,required:true},
    reply:{type:[String],required:true}

    

})

const Reply=new mongoose.model("Reply",repliesSchema);

// basically hm comment ke according reply store krnge 

module.exports=Reply;