const router=require('express').Router();
const pool=require('../config/db');

router.post('/', (req, res) => {
    const email = req.body.Email;
    const newPassword = req.body.new_password;
    const currentPassword = req.body.current_password;

    pool.query("SELECT * FROM login_info WHERE email=?", [email], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("An error occurred while processing your request.");
        }

        if (result.length === 0) {
            return res.status(404).send("Email not found.");
        }

        

        if (newPassword !== req.body.new1_password) {
            return res.status(400).send("Password and Confirm Password must be the same.");
        }

        if (newPassword.length < 10) {
            return res.status(400).send("Password must contain at least 10 characters.");
        }

       
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
        if (!passwordPattern.test(newPassword)) {
            return res.status(400).send("Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character.");
        }
        pool.query("UPDATE login_info SET password = ? WHERE email = ?", [newPassword, email], (updateErr, updateResult) => {
            if (updateErr) {
                console.error(updateErr);
                return res.status(500).send("An error occurred while updating the password.");
            }

            return res.send("<p>Password successfully updated.</p><a href='/'>click to login</a>");
        });
        

        
    });
});

module.exports = router;
