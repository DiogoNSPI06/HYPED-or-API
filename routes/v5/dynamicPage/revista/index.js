const express = require('express');
const db = require('quick.db');
var router = express.Router();

router.get('/', (req, res) => {
  if(!req.query.page && !req.query.settings) return res.redirect('https://api.hypeds.com/v5/dynamicPage/revista?settings=next&page=0');
  let imageURL = db.get('RevistaEscola')
  let page = req.query.page
  page = ~~page;
  if(!page) page = 0
  if(req.query.settings === "next") {
    page = page += 1
  }
  if(req.query.settings === "prev") {
    page = page -= 1
  }
  if(page < 0) page = 0
  if(page > 16) page = 16
  
  res.send(`<!DOCTYPE html>
<html style="font-size: 16px;" lang="en"><head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <meta name="keywords" content="REVISTA DRUMMOND">
    <meta name="description" content="">
    <title>HYPED | Revista</title>
    <link rel="stylesheet" href="https://www.hypeds.com/css/HypedLibv4.css" media="screen">
<link rel="stylesheet" href="https://www.hypeds.com/css/Revista.css" media="screen">
    <script class="u-script" type="text/javascript" src="https://www.hypeds.com/js/jquery.js" defer=""></script>
    <script class="u-script" type="text/javascript" src="https://www.hypeds.com/js/HypedLib.js" defer=""></script>
    <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
    <meta name="theme-color" content="#478ac9">
    <meta name="twitter:site" content="@">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Revista">
    <meta name="twitter:description" content="New_Hyped">
    <meta property="og:title" content="Revista">
    <meta property="og:type" content="website">
  </head>
  <body class="u-body u-xl-mode" data-lang="en">
    <section class="u-align-center u-clearfix u-grey-90 u-section-1" id="sec-8186">
      <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
        <h1 class="u-text u-text-default u-text-1">REVISTA DRUMMOND</h1>
      </div>
    </section>
    <section class="u-clearfix u-grey-60 u-section-2" id="sec-9dc1">
      <div class="u-clearfix u-sheet u-sheet-1">
        <img class="u-image u-image-default u-image-1" src="${imageURL[page]}" alt="" data-image-width="651" data-image-height="898">
        <a href="?settings=prev&page=${page}" class="u-border-none u-btn u-btn-round u-button-style u-custom-color-1 u-hover-palette-1-light-1 u-radius-6 u-btn-1">ANTERIOR</a>
        <a href="?settings=next&page=${page}" class="u-border-none u-btn u-btn-round u-button-style u-custom-color-1 u-hover-palette-1-light-1 u-radius-6 u-btn-2">PRÓXIMA</a>
      </div>
    </section>
    
    
    <footer class="u-align-center u-clearfix u-footer u-grey-90 u-footer" id="sec-04f4"><div class="u-align-left u-clearfix u-sheet u-sheet-1">
        <p class="u-align-center u-text u-text-1">Links Úteis<br>
          <a href="https://stats.uptimerobot.com/1BnoXi6Mgp" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-palette-1-base u-btn-1">Status Page<br>
          </a>
          <a href="https://api.hypeds.com/docs" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-palette-1-base u-btn-2">API</a>
          <br>
          <a href="https://www.hypeds.com/discord" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-palette-1-base u-btn-3">Discord</a>
          <br>
          <a href="https://www.hypeds.com/tos" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-palette-1-base u-btn-4">ToS</a>
          <br>
          <a href="https://e.hypeds.com/" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-palette-1-base u-btn-5">Encurtador</a>
        </p>
        <p class="u-text u-text-default u-text-2">Certificados</p>
        <a href="https://www.hypeds.com/login?redirectTo=https://www.hypeds.com/" class="u-active-grey-75 u-border-1 u-border-grey-30 u-border-hover-black u-btn u-btn-round u-button-style u-grey-90 u-hover-grey-80 u-radius-12 u-text-active-white u-text-hover-white u-btn-6">Login</a>
        <img class="u-image u-image-contain u-image-default u-image-1" src="https://www.hypeds.com/images/google-safe-browsing.png" alt="" data-image-width="844" data-image-height="243" data-href="https://transparencyreport.google.com/safe-browsing/search?url=https:%2F%2Fwww.hypeds.com&amp;hl=pt_BR" data-target="_blank">
        <p class="u-text u-text-default u-text-3">© HYPED GROUP 2022</p>
        <div class="u-social-icons u-spacing-10 u-social-icons-1">
          <a class="u-social-url" title="facebook" target="_blank" href="https://www.hypeds.com/facebook"><span class="u-icon u-social-facebook u-social-icon u-text-grey-15 u-icon-1"><svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 112 112" style=""><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-784b"></use></svg><svg class="u-svg-content" viewBox="0 0 112 112" x="0" y="0" id="svg-784b"><path fill="currentColor" d="M75.5,28.8H65.4c-1.5,0-4,0.9-4,4.3v9.4h13.9l-1.5,15.8H61.4v45.1H42.8V58.3h-8.8V42.4h8.8V32.2
c0-7.4,3.4-18.8,18.8-18.8h13.8v15.4H75.5z"></path></svg></span>
          </a>
          <a class="u-social-url" title="twitter" target="_blank" href="https://www.hypeds.com/twitter"><span class="u-icon u-social-icon u-social-twitter u-text-grey-15 u-icon-2"><svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 112 112" style=""><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-ba7b"></use></svg><svg class="u-svg-content" viewBox="0 0 112 112" x="0" y="0" id="svg-ba7b"><path fill="currentColor" d="M92.2,38.2c0,0.8,0,1.6,0,2.3c0,24.3-18.6,52.4-52.6,52.4c-10.6,0.1-20.2-2.9-28.5-8.2
	c1.4,0.2,2.9,0.2,4.4,0.2c8.7,0,16.7-2.9,23-7.9c-8.1-0.2-14.9-5.5-17.3-12.8c1.1,0.2,2.4,0.2,3.4,0.2c1.6,0,3.3-0.2,4.8-0.7
	c-8.4-1.6-14.9-9.2-14.9-18c0-0.2,0-0.2,0-0.2c2.5,1.4,5.4,2.2,8.4,2.3c-5-3.3-8.3-8.9-8.3-15.4c0-3.4,1-6.5,2.5-9.2
	c9.1,11.1,22.7,18.5,38,19.2c-0.2-1.4-0.4-2.8-0.4-4.3c0.1-10,8.3-18.2,18.5-18.2c5.4,0,10.1,2.2,13.5,5.7c4.3-0.8,8.1-2.3,11.7-4.5
	c-1.4,4.3-4.3,7.9-8.1,10.1c3.7-0.4,7.3-1.4,10.6-2.9C98.9,32.3,95.7,35.5,92.2,38.2z"></path></svg></span>
          </a>
          <a class="u-social-url" title="instagram" target="_blank" href="https://www.hypeds.com/instagram"><span class="u-icon u-social-icon u-social-instagram u-text-grey-15 u-icon-3"><svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 112 112" style=""><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-7da1"></use></svg><svg class="u-svg-content" viewBox="0 0 112 112" x="0" y="0" id="svg-7da1"><path fill="currentColor" d="M55.9,32.9c-12.8,0-23.2,10.4-23.2,23.2s10.4,23.2,23.2,23.2s23.2-10.4,23.2-23.2S68.7,32.9,55.9,32.9z
	 M55.9,69.4c-7.4,0-13.3-6-13.3-13.3c-0.1-7.4,6-13.3,13.3-13.3s13.3,6,13.3,13.3C69.3,63.5,63.3,69.4,55.9,69.4z"></path><path fill="#FFFFFF" d="M79.7,26.8c-3,0-5.4,2.5-5.4,5.4s2.5,5.4,5.4,5.4c3,0,5.4-2.5,5.4-5.4S82.7,26.8,79.7,26.8z"></path><path fill="currentColor" d="M78.2,11H33.5C21,11,10.8,21.3,10.8,33.7v44.7c0,12.6,10.2,22.8,22.7,22.8h44.7c12.6,0,22.7-10.2,22.7-22.7
	V33.7C100.8,21.1,90.6,11,78.2,11z M91,78.4c0,7.1-5.8,12.8-12.8,12.8H33.5c-7.1,0-12.8-5.8-12.8-12.8V33.7
	c0-7.1,5.8-12.8,12.8-12.8h44.7c7.1,0,12.8,5.8,12.8,12.8V78.4z"></path></svg></span>
          </a>
        </div>
      </div></footer>
  
</body></html>`)
});

router.get('/addpage', (req, res) => {
  if(!req.query.url) return res.json({ message: "Please write an URL, EX: /addpage?url=https://www.revista.com.br" })

  db.push("RevistaEscola", req.query.url)
  let array = db.get("RevistaEscola")
  res.json({ message: "Page added", array: array })
});

router.get('/delete', (req, res) => {
  if(!req.query.delete) return res.json({ message: "Please write a delete parameter, EX: /addpage?delete=true" })
  if(req.query.delete !== false) {
    db.delete("RevistaEscola") 
    return res.json({ message: "Page deleted" })
  }
})

module.exports = router;