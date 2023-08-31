var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database:"placementrecord",
        connectionLimit: 10
      });


module.exports=con;