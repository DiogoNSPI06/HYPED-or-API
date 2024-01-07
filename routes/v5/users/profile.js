const express = require('express');
const request = require('https')
const db = require('quick.db');
var router = express.Router();  

router.get('/:id', function(req, res) {
    
  request.get(`https://v4.hypeds.com/api/users/${req.params.id}`, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      res.send(`<!DOCTYPE html>
<html style="font-size: 16px;">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <meta name="keywords" content="Username, - About Me, XP: x, Money: x">
    <meta name="description" content="">
    <meta name="page_type" content="np-template-header-footer-from-plugin">
    <title>HYPED | Profile</title>
    <link rel="stylesheet" href="https://www.hypeds.com/css/2nicepage.css" media="screen">
    <link rel="shortcut icon" type="image/x-icon" href="https://static.wixstatic.com/media/a926b2_cfc2b507c19546d88a6a2231b832b022%7Emv2.png/v1/fill/w_32%2Ch_32%2Clg_1%2Cusm_0.66_1.00_0.01/a926b2_cfc2b507c19546d88a6a2231b832b022%7Emv2.png">
<link rel="stylesheet" href="https://www.hypeds.com/css/userProfile.css" media="screen">
    <script class="u-script" type="text/javascript" src="https://www.hypeds.com/js/jquery.js" defer=""></script>
    <script class="u-script" type="text/javascript" src="https://www.hypeds.com/js/nicepage.js" defer=""></script>
    <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
    
    
    <script type="application/ld+json">{
		"@context": "http://schema.org",
		"@type": "Organization",
		"name": ""
}</script>
    <meta property="og:title" content="HYPED | ${JSON.parse(data).nickname}">
    <meta property="og:description" content="- ${JSON.parse(data).aboutme}">
    <meta property="og:image" content="${JSON.parse(data).avatarURL}">
    <meta property="og:url" content="https://api.hypeds.com/v5/users/profile/${req.params.id}">
  </head>
  <body class="u-body u-xl-mode">
    <section class="u-align-center u-clearfix u-image u-shading u-section-1" src="" data-image-width="1600" data-image-height="1000" id="sec-4ca7">
      <div class="u-clearfix u-sheet u-sheet-1">
        <div class="u-container-style u-grey-50 u-group u-radius-50 u-shape-round u-group-1">
          <div class="u-container-layout u-container-layout-1">
            <img class="u-image u-image-circle u-preserve-proportions u-image-1" src="${JSON.parse(data).avatarURL}" alt="" data-image-width="1024" data-image-height="1024">
            <h1 class="u-text u-text-default u-text-white u-text-1">${JSON.parse(data).nickname}</h1>
            <h2 class="u-subtitle u-text u-text-default u-text-grey-5 u-text-2">- ${JSON.parse(data).aboutme}</h2>
            <h6 class="u-text u-text-default u-text-4">Followers: ${JSON.parse(data).followersNumber}; &nbsp; &nbsp; Following: ${JSON.parse(data).followingNumber}</h6>
          </div>
        </div>
        <div class="u-container-style u-grey-60 u-group u-radius-20 u-shape-round u-group-2">
          <div class="u-container-layout u-valign-bottom-lg u-valign-bottom-md u-valign-bottom-sm u-valign-bottom-xl u-container-layout-2">
            <h2 class="u-text u-text-5">XP: ${JSON.parse(data).messages * 3}</h2>
          </div>
        </div>
      </div>
    </section>
  </body>
</html>`)
    })
  })
  
});

module.exports = router;