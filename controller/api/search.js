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

  let whereCondition =' where 1=1';

  if (cusid !='') {
    whereCondition +=' and cusid=' + cusid
  }
  if (cusfname !='') {
    whereCondition +=" and cusfname ilike '" + cusfname + "%'"
  }
  if (cuslname !='') {
    whereCondition +=" and cuslname ilike '" + cuslname + "%'"
  }
  if (cusstate !='') {
    whereCondition +=" and cusstate ilike '" + cusstate + "%'"
  }
  if (cussalesytd !='') {
    whereCondition +=" and cussalesytd >='" + cussalesytd +"'"
  }
  if (cussalesprev !='') {
    whereCondition +=" and cussalesprev >='" + cussalesprev +"'"
  }

  const sql = "SELECT cusid, cusfname, cuslname, cusstate, cussalesytd, cussalesprev FROM customer" + whereCondition + " order by 1"; 
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

module.exports = router;