const express = require('express');
const db = require('quick.db');
var router = express.Router();  

router.get('/', function(req, res) {
  let authorization = db.get(`Authorization_${req.query.uuid}_${req.query.authorization}5`)
  
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

  let userHasToken = db.get(`UserHasToken_${userID}`)
  if(userHasToken === true) generatedToken = db.get(`UserToken_${userID}`)

  db.set(generatedToken, generatedToken)
  db.set(`UserToken_${userID}`, generatedToken)
  db.set(`UserHasToken_${userID}`, true)

  res.json({ token: generatedToken })
  db.delete(`Authorization_${req.query.uuid}_${req.query.authorization}5`)
});

module.exports = router;