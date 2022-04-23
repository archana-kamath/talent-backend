/*require('dotenv').config();
const express = require('express')
const aws = require('aws-sdk');
const fs = require('fs');
var path = require('path');

const app = express();
app.use(express.json());

var userInfo = require('./routes/userInfo')
var addJobInfo = require('./routes/addJob')
var viewJobInfo = require('./routes/viewJob')
var uploadResume = require('./routes/uploadResume')

  // CORS Headers => Required for cross-origin/ cross-server communication
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
                  'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods',
                  'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  app.use('/', userInfo);
  app.use('/', uploadResume);
  app.use('/', addJobInfo);
  app.use('/', viewJobInfo)

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = app;*/

const express = require("express");
const app = express();

app.get("/test", (_req, res) =>  {
  res.status(200).send("Hello world")
})
module.exports = app;