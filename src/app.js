require('dotenv').config();
const express = require('express')
const aws = require('aws-sdk');
const fs = require('fs');
var path = require('path');


const app = express();
app.use(express.json());

var apply = require('../routes/applyToJob')
var userInfo = require('../routes/userInfo')
var addJobInfo = require('../routes/addJob')
var viewJobInfo = require('../routes/viewJob')
var uploadResume = require('../routes/uploadResume')
var fetchUser = require('../routes/fetchUser')

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


  app.use('/', apply);
  app.use('/', userInfo);
  app.use('/', uploadResume);
  app.use('/', addJobInfo);
  app.use('/', viewJobInfo);
  app.use('/', fetchUser);
  
  app.get("/test", (_req, res) =>  {
    res.status(200).send("Hello world")
  })

module.exports = app;