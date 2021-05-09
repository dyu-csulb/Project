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


router.post("/", (req, res) => {
    const sql = "SELECT * FROM CUSTOMER ORDER BY cusId";
    let filename = [req.body.FileName];
    pool.query(sql, [], (err, result) => {
        var message = "";
        if(err) {
            message = `Error - ${err.message}`;
            res.render("output", { message: message })
        } else {
            var output = "";
            result.rows.forEach(c => {
                output += `${c.cusid},${c.cusfname},${c.cuslname},${c.cusstate},${c.cussalesytd.replace(',','')},${c.cussalesprev.replace(',','')}\r\n`;
            });
            res.header("Content-Type", "text/csv");
            res.attachment("" + filename + "");
            return res.send(output);
        };
    });
  });
  
  module.exports = router;