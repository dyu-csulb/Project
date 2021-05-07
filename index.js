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

app.use('/search', require('./controller/api/search'));
app.use('/total', require('./controller/api/total'));

// const { Pool } = require('pg');
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
// }
// });

/*==================
  Start Express Server
===================*/
app.listen(process.env.PORT || 5200, () => {
  console.log("Server started (http://localhost:5200/)!");
});



// /*==================
//   API Routes
// ===================*/
// app.post("/search", (req, res) => {
//  const sql = "SELECT cusid, cusfname, cuslname, cusstate, cussalesytd, cussalesprev FROM customer"; 
//   pool.query(sql,[], (err, result) => {
//     var message = "";
//     var data = {};
//     if(err) {
//       message = `Error - ${err.message}`;
//     } else {
//         message = "success";
//         data = result.rows;
//     };
//     res.json(data);
//   });
// });


// app.get("/total", (req, res) => {
//   const sql = "SELECT count(*) as Total FROM CUSTOMER";
//   pool.query(sql, [], (err, result) => {
//       var message = "";
//       var data = {};
//       if(err) {
//           message = `Error - ${err.message}`;
//       } else {
//           message = "success";
//           data = result.rows;
//       };
//       res.json(data);
//   });
// });


// app.use(function(req, res) {
//   res.status(404).send({url: req.originalUrl + ' not found'})
// });

/*==================================================================
  Enable CORS (see https://enable-cors.org/server_expressjs.html)
===================================================================*/
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

