const router=require('express').Router();
const pool=require('../config/db');
const {getuser}=require("../session/setsession");
router.get('/',(req,res)=>{
   const uid=req.cookies.uid;
   const email=getuser(uid).email;
     pool.query("select * from login_info where email=?",[email],(err,results)=>{
        console.log(results[0]);
        pool.query("select * from profile_photo where email=?",[email],(err,result)=>{
         let photo_link=result[0].profile_photo_link ;
         if(!photo_link){
            photo_link="upload photo"
         }
         res.render("userprofile",{user:results,photo_link:photo_link});
        })
    
     })
    
});

module.exports=router;