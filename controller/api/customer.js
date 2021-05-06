const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const dotenv = require('dotenv');
require('dotenv').config()
/*==================
  API Routes
===================*/
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
}
});



// POST /search
router.post("/search", (req, res) => {
  // const obj = [
  //               req.body.cusid,
  //               req.body.cusfname,
  //               req.body.cuslname,
  //               req.body.cusstate,
  //               req.body.cussalesytd,
  //               req.body.cussalesprev
  //             ]
  //const sql = "SELECT cusid, cusfname, cuslname, cusstate, cussalesytd, cussalesprev FROM customer where (cusid=$1 or cusfname ilike $2 or cuslname ilike $3 or cusstate ilike $4 or cussalesytd >= $5 or cussalesprev >= $6);"; 
  //const sql = "SELECT cusid, cusfname, cuslname, cusstate, cussalesytd, cussalesprev FROM customer where cusfname ilike $2;"; 
 // const sql = `SELECT cusid, cusfname, cuslname, cusstate, cussalesytd, cussalesprev FROM customer where (cusid=${req.body.cusid} or cusfname ilike '${req.body.cusfname}%');`; 
 const sql = `SELECT cusid, cusfname, cuslname, cusstate, cussalesytd, cussalesprev FROM customer where 1=1;`; 
  pool.query(sql,[], (err, result) => {
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


router.get("/total", (req, res) => {
  const sql = "SELECT count(*) as Total FROM CUSTOMER";
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