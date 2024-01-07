const express = require('express');
const db = require('quick.db');
var router = express.Router();  

router.get('/', function(req, res) {
  let authorization = db.get(`Authorization_${req.query.uuid}_${req.query.authorization}7`)
  
  if(!authorization) {
    return res.json({ token: "INVALID TOKEN PROVIDED" })
  } 
  let userID = db.get(`HPD_User_Nickname_${req.query.uuid}`)
  if(!userID) {
    return res.json({ token: "INVALID USERID PROVIDED" })
  }

  let random = '';
  let dict = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  for(var i = 0; i < 14; i++) {
    random = random + dict.charAt(Math.floor(Math.random() * dict.length));
  }

  let generatedToken = `Nzal${random}621`

  let userHasToken = db.get(`v7_UserHasToken_${userID}`)
  if(userHasToken === true) generatedToken = db.get(`v7_UserToken_${userID}`)

  db.set("v7_" + generatedToken, generatedToken)
  db.set(`v7_UserToken_${userID}`, generatedToken)
  db.set(`v7_UserHasToken_${userID}`, true)

  res.json({ token: generatedToken })
  db.delete(`Authorization_${req.query.uuid}_${req.query.authorization}7`)
});

module.exports = router;