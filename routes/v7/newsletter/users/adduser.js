const express = require('express');
const db = require('quick.db');
var router = express.Router();

router.get('/', function(req, res) {
  if(!req.query.email) return res.json({ error: "You need to provide an email." })
  
  let email = req.query.email
  if(db.get(`NewsLetter_Email_${email}`)) return res.json({ error: "This email is already registered." })
  db.add(`NewsLetter_Users_Size`, 1)

  let idDef = db.get(`NewsLetter_Users_Size`)
  db.set(`NewsLetter_User_${idDef}`, email)
  db.set(`NewsLetter_Email_${email}`, idDef)
  
  res.json({ message: "Successfully added user." })
});

//Generate random id
function GenId(maxWords, onlyNumbers, isToken, compact) {
    if(!maxWords) maxWords = 2
    if(onlyNumbers === true) {
      let random = '';
      let dict = '1234567890'
      for(var i = 0; i < maxWords; i++) {
        random = random + dict.charAt(Math.floor(Math.random() * dict.length));
      }

      return random;
    } else {
      if(isToken === true) {
        let random = '';
        let dict = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXZ'
        for(var i = 0; i < maxWords; i++) {
          random = random + dict.charAt(Math.floor(Math.random() * dict.length));
        }

        return "Nzal" + random;
      } else {
        if(compact === true) {
          let random = '';
          let dict = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXZ'
          for(var i = 0; i < 6; i++) {
           random = random + dict.charAt(Math.floor(Math.random() * dict.length));
          }

          return random;
         } else {
          let random = '';
          let dict = '1234567890abcdefghijklmnopqrstuvwxyz'
          for(var i = 0; i < maxWords; i++) {
           random = random + dict.charAt(Math.floor(Math.random() * dict.length));
          }

          return random;
        }
      }
    }
}

module.exports = router;