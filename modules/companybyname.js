const router=require('express').Router();
const pool=require('../config/db');

router.post('/',(req,res)=>{
const company_name=req.body.company_name;
  pool.query('select * from company_info where company_name=?',[company_name],(err,result)=>{
    
    res.render('profile',{data:result,page:1});
  })
   
})
module.exports=router;