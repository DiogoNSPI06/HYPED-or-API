const express = require('express');
const request = require('https')
const db = require('quick.db');
var router = express.Router();

//https://api.hypeds.com/v7/forms/dashboard
//https://api.hypeds.com/v7/forms/dashboard/forms
//https://api.hypeds.com/v7/forms/dashboard/forms/:formid/:userid
//https://api.hypeds.com/v7/forms/dashboard/create

router.get('/', function(req, res) {
  //VERIFY THE USER
  let token = req.cookies.SessionId
  let userID = db.get(`SessionUser_${token}`)
  let isLogged = db.get(`SessionIsLogged_${token}_${userID}`)

  let UID = db.get(`LGN_SessionUserID_${token}`)

  if(isLogged !== true) return res.redirect(`https://api.hypeds.com/v7/oauth2/login?redirectTo=https://api.hypeds.com/v7/forms/dashboard`)

  let isStaff = db.get(`HPD_User_IsStaff_${UID}`)
  if(!isStaff) isStaff = false

  if(isStaff === false) return res.json({ message: "Error", error: "You are not staff" })

  let avatar = db.get(`HPD_User_Avatar_${UID}`)
  let forms = db.get(`HPD_FORM_FormsID`)
  let userLenght = db.get(`HPD_MailList`)

  let formsLength = forms.length
  let userLength = userLenght.length

  if(!formsLength) formsLength = 0
  if(!userLength) userLength = 0
  
  if(!forms) forms = 0
  if(!userLenght) userLenght = 0

  let lastFormUser = forms[forms.length]
  if(!lastFormUser) lastFormUser = "Nenhum"

  res.render(__dirname + "/views/dash/index.ejs", {
    title: "DASHBOARD",
    avatarURL: avatar,
    formNumber: formsLength,
    userLenght: userLength,
    lastFormID: "Staff",
    lastFormUser: lastFormUser,
  })
})

router.get('/forms', function(req, res) {
  //VERIFY THE USER
  let token = req.cookies.SessionId
  let userID = db.get(`SessionUser_${token}`)
  let isLogged = db.get(`SessionIsLogged_${token}_${userID}`)

  let UID = db.get(`LGN_SessionUserID_${token}`)

  if(isLogged !== true) return res.redirect(`https://api.hypeds.com/v7/oauth2/login?redirectTo=https://api.hypeds.com/v7/forms/dashboard/forms`)

  let isStaff = db.get(`HPD_User_IsStaff_${UID}`)
  if(!isStaff) isStaff = false

  if(isStaff === false) return res.json({ message: "Error", error: "You are not staff" })

  let avatar = db.get(`HPD_User_Avatar_${UID}`)

  let userIdArray = db.get(`HPD_FORM_Users`);
  let idArray = db.get(`HPD_FORM_FormsID`)
  let usernamesArray = db.get(`HPD_FORM_UsersName`)

  userIdArray = JSON.stringify(userIdArray)
  idArray = JSON.stringify(idArray)
  usernamesArray = JSON.stringify(usernamesArray)

  res.render(__dirname + "/views/dash/forms.ejs", {
    title: "FORMULARIOS",
    avatarURL: avatar,
    idArray: idArray,
    usernamesArray: usernamesArray,
    userIdArray: userIdArray,
  })
})

