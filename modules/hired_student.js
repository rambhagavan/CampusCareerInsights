const router=require('express').Router();
const pool=require('../config/db');

router.post('/',(req,res)=>{
    const page=1;
    const company_name=req.query.company_name;
    pool.query('select * from placed_student p1 join login_info l1 where p1.email=l1.email and company_name=? and p1.placed_category=?',[company_name,"Placement"],(err,result)=>{

        return res.render('hired_student',{data:result,page});
    })
   
})
router.post('/intern',(req,res)=>{
    const page=1;
    const company_name=req.query.company_name;
    pool.query('select * from placed_student p1 join login_info l1 where p1.email=l1.email and company_name=? and p1.placed_category=?',[company_name,"Internship"],(err,result)=>{
   if(err){
    throw err
   }
        return res.render('internstudent',{data:result,page});
    })
   
})
module.exports=router;