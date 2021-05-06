const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const dotenv = require('dotenv');
require('dotenv').config()

const path = require("path");
const app = express();

/*==================
  Server configuration
===================*/
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'))
app.use('/css',express.static(__dirname + 'public/css'))
app.use('/js',express.static(__dirname + 'public/js'))
app.use(express.urlencoded({ extended: false }));

/*==================
  Page Routes
===================*/
app.use('/', require('./controller/routes/pageRoutes'));
app.use('/ManageCustomer', require('./controller/routes/pageRoutes'));
app.use('/AddCustomer', require('./controller/routes/pageRoutes'));
app.use('/Reports', require('./controller/routes/pageRoutes'));
app.use('/Import', require('./controller/routes/pageRoutes'));
app.use('/Export', require('./controller/routes/pageRoutes'));

/*==================
  API Routes
===================*/
// app.use('/customer', require('./controller/api/customer'));
// app.use('/customer/total', require('./controller/api/customer'));
// app.use('/customer/search', require('./controller/api/customer'));
// app.use('/products', require('./controller/api/products'));

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
}
});


// POST /search
app.post("/search", (req, res) => {
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
 const sql = "SELECT cusid, cusfname, cuslname, cusstate, cussalesytd, cussalesprev FROM customer"; 
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


app.get("/total", (req, res) => {
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


app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

// Enable CORS (see https://enable-cors.org/server_expressjs.html)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


/*==================
  Start Express Server
===================*/
app.listen(process.env.PORT || 5200, () => {
    console.log("Server started (http://localhost:5200/)!");
});

  