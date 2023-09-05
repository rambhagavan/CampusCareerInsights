var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "bemv6qz4yzmcxpmn5oqm-mysql.services.clever-cloud.com",
        user: "uuyztzb0pq2ohgpc",
        password: "aqvb6fdhpjBwEVKlJ3Gk",
        database:"bemv6qz4yzmcxpmn5oqm",
        port:"3306",
        connectionLimit: 10
      });


module.exports=con;