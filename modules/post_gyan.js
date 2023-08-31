const router=require('express').Router();
const pool=require('../config/db');
const {getuser}=require('../session/setsession');
router.post('/',(req,res)=>{
   const {linkedin_link,job_title,job_location,selection_procedure,prepration_way,experience,advice,tips}=req.body;
   const uid=req.cookies.uid;
   const email=getuser(uid).email;
   pool.query("select * from gyan_review where email=?",[email],(err,results)=>{
      if(err){
          throw err;
      }
      if(results){
      pool.query(
         "UPDATE gyan_review SET link=?, job_title=?, job_location=?, selection_procedure=?, prepration_way=?, experience=?, advice=?, tips=?, email=?",
         [linkedin_link, job_title, job_location, selection_procedure, prepration_way, experience, advice, tips, email],
         (err, result) => {
           if (err) {
            
             console.error(err);
           } else {
             res.send("Your review has been submiited succesfully");
           }
         }
       );
      }
      else{
    pool.query("insert into gyan_review (link,job_title,job_location,selection_procedure,prepration_way,experience,advice,tips,email) values (?,?,?,?,?,?,?,?,?)",[linkedin_link,job_title,job_location,selection_procedure,prepration_way,experience,advice,tips,email],(err,result)=>{
   if(err){
    throw err;
   }
    res.send("Your review has been submiited succesfully");
   })
      }
  })

   
    
})

router.post('/intern',(req,res)=>{
  const {linkedin_link,job_title,job_location,selection_procedure,prepration_way,experience,advice,tips}=req.body;
  const uid=req.cookies.uid;
  const email=getuser(uid).email;
 
   pool.query("insert into gyan_review_intern (link,job_title,job_location,selection_procedure,prepration_way,experience,advice,tips,email) values (?,?,?,?,?,?,?,?,?)",[linkedin_link,job_title,job_location,selection_procedure,prepration_way,experience,advice,tips,email],(err,result)=>{
  if(err){
   throw err;
  }
   res.send("Your review has been submiited succesfully");
  })
     
   
})
module.exports=router;