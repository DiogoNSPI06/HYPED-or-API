const express = require('express');
const db = require('quick.db');
var router = express.Router();

router.get('/register', function(req, res) {
  let type = req.query.type
  let redirect = req.query.redirectTo
  
  if(!req.query.type) type = "normal"
  if(!req.query.redirectTo) redirect = "https://api.hypeds.com/v5/oauth2/login"

  res.sendFile(__dirname + "/html/register.html")
});

router.post('/register', function(req, res) {
  
})

module.exports = router;