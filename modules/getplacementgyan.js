const router=require('express').Router();
const pool=require('../config/db');
const {getuser}=require('../session/setsession');
router.post('/',(req,res)=>{
    // const uid=req.cookies.uid;
    const email=req.query.email;
    console.log(email);
  pool.query("select * from gyan_review g1 join login_info l1 on g1.email=? and l1.email=?",[email,email],(err,result)=>{
        if(err){
            throw err;
        }
      
        res.render("getplacementgyan",{data:result[0]});
    })
   
})
// router.post('/ofcompany',(req,res)=>{
    
//     const email=req.query.email;
//   pool.query("select * from gyan_review g1 join login_info l1 on g1.email=? and l1.email=?",[email,email],(err,results)=>{
//         if(err){
//             throw err;
//         }
       
//         res.render("getplacementgyan1",{data:results[0]});
//     })
   
// })

module.exports=router;