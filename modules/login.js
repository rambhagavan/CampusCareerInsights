const router = require("express").Router();
const pool = require('../config/db'); 
const {v4:uuid}=require('uuid');
const {setuser,getuser}=require('../session/setsession');
router.post('/', async (req, res) => {
  
  try {
    const email = req.body.email;

    pool.query("SELECT * FROM login_info WHERE email=?", [email], async (err, result, fields) =>{
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error occurred while querying the database.' });
      }

     
      if (result.length === 0) {
        return res.render('index'); 
      }

      const user_info = result[0];
     
      if (user_info.email !== req.body.email || user_info.password !== req.body.password) {
        return res.render('index'); 
      }
      const token=setuser(user_info.email);
      res.cookie("uid",token);
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
       console.log(results);
          res.render('profile',{ data: results, page, currentPage: page });
        });
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
