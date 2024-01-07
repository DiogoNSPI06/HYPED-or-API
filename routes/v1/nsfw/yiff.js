const express = require('express');

var router = express.Router();  

router.get('/', function(req, res) {
  res.json({ message: "You are requesting yiff!", error: "Cannot request e621" });
});

module.exports = router;