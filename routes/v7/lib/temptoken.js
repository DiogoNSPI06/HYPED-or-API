const express = require('express');
const db = require('quick.db');
var router = express.Router();  

let config = require('./config.json')

router.get('/:apitoken/:sessid', function(req, res) {
  let token = req.params.apitoken
  if(token !== config.API.secToken) return res.send({ message: "Invalid token" })
  console.log(config.API.secToken)

  let sessid = req.params.sessid
  if(!sessid) return res.send({ message: "Invalid Session ID" })

  let userID = db.get(`SessionUser_${sessid}`)
  if(db.get(`SessionIsLogged_${sessid}_${userID}`) === null || false) return res.send({ message: "User no logged" })

  let UID = db.get(`LGN_SessionUserID_${sessid}`)
  if(!UID) return res.send({ message: "NO ID" })

  let temptoken = GenId(24, false, true, false)

  db.set(`TEMPTOKEN_LIB_${UID}`, temptoken)

  res.send({ message: "Success", tempToken: temptoken })
});

module.exports = router;

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