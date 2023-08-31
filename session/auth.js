const {getuser}=require('./setsession');
const cookieParser = require('cookie-parser')

async function restricttologin(req,res,next){
    const uuid=req.cookies.uid;
    if(!uuid){
        return res.redirect("/");
    }

    const email=getuser(uuid);
   if(!email){
    return res.redirect("/");
   }
   req.email=email;
   next();
}

module.exports=restricttologin;