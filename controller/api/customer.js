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


// router.get("/", (req, res) => {
//   const sql = "SELECT * FROM CUSTOMER ORDER BY cusFname";
//   pool.query(sql, [], (err, result) => {
//       var message = "";
//       var model = {};
//       if(err) {
//           message = `Error - ${err.message}`;
//       } else {
//           message = "success";
//           model = result.rows;
//       };
//       res.json(model);
//   });
// });


// POST /search
router.post("/search",  (req, res) => {
  const sql = "SELECT cusid, cusfname, cuslname, cusstate, cussalesytd, cussalesprev FROM customer where cusstate='CA';";
  //const book = [req.body.Title, req.body.Author, req.body.Comments];
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