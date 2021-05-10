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
app.use('/Export', require('./controller/routes/pageRoutes'));
app.use('/Import', require('./controller/routes/pageRoutes'));

/*==================
  API Routes
===================*/
app.use('/api/search', require('./controller/api/search'));
app.use('/api/total', require('./controller/api/total'));
app.use('/api/delete', require('./controller/api/delete'));
app.use('/api/update', require('./controller/api/update'));
app.use('/api/add', require('./controller/api/add'));
app.use('/api/maxId', require('./controller/api/maxId'));

/*==================
  Import/Export .csv file
===================*/
app.use('/ExportFile', require('./controller/routes/export'));
app.use('/ImportFile', require('./controller/routes/import'));


app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});


/*==================
  Start Express Server
===================*/
app.listen(process.env.PORT || 5200, () => {
  console.log("Server started (http://localhost:5200/)!");
});

 