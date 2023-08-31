const jwt=require('jsonwebtoken');

const hashmap=new Map();
const secret="%Rambh6299@$";
function setuser(email){
  const payload={
    email:email,
  }
  return jwt.sign(payload,secret);
}
function getuser(uuid){
return jwt.verify(uuid,secret);
}
function deleteuser(res,uid){
  document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

module.exports={setuser,getuser,deleteuser};