const express = require('express');
const db = require('quick.db');
var router = express.Router();  

router.get('/:token', function(req, res) {
  let tokenIsValid = db.get(req.params.token)
  if(tokenIsValid !== req.params.token) {
    tokenIsValid = false
  } else {
    tokenIsValid = true
  }

  res.json({ message: `Fetched token: ${req.params.token}`, value: tokenIsValid })
});

module.exports = router;