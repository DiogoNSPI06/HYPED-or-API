const express = require('express');
const db = require('quick.db');
var router = express.Router();

router.get('/:username', function(req, res) {
  if(!req.params.username) {
    res.json({ message: "Please provide a Username ID in the params. Visit: https://www.hypeds.com/docs" })
  }
  res.sendFile(__dirname + "./html/logout.html")
  
  let sessionToken = db.get(`CurrentSession_${req.params.username}`)
  
  db.delete(`VerifySession_${sessionToken}`)
  db.delete(`SessionUser_${sessionToken}`)
  
  res.redirect("back")
});

module.exports = router;