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

  router.post("/apply", function(req, res){

    console.log("Reached the express code")
    console.log(req.body)
    
    let{userid, jobid, appliedOn} = req.body;
    var jobApplyStatus= false, message="Not Applied";
    
    try {
        let applyToJob = {
            userid : userid,
            jobid: jobid,
            appliedOn : appliedOn
        };
        console.log(applyToJob);
        let result = con.query("INSERT INTO applyJob(userid, jobid, appliedOn) VALUES (?, ?, ?)",
            [userid, jobid, appliedOn])
            console.log(result);
            applicationStatus = true
            message = "Applied" 
    } catch(e) {
        console.log(e);
        applicationStatus = false;
    } finally{
        res.status(200).json({
            status:applicationStatus,
            message: message
        });
        console.log(message);
    }
  });


module.exports = router;