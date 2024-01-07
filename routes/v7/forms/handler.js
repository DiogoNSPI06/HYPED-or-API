const express = require('express');
const request = require('https')
const db = require('quick.db');
var router = express.Router();

//https://api.hypeds.com/v7/forms/view/:id

router.get('/:id', function(req, res) {
  //VERIFY THE USER
  let token = req.cookies.SessionId
  let userID = db.get(`SessionUser_${token}`)
  let isLogged = db.get(`SessionIsLogged_${token}_${userID}`)

  let UID = db.get(`LGN_SessionUserID_${token}`)

  if(isLogged !== true) return res.redirect(`https://api.hypeds.com/v7/oauth2/login?redirectTo=https://api.hypeds.com/v7/forms/view/${req.params.id}`)

  if(req.query.sent === "true") {
    return res.render(__dirname + '/views/sent.ejs', {
      title: "FORMULARIO ENVIADO"
    })
  }

  if(req.params.id === "create") {
    return res.redirect('https://api.hypeds.com/v7/forms/dashboard/create')
  }

  if(req.params.id === "staff") {
    return res.render(__dirname + "/views/staffForm.ejs", {
      title: "STAFF FORM",
      username: db.get(`HPD_User_Nickname_${UID}`),
      id: req.params.id,
      userid: UID
    })
  }

  if(req.params.id === "member") {
    return res.render(__dirname + "/views/memberForm.ejs", {
      title: "MEMBER FORM",
      username: db.get(`HPD_User_Nickname_${UID}`),
      id: req.params.id,
      userid: UID
    })
  }

  if(req.params.id === "ovos") {
    return res.render(__dirname + "/views/ovosForm.ejs", {
      title: "OVOS FORM",
      username: db.get(`HPD_User_Nickname_${UID}`),
      id: req.params.id,
      userid: UID
    })
  }

  res.render(__dirname + '/views/publicForm.ejs', {
    title: "FORMULARIO",
  })
})

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