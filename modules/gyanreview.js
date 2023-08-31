const router=require('express').Router();
const {getuser}=require("../session/setsession");
const pool=require("../config/db");
router.get('/',(req,res)=>{
const uid=req.cookies.uid;
const email=getuser(uid).email;

pool.query("select * from placed_student where email=?",[email],(err,result)=>{
    if(err){
        throw err;
    }
    
    // if (result.length === 0) {
    //     console.log(result);
    //     return res.status(400).send("You are not placed yet, you can not fill the Gyan_review. All the best");
    //  }
    
//    res.render('placementgyan');
  res.render('optgyan');

})
   
})
module.exports=router;