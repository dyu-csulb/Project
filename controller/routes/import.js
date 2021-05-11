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

const repo = require('../../repository/repo');

router.post("/",  upload.single('filename'), async (req, res) => {
  if(!req.file || Object.keys(req.file).length === 0) {
      message = "Error: Import file not uploaded";
      return res.send(message);
  };
  //Read file line by line, inserting records
  const buffer = req.file.buffer; 
  const lines = buffer.toString().split(/\r?\n/);

  await repo.insertCustomer(lines)
  .then(result => {
    res.send(message);
  });

});
  
  module.exports = router;