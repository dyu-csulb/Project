const express = require('express');
const router = express.Router();
//const pages = require('./pageRoutes');

/*==================
  Page Routes
===================*/
router.get("/", (req, res) => { 
    res.render("index");
});

router.get("/ManageCustomer", (req, res) => { 
  res.render("manageCustomer");
});

router.get("/AddCustomer", (req, res) => { 
  res.render("addCustomer");
});

router.get("/Reports", (req, res) => { 
  res.render("reports");
});

router.get("/Import", (req, res) => { 
  res.render("import");
});

router.get("/Export", (req, res) => { 
  res.render("export");
});



module.exports = router;