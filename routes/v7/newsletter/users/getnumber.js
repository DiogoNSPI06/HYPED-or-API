const express = require('express');
const db = require('quick.db')
var router = express.Router();  

router.get('/', function(req, res) {
  let number = db.get(`NewsLetter_Users_Size`)
  
  res.json({ message: "Success", number: number })
});

module.exports = router;