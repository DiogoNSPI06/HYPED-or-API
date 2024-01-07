const express = require('express');
const db = require('quick.db');
var router = express.Router();  

router.get('/:uuid', function(req, res) {
  res.sendFile('/home/runner/HYPED-or-API/routes/v5/login_sys/html/logout.html')
  db.delete(`SessionToken_${req.cookies.SessionId}`)
  db.delete(`SessionIsLogged_${req.cookies.SessionId}_${req.body.uuid}`)
  req.session = null;
  res.redirect('back')
});

module.exports = router;