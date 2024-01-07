const express = require('express');
const db = require('quick.db');
var router = express.Router();  

router.get('/replit', function(req, res) {
  res.json({ message: 'Oh, looks like you are trying to use our api, follow the link below to read the docs: https://www.hypeds.com/docs', note: "Api under development. Please wait until launch." });
});

router.get('/', function(req, res) {
  let redirect = req.query.redirectTo
  if(!redirect) redirect = "https://www.hypeds.com/login"

  let token = req.cookies.SessionId
  let userID = db.get(`SessionUser_${token}`)
  db.set(`SessionIsLogged_${token}_${userID}`, false)
  res.setHeader('set-cookie', 'SessionId=; max-age=0');

  res.redirect(redirect);
});

module.exports = router;