const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const multer = require("multer");
const upload = multer();


const dotenv = require('dotenv');
require('dotenv').config();

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
}
});


const dblib = require('../routes/dblib');


router.post("/",  upload.single('filename'), (req, res) => {
  if(!req.file || Object.keys(req.file).length === 0) {
      message = "Error: Import file not uploaded";
      return res.send(message);
  };
  //Read file line by line, inserting records
  const buffer = req.file.buffer; 
  const lines = buffer.toString().split(/\r?\n/);

;
let numFailed = 0;
let numInserted = 0;
let errorMessage = ""


lines.forEach(line => {
      customer = line.split(",");
      dblib.insertCustomer(customer)
      .then(result => {
          if (result.trans === "fail") {
              numFailed++;
              errorMessage += result.msg + '\n'
              console.log(result.msg)
          } else {
              console.log(result.msg);
              numInserted++;
              console.log(result.msg)
          }
      });
});

  message = "Records Processed: " + lines.length + '\n' + 
  "Records Inserted Successfully: " + numInserted + '\n' +   
  "Records Not Inserted: " + numFailed + '\n' +  '\n' +  
  "Errors: " + '\n' +  errorMessage

  console.log(message);
  res.send(message);
});
  
  module.exports = router;