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

router.post('/addJob', function (req, res) {
   
    console.log("Reached the express code to add job")
    console.log(req.body)

    let {
        jobTitle, jobDesc,postedBy,postedOn,company,
        yoe,jobLocation,jobType} = req.body

        console.log(jobTitle)
        console.log(jobDesc)
        console.log(postedBy)
        console.log(postedOn)
        console.log(company)
        console.log(yoe)
        console.log(jobLocation)
        console.log(jobType)

var column_name = "jobTitle,jobDesc,postedBy,postedOn,company,yoe,jobLocation,jobType";
var column_values = "'"+jobTitle+"','"+jobDesc+"','"+postedBy+"','"+postedOn+"','"+company+"','"+yoe+"','"+jobLocation+"','"+jobType+"'";
var sql = "INSERT INTO job ( "+ column_name + " ) VALUES (" + column_values+ ")";

console.log(sql)

        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
});

module.exports = router;