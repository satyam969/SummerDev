//  ZOD ki wajah se jo schema define ki hai hmne
// ab hme check krna hai user jo input de rha hai wo hmare hisab se shi hai ki nhi 


//  await schema.parseAsync(req.body) is the line to validate ZOD

const validate =(schema)=>async(req,res,next)=>{

    try{

const parseBody=await schema.parseAsync(req.body);
req.body=parseBody;
next();

    } catch(error){
       
        const message=error.errors[0].message;
        
        // res.status(400).json({msg:message});
        next(error.errors[0]);
    }



}




module.exports=validate;