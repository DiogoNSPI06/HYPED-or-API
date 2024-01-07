const express = require('express');
var router = express.Router();  

router.get('/', function(req, res) {
  res.redirect(`https://docs.hypeds.com/`)
});

module.exports = router;