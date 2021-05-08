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
    let cusid = req.body.cusid;
    let cusfname = req.body.cusfname;
    let cuslname = req.body.cuslname;
    let cusstate = req.body.cusstate;
    let cussalesytd = req.body.cussalesytd;
    let cussalesprev = req.body.cussalesprev;
    //const sql = "UPDATE CUSTOMER SET cusfname='" + cusfname + "',cuslname='"+ cuslname +"',cusstate='"+ cusstate + "' WHERE cusid=" + cusid +";"
    const sql = "UPDATE CUSTOMER SET cusfname='" + cusfname + "',cuslname='"+ cuslname +"',cusstate='"+ cusstate + "',cussalesytd='"+ cussalesytd + "',cussalesprev='"+ cussalesprev + "' WHERE cusid=" + cusid +";"
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
        console.log(sql);
    });
    });
    
    module.exports = router;
