const express = require("express");
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
app.use('/customer', require('./controller/api/customer'));
app.use('/customer/total', require('./controller/api/customer'));
app.use('/customer/search', require('./controller/api/customer'));
app.use('/products', require('./controller/api/products'));


app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});


/*==================
  Start Express Server
===================*/
app.listen(process.env.PORT || 5200, () => {
    console.log("Server started (http://localhost:5200/)!");
});

  