router.get('/forms/:id/:userid', function(req, res) {
  //VERIFY THE USER
  let token = req.cookies.SessionId
  let userID = db.get(`SessionUser_${token}`)
  let isLogged = db.get(`SessionIsLogged_${token}_${userID}`)

  let UID = db.get(`LGN_SessionUserID_${token}`)

  if(isLogged !== true) return res.redirect(`https://api.hypeds.com/v7/oauth2/login?redirectTo=https://api.hypeds.com/v7/forms/dashboard/forms/${req.params.id}/${req.params.userid}`)

  let isStaff = db.get(`HPD_User_IsStaff_${UID}`)
  if(!isStaff) isStaff = false

  if(isStaff === false) return res.json({ message: "Error", error: "You are not staff" })

  let avatar = db.get(`HPD_User_Avatar_${UID}`)

  let userid = req.params.userid
  let formid = req.params.id

  if(formid === "staff") {
    let age = db.get(`HPD_FORM_${formid}_${userid}_Age`)
    let minenick = db.get(`HPD_FORM_${formid}_${userid}_MinecraftNick`)
    let q1 = db.get(`HPD_FORM_${formid}_${userid}_Q1`)
    let q2 = db.get(`HPD_FORM_${formid}_${userid}_Q2`)
    let q3 = db.get(`HPD_FORM_${formid}_${userid}_Q3`)
    let q4 = db.get(`HPD_FORM_${formid}_${userid}_Q4`)
    let q5 = db.get(`HPD_FORM_${formid}_${userid}_Q5`)
    let q6 = db.get(`HPD_FORM_${formid}_${userid}_Q6`)
    let q7 = db.get(`HPD_FORM_${formid}_${userid}_Q7`)
    let q8 = db.get(`HPD_FORM_${formid}_${userid}_Q8`)
    let q9 = db.get(`HPD_FORM_${formid}_${userid}_Q9`) //PC
    let q10 = db.get(`HPD_FORM_${formid}_${userid}_Q10`) //MIC
    let q11 = db.get(`HPD_FORM_${formid}_${userid}_Q11`) //CAN BE ONLINE
    let q12 = db.get(`HPD_FORM_${formid}_${userid}_Q12`) //QNTS HORAS
    let q13 = db.get(`HPD_FORM_${formid}_${userid}_Q13`) //ROLE

    let discordUsername = db.get(`HPD_User_DiscordNickname_${userid}`)
    let nickName = db.get(`HPD_User_Nickname_${userid}`)

    return res.render(__dirname + "/views/dash/formStaff.ejs", {
      title: "FORMULARIO",
      avatarURL: avatar,
      formID: formid,
      userID: userid,
      hpd_username: nickName,
      username: discordUsername,
      minenick: minenick,
      age: age,
      q1: q1,
      q2: q2,
      q3: q3,
      q4: q4,
      q5: q5,
      q6: q6,
      q7: q7,
      q8: q8,
      q9: q9,
      q10: q10,
      q11: q11,
      q12: q12,
      q13: q13,
    })
  }

  if(formid === "member") {
    let age = db.get(`HPD_FORM_${formid}_${userid}_Age`)
    let minenick = db.get(`HPD_FORM_${formid}_${userid}_MinecraftNick`)
    let q1 = db.get(`HPD_FORM_${formid}_${userid}_Q1`)
    let q2 = db.get(`HPD_FORM_${formid}_${userid}_Q2`)
    let q3 = db.get(`HPD_FORM_${formid}_${userid}_Q3`)
    let q4 = db.get(`HPD_FORM_${formid}_${userid}_Q4`)
    let q5 = db.get(`HPD_FORM_${formid}_${userid}_Q5`)
    let q6 = db.get(`HPD_FORM_${formid}_${userid}_Q6`)
    let q7 = db.get(`HPD_FORM_${formid}_${userid}_Q7`)
    let q8 = db.get(`HPD_FORM_${formid}_${userid}_Q8`)
    let q9 = db.get(`HPD_FORM_${formid}_${userid}_Q9`) //PC OR CELL
    let q10 = db.get(`HPD_FORM_${formid}_${userid}_Q10`) //MIC
    let q11 = db.get(`HPD_FORM_${formid}_${userid}_Q11`) //CAN BE ONLINE
    let q12 = db.get(`HPD_FORM_${formid}_${userid}_Q12`) //QNTS HORAS
    let q13 = db.get(`HPD_FORM_${formid}_${userid}_Q13`) //PC SPEC

    let discordUsername = db.get(`HPD_User_DiscordNickname_${userid}`)
    let nickName = db.get(`HPD_User_Nickname_${userid}`)

    return res.render(__dirname + "/views/dash/formMember.ejs", {
      title: "FORMULARIO MEMBRO",
      avatarURL: avatar,
      formID: formid,
      userID: userid,
      hpd_username: nickName,
      username: discordUsername,
      minenick: minenick,
      age: age,
      q1: q1,
      q2: q2,
      q3: q3,
      q4: q4,
      q5: q5,
      q6: q6,
      q7: q7,
      q8: q8,
      q9: q9,
      q10: q10,
      q11: q11,
      q12: q12,
      q13: q13,
    })
  }

  if(formid === "ovos") {
    let age = db.get(`HPD_FORM_${formid}_${userid}_Age`)
    let minenick = db.get(`HPD_FORM_${formid}_${userid}_MinecraftNick`)
    let q1 = db.get(`HPD_FORM_${formid}_${userid}_Q1`)
    let q2 = db.get(`HPD_FORM_${formid}_${userid}_Q2`)
    let q3 = db.get(`HPD_FORM_${formid}_${userid}_Q3`)
    let q4 = db.get(`HPD_FORM_${formid}_${userid}_Q4`)
    let q5 = db.get(`HPD_FORM_${formid}_${userid}_Q5`)
    let q6 = db.get(`HPD_FORM_${formid}_${userid}_Q6`)
    let q7 = db.get(`HPD_FORM_${formid}_${userid}_Q7`)
    let q8 = db.get(`HPD_FORM_${formid}_${userid}_Q8`)
    let q9 = db.get(`HPD_FORM_${formid}_${userid}_Q9`) //PC OR CELL
    let q10 = db.get(`HPD_FORM_${formid}_${userid}_Q10`) //MIC
    let q11 = db.get(`HPD_FORM_${formid}_${userid}_Q11`) //CAN BE ONLINE
    let q12 = db.get(`HPD_FORM_${formid}_${userid}_Q12`) //QNTS HORAS
    let q13 = db.get(`HPD_FORM_${formid}_${userid}_Q13`) //PC SPEC

    let discordUsername = db.get(`HPD_User_DiscordNickname_${userid}`)
    let nickName = db.get(`HPD_User_Nickname_${userid}`)

    return res.render(__dirname + "/views/dash/formOvos.ejs", {
      title: "FORMULARIO MEMBRO",
      avatarURL: avatar,
      formID: formid,
      userID: userid,
      hpd_username: nickName,
      username: discordUsername,
      minenick: minenick,
      age: age,
      q1: q1,
      q2: q2,
      q3: q3,
      q4: q4,
      q5: q5,
      q6: q6,
      q7: q7,
      q8: q8,
      q9: q9,
      q10: q10,
      q11: q11,
      q12: q12,
      q13: q13,
    })
  }
})

router.get('/create', function(req, res) {
  //VERIFY THE USER
  let token = req.cookies.SessionId
  let userID = db.get(`SessionUser_${token}`)
  let isLogged = db.get(`SessionIsLogged_${token}_${userID}`)

  let UID = db.get(`LGN_SessionUserID_${token}`)

  if(isLogged !== true) return res.redirect(`https://api.hypeds.com/v7/oauth2/login?redirectTo=https://api.hypeds.com/v7/payments/product?productID=${productID}`)

  let isStaff = db.get(`HPD_User_IsStaff_${UID}`)
  if(!isStaff) isStaff = false

  if(isStaff === false) return res.json({ message: "Error", error: "You are not staff" })

  res.send({ message: "UNDER DEVELOPMENT" })
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