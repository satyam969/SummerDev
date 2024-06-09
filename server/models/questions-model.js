const mongoose=require("mongoose");


const questionSchema= new mongoose.Schema({

    title:{type:String,required:true},
    description:{type:String,required:true},
    output:{type:String,required:true},
    tags:{type:String,required:true},
    // an array of object
    answers: { type: [String], default: [] },
comments:{type:[String],default:[]},

})


const Question=new mongoose.model("Question",questionSchema);

module.exports=Question;


