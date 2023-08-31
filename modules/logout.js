const router=require('express').Router();



router.get('/',(req,res)=>{
    const uid=req.cookies?.uid;
  
  
  res.clearCookie('uid', { domain: 'localhost', path: '/' });
   return res.redirect('/');
})

module.exports=router;