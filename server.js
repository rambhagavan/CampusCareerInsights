const express=require('express');
const ejs=require('ejs');
const pool=require('./config/db.js');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const {v4:uid}=require("uuid");
const auth=require('./session/auth.js');
const auth1=require('./session/auth2');
const {setuser,getuser}=require('./session/setsession');
const cloudinary = require('cloudinary').v2;
const multer=require('multer');
const { Readable } = require('stream');
const app=express();
app.use(cookieParser());
app.set('view engine','ejs');
app.use(express.json());
app.use(
    bodyParser.urlencoded({
      extended: false,
    })
  );
  app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));
cloudinary.config({
  cloud_name: 'dljonzgev',
  api_key: '178891974785269',
  api_secret: 'KkGE6nJ1IWa2TX28ha_sp-PWaSM'
});
pool.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
app.get('/',(req,res)=>{
    res.render('index');
})
app.get('/login',auth,(req,res)=>{
  try {
    const email = req.body.email;

    pool.query("SELECT * FROM login_info WHERE email=?", [email], function (err, result, fields) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error occurred while querying the database.' });
      }

      const user_info = result[0];

      const page = parseInt(req.query.page) || 1; 
      const limit = 5; 
      const offset = (page - 1) * limit;

      const query = 'SELECT * FROM company_info LIMIT ? OFFSET ?';
      pool.query(query, [limit, offset], (err, results) => {
        if (err) {
          console.error('Error executing MySQL query:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

       
        const countQuery = 'SELECT COUNT(*) as total FROM company_info';
        pool.query(countQuery, (countErr, countResults) => {
          if (countErr) {
            console.error('Error executing MySQL query:', countErr);
            return res.status(500).json({ error: 'Internal Server Error' });
          }

          const totalTuples = countResults[0].total;
          const totalPages = Math.ceil(totalTuples / limit);
       
          res.render('profile',{ data: results, page, currentPage: page });
        });
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
})
app.get('/forget',(req,res)=>{
  res.render("forgetpassword");
});
app.post('/authenticateemail',(req,res)=>{
const email=req.body.email;
pool.query('select * from login_info where email=?',[email],(err,result)=>{
  if(err){
    throw err;
  }
  if(!result[0]){
    return res.redirect('/');
  }
  const uuid=uid();
  
  const token=setuser(email);
  res.cookie("uid",token);  
  res.render('getsecurityques');
})
  
});
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.post('/upload', upload.single('profilePhoto'), async (req, res) => {
  
  try {
    if (!req.file) {
      return res.status(400).send('No profile photo uploaded');
    }
  
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'profile-photos', transformation: [{ width: 150, height: 150, crop: 'thumb' }] },
      (error, result) => {
        if (error) {
          console.error('Error uploading profile photo:', error);
          return res.status(500).send('Error uploading profile photo');
        }
  
        const profilePhotoUrl = result.secure_url;
        const uid = req.cookies.uid;
        
        // Assuming getuser is an asynchronous function that returns a promise
        const email=getuser(uid).email
          console.log(profilePhotoUrl);
           
            const query = `
              INSERT INTO profile_photo (email, profile_photo_link)
              VALUES (?, ?)
              ON DUPLICATE KEY UPDATE
                profile_photo_link = ?
            `;
            pool.query(query, [email, profilePhotoUrl, profilePhotoUrl], (err, result) => {
              if (err) {
                throw err;
              }
              pool.query("select * from login_info where email=?",[email],(err,results)=>{
                if(err){
                  throw err;
                }
                res.render("userprofile",{user:results,photo_link:profilePhotoUrl});
              })
              
            });
         
          
         
      }
    );
  
    // Convert the Buffer to a Readable Stream
    const bufferStream = new Readable();
    bufferStream.push(req.file.buffer);
    bufferStream.push(null);
  
    bufferStream.pipe(stream);
  } catch (error) {
    console.error('Error uploading profile photo:', error);
    res.status(500).send('Error uploading profile photo');
  }
  
});
app.use('/login',require('./modules/login.js'));
app.use('/home',auth1,require('./modules/home.js'))
app.use('/company_info',auth,require('./modules/company_info.js'));
app.use('/profile',auth,require('./modules/profile.js'));
app.use('/Gyan_review',auth,require('./modules/gyanreview.js'));
app.use('/change_password',auth,require('./modules/changepassword.js'));
app.use('/get_student_review',auth,require('./modules/get_student_review.js'));
app.use('/update_password',auth,require('./modules/update_password.js'));
app.use('/logout',auth,require('./modules/logout.js'));
app.use('/post_gyan',auth,require("./modules/post_gyan"));
app.use('/placed_student',auth,require('./modules/placed_student.js'));
app.use('/placementgyan',auth,require('./modules/getplacementgyan.js'));
app.use('/getinternship',auth,require('./modules/internshipgyan.js'));
app.use('/hired_student',auth,require('./modules/hired_student.js'));
app.use('/companybyname',auth,require('./modules/companybyname'));
app.use('/authenticateanswer',auth1,require('./modules/authenticateforgot'));
app.use('/recover_password',auth1,require('./modules/recoverpass'));
app.use('/internstudent',auth,require('./modules/internstudent.js'));
app.listen(3000,()=>{
    console.log("server is running on port 3000");
})
