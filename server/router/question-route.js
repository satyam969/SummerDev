const express=require("express");
const questioncontroller = require("../controllers/question-controller");
const authMidleware = require("../middleware/auth-middleware");
const router=express.Router();


router.route('/newquestion').post(authMidleware,questioncontroller.createquestion)

router.route('/newans/:id').post(authMidleware,questioncontroller.handleAnswer);

router.route('/newcomment/:id').post(authMidleware,questioncontroller.handleComment);


router.route('/getallquestions').get(questioncontroller.getallQuestion);
router.route('/getallquestions/:id').get(questioncontroller.getsingleQuestion);


router.route('/:id/answer/:answerIndex').put(authMidleware,questioncontroller.updateAnswer);

router.route('/:id/comment/:commentIndex').put(authMidleware,questioncontroller.updateComment);

router.route('/:id/answerdelete/:answerIndex').delete(authMidleware,questioncontroller.deleteAnswer);

router.route('/:id/commentdelete/:commentIndex').delete(authMidleware,questioncontroller.deleteComment);


module.exports=router;