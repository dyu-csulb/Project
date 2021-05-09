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
router.post("/", (req, res) => {
    const param = [req.body.cusid, req.body.cusfname, req.body.cuslname, req.body.cusstate, req.body.cussalesytd, req.body.cussalesprev]
    const sql = "INSERT INTO CUSTOMER (cusId, cusFname, cusLname, cusState, cusSalesYTD, cusSalesPrev) values ($1,$2,$3,$4,$5,$6)"
    pool.query(sql,param, (err, result) => {
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
