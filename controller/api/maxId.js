const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const dotenv = require('dotenv');
require('dotenv').config();

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
}
});


/*==================
  API Routes
===================*/
router.get("/", (req, res) => {
const sql = "select max(cusid) + 1 as maxid from CUSTOMER";
pool.query(sql, [], (err, result) => {
    var message = "";
    var data = {};
    if(err) {
        message = `Error - ${err.message}`;
    } else {
        message = "success";
        data = result.rows;
    };
    res.json(data);
});
});

module.exports = router;