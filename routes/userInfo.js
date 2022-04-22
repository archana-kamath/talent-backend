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

router.post('/addUserInfo', function (req, res) {
   
    console.log("Reached the express code")
    console.log(req.body)

    let {
        userFirstName, userLastName,userEmail,userContactNumber,
        userAddress,userDesignation,userEducation,userExperience,
        userSkill,userOther} = req.body

        console.log(userFirstName)
        console.log(userLastName)
        console.log(userEmail)
        console.log(userContactNumber)
        console.log(userAddress)
        console.log(userDesignation)
        console.log(userEducation)
        console.log(userExperience)
        console.log(userSkill)
        console.log(userOther)

var column_name = "userFirstName, userLastName,userEmail,userContactNumber,userAddress,userDesignation,userEducation,userExperience,userSkill,userOther";
var column_values = "'"+userFirstName+"','"+userLastName+"','"+userEmail+"','"+userContactNumber+"','"+userAddress+"','"+userDesignation+"','"+userEducation+"','"+userExperience+"','"+userSkill+"','"+userOther+"'";
var sql = "INSERT INTO user_info ( "+ column_name + " ) VALUES (" + column_values+ ")";

console.log(sql)

        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
});

module.exports = router;