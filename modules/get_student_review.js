const router=require('express').Router();
const {getuser}=require("../session/setsession");
const pool=require("../config/db");
router.get('/',(req,res)=>{
const uid=req.cookies.uid;
const email=getuser(uid).email;

pool.query("select * from placed_student where email=? and placed_category=?",[email,"Placement"],(err,result)=>{
    if(err){
        throw err;
    }
    
    if (result.length === 0) {
        return res.status(400).send("You are not placed yet, you can not fill the Gyan_review. ");
     }
    
   res.render('placementgyan',{category:"Placement"});
 

})
   
})
router.get('/intern',(req,res)=>{
    const uid=req.cookies.uid;
const email=getuser(uid).email;

pool.query("select * from placed_student where email=? and placed_category=?",[email,"Internship"],(err,result)=>{
    if(err){
        throw err;
    }
    
    if (result.length === 0) {
        console.log(result);
        return res.status(400).send("You do not got intern yet, you can not fill the Gyan_review. All the best");
     }
    
   res.render('placementgyan1',{category:"Internship"});
 

})
   
})
module.exports=router;