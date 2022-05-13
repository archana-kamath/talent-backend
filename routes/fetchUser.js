var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

router.post('/fetchUser', function (req, res) {
   
    console.log("Reached the express code")
    console.log(req.body)

        let {userEmail} = req.body
        console.log(userEmail)

        var sql = "select * from user_info WHERE userEmail ='"+userEmail+"'";
        console.log(sql)

        let data;
        con.query(sql, function (err, result) {
            console.log("result");
            console.log(result);
            res.status(200).json({
              result
            });

            if (err) throw err;
            console.log("User details fetched");
        });
});

module.exports = router;