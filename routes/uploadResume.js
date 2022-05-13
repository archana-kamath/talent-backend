var express = require('express');
var router = express.Router();
var aws      =require('aws-sdk');
var fs = require('fs-extra');
const fileUpload = require('express-fileupload');

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

function deleteFileTemp(path) {
  try {
    fs.unlinkSync(path)
  } catch (err) {
    console.error("Error in deleting temp file " + path, err);
  }
}

bodyParser = require('body-parser');

const ID = process.env.ID;
const SECRET = process.env.SECRET;
const BUCKETNAME = process.env.BUCKETNAME;

const s3 = new aws.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});

router.post('/uploadResume', function (req, res) {
  console.log("Reached Node - user upload");
 
  console.log(req.files);
  console.log(req.body);

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  let {fileName} = req.body;
  let dateUploaded = new Date().toLocaleString()
  const fileContent = fs.createReadStream(req.files.file.tempFilePath);

  console.log("My filename "+fileName)
  console.log("My userEmail "+userEmail)
  console.log("My trip "+dateUploaded)
  console.log("tempFilePath:" + req.files.file.tempFilePath)
  console.log("EventId:" + req.body.eventId)
  console.log("mimetype: " + req.files.file.mimetype)

//  var userOnly =  userEmail.split("@");
  var keyPath = req.files.file.name//userOnly[0]+"/"+req.files.file.name

  console.log("keyPath "+keyPath);

  const params = {
    Bucket: BUCKETNAME,
    Key: keyPath,
    ContentType: req.files.file.mimetype,
    Body: fileContent
  };

  s3.upload(params, function (err, data) {
    if (err) {
      console.log("Error in uploading file", err);
      return res.status(500).send(`Can not upload the file. ${err}`)
  
    } else {
      deleteFileTemp(req.files.file.tempFilePath);
      console.log(`File uploaded successfully. ${data.Location}`);

      return res.status(200).send(`File uploaded successfully. ${data.Location}`)
    }
  });

//  Update database with resume link
  /*var link ="https:talent-traces-userfile.s3.us-west-2.amazonaws.com/"+keyPath;
  var sql = "UPDATE user_info SET resumeLink = '" + link+ "' WHERE userEmail ='"+userEmail+"'";
  console.log(link)
  console.log(sql)

  con.query(sql, function (err, result) {
    if (err) throw err;
      console.log("User resume link added to database");
  });*/
});


router.use(bodyParser.json());

module.exports = router;