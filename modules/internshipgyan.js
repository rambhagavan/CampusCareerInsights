const router=require('express').Router();
const pool=require('../config/db');
const {getuser}=require('../session/setsession');
router.post('/',(req,res)=>{
    const email=req.query.email;
    // const company_name=req.query.company_name;
    console.log(email);
    // console.log(company_name);
  pool.query("select * from gyan_review_intern g1 join login_info l1 where g1.email=? and l1.email=?",[email,email],(err,result)=>{
        if(err){
            throw err;
        }
      
        res.render("getplacementgyan",{data:result[0]});
    })
   
})


module.exports=router;