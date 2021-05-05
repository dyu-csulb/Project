const express = require('express');
const router = express.Router();

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


router.get("/", (req, res) => {
  const sql = "SELECT * FROM PRODUCT ORDER BY PROD_ID";
  pool.query(sql, [], (err, result) => {
      var message = "";
      var model = {};
      if(err) {
          message = `Error - ${err.message}`;
      } else {
          message = "success";
          model = result.rows;
      };
      res.json(model);
  });
});


module.exports = router;