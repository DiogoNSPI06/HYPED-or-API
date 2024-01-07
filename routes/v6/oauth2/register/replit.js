const express = require('express');
var router = express.Router();  

router.get('/replit', function(req, res) {
  return res.status(200).redirect('https://api.hypeds.com/v6/oauth2/register?type=replit&info')
});

module.exports = router;