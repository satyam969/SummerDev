


const Question = require("../models/questions-model");


const getallQuestion=async(req,res)=>{

try {


  const questions=await Question.find();

  if(!questions){
    return res.status(400).send("no questions");
  }

  res.status(200).json({questions});



  
} catch (error) {
  return res.status(500).send(error);
}




}



const getsingleQuestion=async(req,res)=>{

try {
  
const id =req.params.id;


// check if question is present

const questionpresent=await Question.findOne(id);

if(!questionpresent){
  return res.status(500).send("No Such Question Found")
}




// otherwise give all the data 
// isme ans ,comment sb aajyega 

res.status(200).json({questionpresent});





} catch (error) {
  
}




}



// create question
const createquestion=async(req,res)=>{


try {
    const{title,description,output,tags}=req.body;

    // the question already exist
    const exist=await Question.findOne({title});
    
    console.log(exist);
    
        if(exist){
            // already present
    
            return res.status(400).send("Question Already Present")
    
    
        }
    
    // create new object
    
    
    const response=await Question.create({title,description,output,tags})
    
    return res.status(201).send(response);
    
} catch (error) {
    
console.log(error);

}




}

// if ans is not present or even is present so we can have multiple answers 
//  then adding answer 
const handleAnswer = async (req, res) => {
    try {
      const id = req.params.id;
      const { answer } = req.body;
  
      if (!answer) {
        return res.status(400).json({ message: 'Answer is required' });
      }
  
      const question = await Question.findById(id);
  
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
  
      question.answers.push(answer);
      await question.save();
  
      res.status(200).json({ message: 'Answer added successfully', question });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error });
    }
  };



  const updateAnswer = async (req, res) => {
    try {
      const { id, answerIndex } = req.params;
      const { answer } = req.body;
  
      if (!answer) {
        return res.status(400).json({ message: 'Answer is required' });
      }
  
      const question = await Question.findById(id);
  
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
  
      if (answerIndex < 0 || answerIndex >= question.answers.length) {
        return res.status(400).json({ message: 'Invalid answer index' });
      }
  
      // Update the specific answer at the provided index
      question.answers[answerIndex] = answer;
      await question.save();
  
      res.status(200).json({ message: 'Answer updated successfully', question });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error });
    }
  };
  

  const deleteAnswer = async (req, res) => {
    try {
      const { id, answerIndex } = req.params;
  
      const question = await Question.findById(id);
  
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
  
      if (answerIndex < 0 || answerIndex >= question.answers.length) {
        return res.status(400).json({ message: 'Invalid answer index' });
      }
  
      // Remove the specific answer at the provided index
      question.answers.splice(answerIndex, 1);
      await question.save();
  
      res.status(200).json({ message: 'Answer deleted successfully', question });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error });
    }
  };
  





  const handleComment = async (req, res) => {
    try {
      const id = req.params.id;
      const { comment } = req.body;
  
      if (!comment) {
        return res.status(400).json({ message: 'Comment is required' });
      }
  
      const question = await Question.findById(id);
  
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
  
      question.comments.push(comment);
      await question.save();
  
      res.status(200).json({ message: 'Answer added successfully', question });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error });
    }
  };


  const updateComment = async (req, res) => {
    try {
      const { id, commentIndex } = req.params;
      const { comment } = req.body;
  
      if (!comment) {
        return res.status(400).json({ message: 'comments is required' });
      }
  
      const question = await Question.findById(id);
  
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
  
      if (commentIndex < 0 || commentIndex >= question.comments.length) {
        return res.status(400).json({ message: 'Invalid comments index' });
      }
  
      // Update the specific answer at the provided index
      question.comments[commentIndex] = comment;
      await question.save();
  
      res.status(200).json({ message: 'Comments updated successfully', question });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error });
    }
  };
  
  const deleteComment= async (req, res)=>{
    try {
      const { id, commentIndex } = req.params;
  
      const question = await Question.findById(id);
  
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
  
      if (commentIndex < 0 || commentIndex >= question.comments.length) {
        return res.status(400).json({ message: 'Invalid answer index' });
      }
  
      // Remove the specific answer at the provided index
      question.comments.splice(commentIndex, 1);
      await question.save();
  
      res.status(200).json({ message: 'Answer deleted successfully', question });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error });
    }
  };
  
  




module.exports={createquestion,handleAnswer,handleComment,updateAnswer,updateComment,deleteAnswer,deleteComment,getallQuestion,getsingleQuestion};