const router=require('express').Router();
const {getuser}=require('../session/setsession');


router.get('/',(req,res)=>{
   const uid=req.cookies.uid;
   const email=getuser(uid).email;
res.render("changepassword",{Email:email});
})
module.exports=router;