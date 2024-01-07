const express = require('express');
const db = require('quick.db');
var router = express.Router();  

router.get('/:id', function(req, res) {
  if(!req.params.id) {
    return res.json({ message: "Please provide a Site ID in the params. Visit: https://www.hypeds.com/docs" })
  }
  if(!req.query.redirectTo) {
    return res.json({ message: "Please provide a redirect URL in the query. Visit: https://www.hypeds.com/docs" })
  }

  db.set(`SiteRedirect_${req.params.id}`, req.query.redirectTo)
  res.sendFile(__dirname + "/html/login.html")
});

router.post('/:id', function(req, res) {
  let random = '';
  let dict = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXZ'
  for(var i = 0; i < 10; i++) {
    random = random + dict.charAt(Math.floor(Math.random() * dict.length));
  }
  let sessionToken = `NzST${random}`

  let accountPassword = db.get(`Account_password_${req.body.username}`)
  let redirectURL = db.get(`SiteRedirect_${req.params.id}`)

  if(accountPassword === req.body.password) {
    res.setHeader(`Set-Cookie`, `SessionId=${sessionToken}; Domain=.hypeds.com; Path=/`)
    db.set(`VerifySession_${sessionToken}`, sessionToken)
    db.set(`SessionUser_${sessionToken}`, req.body.username)
    db.set(`CurrentSession_${req.body.username}`, sessionToken)

    res.redirect(`${redirectURL}?username=${req.body.username}`)//?username=${req.body.username}&sessionLogin=${sessionToken}
    db.delete(`SiteRedirect_${req.params.id}`)
  } else {
    res.sendFile(__dirname + '/html/failedLogin.html')
  }
});

module.exports = router;