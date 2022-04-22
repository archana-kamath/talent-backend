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
const dotenv = require("dotenv");
const cors = require("cors");

//Load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(cors());

// Body parser
app.use(express.json());

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

app.get("/", (req, res) => res.send("API Running - CICD"));

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = app;