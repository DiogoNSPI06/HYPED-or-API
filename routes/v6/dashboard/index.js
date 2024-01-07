const express = require('express');
const db = require('quick.db')
var router = express.Router();  

router.get('/', function(req, res) {
  let token = req.cookies.SessionId
  let userID = db.get(`SessionUser_${token}`)
  let isLogged = db.get(`SessionIsLogged_${token}_${userID}`)
  
  if(isLogged !== true) return res.redirect(`https://www.hypeds.com/login?redirectTo=https://api.hypeds.com/v6/dashboard`);

  res.send({ message: "Under development" })
});

module.exports = router;