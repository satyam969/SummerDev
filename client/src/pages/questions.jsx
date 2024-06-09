import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth"


const Question = () => {


    const { authorizationToken } = useAuth();

    const [newAnswer, setAnswer] = useState({});
    const [newreply, setReply] = useState({});
    const [newComment,setComment]=useState({});
    const [data, setData] = useState([]);
    const [replies, setReplies] = useState({});
    const API = import.meta.env.VITE_APP_URI_API;




  





    const handleSubmit = async (e, id, s) => {

        console.log(id);
        console.log(newAnswer[id])


        console.log(`${API}/api/auth/questions/new${s}/${id}`);
        e.preventDefault();
        try {

            const response = await fetch(`${API}/api/auth/questions/new${s}/${id}`, {



                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken
                },
                body: JSON.stringify(newAnswer[id])



            })

            if (response.ok) {

                console.log("New answer added Succesfully")

                getData();


                setAnswer((prevInputs) => ({
                    ...prevInputs,
                    [id]: {
                      ...prevInputs[id],
                      answer: "",
                    },
                  }));
            }



        } catch (error) {
            console.log(error);
        }


    }





    const handleSubmitComment = async (e, id, s) => {

      


        console.log(`${API}/api/auth/questions/new${s}/${id}`);
        e.preventDefault();
        try {

            const response = await fetch(`${API}/api/auth/questions/new${s}/${id}`, {



                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken
                },
                body: JSON.stringify(newComment[id])



            })

            if (response.ok) {

                console.log("New answer added Succesfully")

                getData();


                setComment((prevInputs) => ({
                    ...prevInputs,
                    [id]: {
                      ...prevInputs[id],
                      comment: "",
                    },
                  }));
            }



        } catch (error) {
            console.log(error);
        }


    }


    
    const handleSubmitReply = async (e, id, index) => {

      


        console.log(`${API}/api/auth/reply/newreply/${id}/${index}`);
        e.preventDefault();
        try {

            const response = await fetch(`${API}/api/auth/reply/newreply/${id}/${index}`, {



                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken
                },
                body: JSON.stringify({ reply: newreply[id][index] })


            })

            if (response.ok) {

                console.log("New reply added Succesfully")

                getReplies(id,index);


            }

            setReply((prevInputs) => ({
                ...prevInputs,
                [id]: {
                  ...prevInputs[id],
                  [index]: "",
                },
              }));


        } catch (error) {
            console.log(error);
        }


    }










    const handleInput = (e, questionId) => {
        const name =e.target.name;
        const value = e.target.value;
        setAnswer((prevInputs) => ({
            ...prevInputs,
            [questionId]:{
                ...prevInputs[questionId],
                [name]: value,
              },
        }));

    };



    const handleInputReply = (e, questionId, index) => {
        const value = e.target.value;
    
        setReply((prevInputs) => ({
            ...prevInputs,
            [questionId]: {
                ...(prevInputs[questionId] || {}), // Add an empty object check here
                [index]: value
            }
        }));
    };


    const handleInputComment = (e, questionId) => {
        const name =e.target.name;
        const value = e.target.value;
        setComment((prevInputs) => ({
            ...prevInputs,
            [questionId]:{
                ...prevInputs[questionId],
                [name]: value,
              },
        }));

    };


    const getReplies = async (questionId, commentIndex) => {
        try {
            const response = await fetch(`${API}/api/auth/reply/allreply/${questionId}/${commentIndex}`, {
                method: "GET"
            });

            if (response.ok) {
                const rep = await response.json();
                setReplies((prevReplies) => ({
                    ...prevReplies,
                    [questionId]: {
                        ...prevReplies[questionId],
                        [commentIndex]: rep.response
                    }
                }));


                // console.log(rep.response[0].reply);
            }




        } catch (error) {
            console.error("Error fetching replies:", error);
        }
    };


    
    const getData = async () => {
        try {
            const response = await fetch(`${API}/api/auth/questions/getallquestions`, {
                method: "GET"
            });

            if (response.ok) {
                const questions = await response.json();
                setData(questions.questions);
            }
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

  

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            data.forEach((question) => {
                question.comments.forEach((comment, index) => {
                    getReplies(question._id, index);
                });
            });
        }
    }, [data]);

    return (
        <>
            <h1>Welcome To Questions page</h1>

            <div className="flex">
                <h2>All Questions</h2>
                <Link to='/addquestion'><Button>Ask Question</Button></Link>
            </div>

            <div className="cont">
                {data.map((question) => (
                    <div className="contain" key={question._id}>
                        <div className="title"><h5>Question</h5>{question.title}</div>
                        <div className="description"><h5>Description</h5>{question.description}</div>
                        <div className="output"><h5>What to do</h5>{question.output}</div>

                        <div className="answers">
                            {question.answers.map((answer, index) => (
                                <div className="answer" key={index}><h6>Answer {index + 1}</h6>{answer}</div>
                            ))}
                        </div>

                        <div className="tag">
                            <h6>Tags</h6>
                            <div className="tags">
                            {question.tags}
                            </div>
                            
                            {/* {question.tags.join(', ')} */}
                            {data.tags}
                        </div>

<div className="reptext">
<textarea
                            name="answer"
                            id="answer"
                            value={newAnswer[question._id]?.answer||""}
                            onChange={(e) => handleInput(e, question._id)}
                            placeholder="Respond if you know the answer"
                        ></textarea>
                        <Button onClick={(e) => handleSubmit(e, question._id, "ans")} className="but">Add Answer</Button>



</div>
                       
                        <div className="comments">
                            {question.comments.map((comment, index) => (
                                <div className="comment" key={index}>
                                    
                                    <h6>Comment {index + 1}</h6>
                                    {comment}

                                    {replies[question._id] && replies[question._id][index] && (
                                        <div className="replies">
                                            {replies[question._id][index].map((reply, replyIndex) => (
                                                <div className="reply" key={replyIndex}><h6>Reply {replyIndex + 1}</h6>{reply.reply}</div>
                                            ))}

                                           
                                        </div>
                                    )}
                                     <div className="reptext">
                                     <textarea
    name="reply"
    value={newreply[question._id]?.[index] || ""}
    onChange={(e) => handleInputReply(e, question._id, index)}
></textarea>                                               <Button onClick={(e)=>handleSubmitReply(e,question._id,index)}>Add Reply</Button>
                                            </div>
                                  
                                </div>
                            ))}
                             
                                   
                        </div>
                        <div className="reptext">
<textarea name="comment"
                            id="comment"
                            value={newComment[question._id]?.comment||""}
                            onChange={(e) => handleInputComment(e, question._id)}
                            placeholder="add Your suggestions"></textarea>

<Button onClick={(e) => handleSubmitComment(e, question._id, "comment")}>Add Comment</Button>

                                    </div>
                       
                    </div>
                ))}
            </div>
        </>
    );
};

export default Question;
