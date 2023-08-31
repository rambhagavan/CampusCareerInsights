const router=require('express').Router();
const pool=require('../config/db');

router.post('/',(req,res)=>{
    const name = req.query.name;
    pool.query("select * from internship_info where company_name=?",[name],(err,results)=>{
        if(err){
            throw err;
        }
        console.log(results);
        pool.query("select * from placement_info where company_name=?",[name],(err,result)=>{
            if(err){
                throw err;
            }
           console.log(result);
                return res.render("company_info",{data:results,data1:result});
                
        })
        
    });
  
   
})
module.exports=router;