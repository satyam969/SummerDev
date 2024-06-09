const express=require("express");
const authMidleware = require("../middleware/auth-middleware");
const replycontroller=require("../controllers/replies-controller")


const router=express.Router();


router.route("/newreply/:id/:index").post(authMidleware,replycontroller.newreply);


router.route("/allreply/:id/:index").get(replycontroller.getallreply);




module.exports=router;
