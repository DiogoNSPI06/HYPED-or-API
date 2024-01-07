const express = require('express');
var router = express.Router();  

router.get('/', function(req, res) {
  res.json({ version: "v7.6.3" });
});

module.exports = router;