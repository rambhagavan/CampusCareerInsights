const router=require('express').Router();
const pool=require('../config/db');

router.get('/',(req,res)=>{
const year=2023;
const page = parseInt(req.query.page) || 1;
const limit=6;
const offset = (page - 1) * limit;
console.log(req.body);
pool.query("select * from placed_student as p1 join login_info l1 where p1.email=l1.email and p1.placed_year=? limit ? offset ?",[year,limit,offset],(err,result)=>{
    if(err){
        throw err;
    }
    res.render('placed_student',{data:result,page});
})

    
});

router.post('/',(req,res)=>{
    const year=req.body.year ||2023;
    console.log(req.body);
    const page = parseInt(req.query.page) || 1;
const limit=6;
const offset = (page - 1) * limit;
pool.query("select * from placed_student as p1 join login_info l1 where p1.email=l1.email and p1.placed_year=? limit ? offset ?",[year,limit,offset],(err,result)=>{
    if(err){
        throw err;
    }
    res.render('placed_student',{data:result,page});
})

})
module.exports=router;