const router=require('express').Router();
const pool=require('../config/db');
const {getuser}=require('../session/setsession')
router.post('/',(req,res)=>{
    const uid=req.cookies.uid;
    const email=getuser(uid).email;
   console.log(email);
    const {hobby,fav_color,fav_game,school_name}=req.body;
   
pool.query("select * from login_info where email=?",[email],(err,result)=>{
   if(err){
    throw err;
    }
   if(!result){
    return res.redirect('/');
   }
   console.log(result);
if(result[0].hobby!=hobby ||result[0].favarite_color!=fav_color ||result[0].favarite_game!=fav_game|| result[0].school_name!=school_name){
 res.send("<form action='/'><h4>Your Answer is wrong </h4><button>Login</button></>");
}
res.render("recoverpassword",{Email:email});
})
    
})

module.exports=router;