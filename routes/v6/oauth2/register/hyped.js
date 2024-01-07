const express = require('express');
const nodemailer = require('nodemailer');
const db = require('quick.db');
var router = express.Router();  

router.get('/', function(req, res) {
  if(req.query.type === "discord") {
    if(req.query.userID === db.get(`HPD_User_HasDiscord_${req.query.userID}`)) {
      const userID = db.get(`HPD_User_IdByDiscord_${req.query.userID}`)
      const username = db.get(`HPD_User_Nickname_${userID}`)
      console.log("LOGGING USER BY DISCORD")

      let random = '';
      let dict = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXZ'
      for(var i = 0; i < 10; i++) {
        random = random + dict.charAt(Math.floor(Math.random() * dict.length));
      }
      let sessionToken = `NzST${random}`

      res.setHeader(`Set-Cookie`, `SessionId=${sessionToken}; Domain=.hypeds.com; Path=/`)
      db.set(`VerifySession_${sessionToken}`, sessionToken)
      db.set(`SessionUser_${sessionToken}`, username)
      db.set(`LGN_SessionUserID_${sessionToken}`, userID)
      db.set(`CurrentSession_${username}`, sessionToken)
      db.set(`SessionIsLogged_${sessionToken}_${username}`, true)

      return res.redirect("https://api.hypeds.com/v6/oauth2/login")
    }
    return res.send(`<!DOCTYPE html>
<html style="font-size: 16px;" lang="en"><head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <meta name="keywords" content="Faça seu registro">
    <meta name="description" content="">
    <title>HYPED | Register With Partner</title>
    <link rel="stylesheet" href="https://www.hypeds.com/css/HypedLibv4.css" media="screen">
    <link rel="stylesheet" href="https://www.hypeds.com/css/RegisterWithDiscord.css" media="screen">
    <link rel="shortcut icon" href="https://static.wixstatic.com/media/a926b2_cfc2b507c19546d88a6a2231b832b022%7Emv2.png/v1/fill/w_32%2Ch_32%2Clg_1%2Cusm_0.66_1.00_0.01/a926b2_cfc2b507c19546d88a6a2231b832b022%7Emv2.png" type="image/png">
    <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
    <link id="u-page-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i">
    <script type="application/ld+json">{
      "@context": "http://schema.org",
      "@type": "Organization",
      "name": "Hyped Group",
      "url": "https://www.hypeds.com/",
      "logo": "https://www.hypeds.com/images/hyped.png",
      "sameAs": [
          "https://www.hypeds.com/facebook",
          "https://www.hypeds.com/twitter",
          "https://www.hypeds.com/instagram"
      ]
}</script>
    <meta name="theme-color" content="#478ac9">
    <meta name="twitter:site" content="@">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="RegisterWithReplit">
    <meta name="twitter:description" content="New_Hyped">
    <meta property="og:title" content="RegisterWithDiscord">
    <meta property="og:type" content="website">
  </head>
  <body class="u-body u-xl-mode" data-lang="en"><header class="u-clearfix u-grey-70 u-header u-header" id="sec-011c"><div class="u-clearfix u-sheet u-sheet-1">
        <a href="https://www.hypeds.com/login?redirectTo=https://www.hypeds.com/dashboard" class="u-active-grey-75 u-border-1 u-border-grey-30 u-border-hover-black u-btn u-btn-round u-button-style u-grey-90 u-hover-grey-80 u-radius-12 u-text-active-white u-text-hover-white u-btn-1">Login</a>
        <nav class="u-menu u-menu-dropdown u-offcanvas u-menu-1" data-responsive-from="XXL">
          <div class="menu-collapse" style="font-size: 1rem; letter-spacing: 0px; font-weight: 700; text-transform: uppercase;">
            <a class="u-button-style u-custom-active-border-color u-custom-active-color u-custom-border u-custom-border-color u-custom-border-radius u-custom-borders u-custom-hover-border-color u-custom-hover-color u-custom-left-right-menu-spacing u-custom-padding-bottom u-custom-text-active-color u-custom-text-color u-custom-text-hover-color u-custom-top-bottom-menu-spacing u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base" href="#" style="font-size: calc(1em + 6px); padding: 3px 10px;">
              <svg class="u-svg-link" viewBox="0 0 24 24"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#menu-hamburger"></use></svg>
              <svg class="u-svg-content" version="1.1" id="menu-hamburger" viewBox="0 0 16 16" x="0px" y="0px" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><g><rect y="1" width="16" height="2"></rect><rect y="7" width="16" height="2"></rect><rect y="13" width="16" height="2"></rect>
</g></svg>
            </a>
          </div>
          <div class="u-custom-menu u-nav-container">
            <ul class="u-nav u-spacing-30 u-unstyled u-nav-1"><li class="u-nav-item"><a class="u-border-2 u-border-active-custom-color-1 u-border-grey-90 u-border-hover-custom-color-1 u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-radius-2 u-text-active-custom-color-1 u-text-grey-90 u-text-hover-custom-color-1" href="https://www.hypeds.com" style="padding: 10px 0px;">Home</a>
</li><li class="u-nav-item"><a class="u-border-2 u-border-active-custom-color-1 u-border-grey-90 u-border-hover-custom-color-1 u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-radius-2 u-text-active-custom-color-1 u-text-grey-90 u-text-hover-custom-color-1" href="https://www.hypeds.com/hypedbot" style="padding: 10px 0px;">Hyped Bot</a>
</li><li class="u-nav-item"><a class="u-border-2 u-border-active-custom-color-1 u-border-grey-90 u-border-hover-custom-color-1 u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-radius-2 u-text-active-custom-color-1 u-text-grey-90 u-text-hover-custom-color-1" href="https://www.hypeds.com/hypedmusic" style="padding: 10px 0px;">Hyped Music</a>
</li><li class="u-nav-item"><a class="u-border-2 u-border-active-custom-color-1 u-border-grey-90 u-border-hover-custom-color-1 u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-radius-2 u-text-active-custom-color-1 u-text-grey-90 u-text-hover-custom-color-1" href="https://www.hypeds.com/feed" style="padding: 10px 0px;">ShareIT</a>
</li></ul>
          </div>
          <div class="u-custom-menu u-nav-container-collapse">
            <div class="u-black u-container-style u-inner-container-layout u-opacity u-opacity-95 u-sidenav">
              <div class="u-inner-container-layout u-sidenav-overflow">
                <div class="u-menu-close"></div>
                <ul class="u-align-center u-nav u-popupmenu-items u-unstyled u-nav-2"><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com">Home</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/hypedbot">Hyped Bot</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/hypedmusic">Hyped Music</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/feed">ShareIT</a>
</li></ul>
              </div>
            </div>
            <div class="u-black u-menu-overlay u-opacity u-opacity-70"></div>
          </div>
        </nav>
        <a href="https://www.hypeds.com" class="u-image u-logo u-image-1" data-image-width="640" data-image-height="642" title="Home">
          <img class="u-logo-image u-logo-image-1" src="https://www.hypeds.com/images/hyped.png">
        </a>
      </div></header>
    <section class="u-align-center u-clearfix u-grey-60 u-section-1" id="carousel_851e">
      <div class="u-clearfix u-sheet u-sheet-1">
        <h2 class="u-custom-font u-font-montserrat u-text u-text-default u-text-grey-5 u-text-1">Faça seu registro</h2>
        <div class="u-container-style u-grey-90 u-group u-radius-50 u-shape-round u-group-1">
          <div class="u-container-layout u-container-layout-1">
            <img class="u-image u-image-circle u-preserve-proportions u-image-1" src="https://cdn.discordapp.com/avatars/${req.query.userID}/${req.query.userAvatar}" alt="" data-image-width="720" data-image-height="720">
            <h4 class="u-align-center u-custom-font u-font-montserrat u-text u-text-2">Olá @${req.query.userNickname}<br>Complete seu registro
            </h4>
            <div class="u-form u-form-1">
              <form method="POST" class="u-clearfix u-form-spacing-28 u-form-vertical u-inner-form" source="email" name="form" style="padding: 0px;">
                <div class="u-form-address u-form-group u-label-top u-form-group-1">
                  <label for="address-be2d" class="u-label">Nome</label>
                  <input type="text" placeholder="Digite seu nome " id="address-be2d" name="name" class="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-10 u-white" required="">
                </div>
                <div class="u-form-group u-form-name u-label-top u-form-group-2">
                  <label for="name-a3be" class="u-label">Sobrenome</label>
                  <input type="text" placeholder="Digite seu sobrenome" id="name-a3be" name="second_name" class="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-10 u-white" required="">
                </div>
                <div class="u-form-email u-form-group u-form-partition-factor-2 u-label-top">
                  <label for="email-c6a3" class="u-label">Email</label>
                  <input type="email" placeholder="Digite um e-mail válido" id="email-c6a3" name="email" class="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-10 u-white" required="">
                </div>
                <div class="u-form-group u-form-name u-form-partition-factor-2 u-label-top">
                  <label for="name-c6a3" class="u-label">Nickname</label>
                  <input type="text" placeholder="Digite seu nome de usuário" id="name-c6a3" name="nickname" class="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-10 u-white" required="">
                </div>
                <div class="u-form-group u-label-top u-form-group-5">
                  <label for="text-e7fe" class="u-label">Senha</label>
                  <input type="text" placeholder="Digite sua senha" id="text-e7fe" name="password" class="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-10 u-white" required="required">
                </div>
                <div class="u-form-group u-label-top u-form-group-6">
                  <label for="text-531e" class="u-form-control-hidden u-label"></label>
                  <input type="text" id="text-531e" name="second_password" class="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-10 u-white" placeholder="Repita a sua senha" required="required">
                </div>
                <div class="u-align-center u-form-group u-form-submit u-label-top">
                  <input type="submit" name="submit" class="u-border-none u-btn u-btn-round u-btn-submit u-button-style u-custom-color-1 u-hover-palette-1-light-1 u-radius-20 u-btn-1" value="REGISTRAR" class="u-form-control-hidden">
                </div>
              </form>
            </div>
            <h6 class="u-align-center u-custom-font u-font-montserrat u-text u-text-3">
              <span style="font-size: 0.875rem;">A</span>
              <span style="font-size: 0.875rem;">s informações providas serão armazenadas de acordo com nossos <a href="https://www.hypeds.com/tos" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-palette-1-base u-btn-2" target="_blank">termos de serviço</a>, e ao clicar em "Registrar" o usuário está de acordo com os termos e sobre as nossas políticas de compartilhamento de informações.
              </span>
            </h6>
          </div>
        </div>
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
  }
  if(req.query.type === "replit") {
    return res.send(`<!DOCTYPE html>
<html style="font-size: 16px;" lang="en"><head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <meta name="keywords" content="Faça seu registro">
    <meta name="description" content="">
    <title>HYPED | Register With Partner</title>
    <link rel="stylesheet" href="https://www.hypeds.com/css/HypedLibv4.css" media="screen">
    <link rel="stylesheet" href="https://www.hypeds.com/css/RegisterWithDiscord.css" media="screen">
    <link rel="shortcut icon" href="https://static.wixstatic.com/media/a926b2_cfc2b507c19546d88a6a2231b832b022%7Emv2.png/v1/fill/w_32%2Ch_32%2Clg_1%2Cusm_0.66_1.00_0.01/a926b2_cfc2b507c19546d88a6a2231b832b022%7Emv2.png" type="image/png">
    <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
    <link id="u-page-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i">
    <script type="application/ld+json">{
      "@context": "http://schema.org",
      "@type": "Organization",
      "name": "Hyped Group",
      "url": "https://www.hypeds.com/",
      "logo": "https://www.hypeds.com/images/hyped.png",
      "sameAs": [
          "https://www.hypeds.com/facebook",
          "https://www.hypeds.com/twitter",
          "https://www.hypeds.com/instagram"
      ]
}</script>
    <meta name="theme-color" content="#478ac9">
    <meta name="twitter:site" content="@">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="RegisterWithReplit">
    <meta name="twitter:description" content="New_Hyped">
    <meta property="og:title" content="RegisterWithDiscord">
    <meta property="og:type" content="website">
  </head>
  <body class="u-body u-xl-mode" data-lang="en"><header class="u-clearfix u-grey-70 u-header u-header" id="sec-011c"><div class="u-clearfix u-sheet u-sheet-1">
        <a href="https://www.hypeds.com/login?redirectTo=https://www.hypeds.com/dashboard" class="u-active-grey-75 u-border-1 u-border-grey-30 u-border-hover-black u-btn u-btn-round u-button-style u-grey-90 u-hover-grey-80 u-radius-12 u-text-active-white u-text-hover-white u-btn-1">Login</a>
        <nav class="u-menu u-menu-dropdown u-offcanvas u-menu-1" data-responsive-from="XXL">
          <div class="menu-collapse" style="font-size: 1rem; letter-spacing: 0px; font-weight: 700; text-transform: uppercase;">
            <a class="u-button-style u-custom-active-border-color u-custom-active-color u-custom-border u-custom-border-color u-custom-border-radius u-custom-borders u-custom-hover-border-color u-custom-hover-color u-custom-left-right-menu-spacing u-custom-padding-bottom u-custom-text-active-color u-custom-text-color u-custom-text-hover-color u-custom-top-bottom-menu-spacing u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base" href="#" style="font-size: calc(1em + 6px); padding: 3px 10px;">
              <svg class="u-svg-link" viewBox="0 0 24 24"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#menu-hamburger"></use></svg>
              <svg class="u-svg-content" version="1.1" id="menu-hamburger" viewBox="0 0 16 16" x="0px" y="0px" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><g><rect y="1" width="16" height="2"></rect><rect y="7" width="16" height="2"></rect><rect y="13" width="16" height="2"></rect>
</g></svg>
            </a>
          </div>
          <div class="u-custom-menu u-nav-container">
            <ul class="u-nav u-spacing-30 u-unstyled u-nav-1"><li class="u-nav-item"><a class="u-border-2 u-border-active-custom-color-1 u-border-grey-90 u-border-hover-custom-color-1 u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-radius-2 u-text-active-custom-color-1 u-text-grey-90 u-text-hover-custom-color-1" href="https://www.hypeds.com" style="padding: 10px 0px;">Home</a>
</li><li class="u-nav-item"><a class="u-border-2 u-border-active-custom-color-1 u-border-grey-90 u-border-hover-custom-color-1 u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-radius-2 u-text-active-custom-color-1 u-text-grey-90 u-text-hover-custom-color-1" href="https://www.hypeds.com/hypedbot" style="padding: 10px 0px;">Hyped Bot</a>
</li><li class="u-nav-item"><a class="u-border-2 u-border-active-custom-color-1 u-border-grey-90 u-border-hover-custom-color-1 u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-radius-2 u-text-active-custom-color-1 u-text-grey-90 u-text-hover-custom-color-1" href="https://www.hypeds.com/hypedmusic" style="padding: 10px 0px;">Hyped Music</a>
</li><li class="u-nav-item"><a class="u-border-2 u-border-active-custom-color-1 u-border-grey-90 u-border-hover-custom-color-1 u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-radius-2 u-text-active-custom-color-1 u-text-grey-90 u-text-hover-custom-color-1" href="https://www.hypeds.com/feed" style="padding: 10px 0px;">ShareIT</a>
</li></ul>
          </div>
          <div class="u-custom-menu u-nav-container-collapse">
            <div class="u-black u-container-style u-inner-container-layout u-opacity u-opacity-95 u-sidenav">
              <div class="u-inner-container-layout u-sidenav-overflow">
                <div class="u-menu-close"></div>
                <ul class="u-align-center u-nav u-popupmenu-items u-unstyled u-nav-2"><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com">Home</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/hypedbot">Hyped Bot</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/hypedmusic">Hyped Music</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/feed">ShareIT</a>
</li></ul>
              </div>
            </div>
            <div class="u-black u-menu-overlay u-opacity u-opacity-70"></div>
          </div>
        </nav>
        <a href="https://www.hypeds.com" class="u-image u-logo u-image-1" data-image-width="640" data-image-height="642" title="Home">
          <img class="u-logo-image u-logo-image-1" src="https://www.hypeds.com/images/hyped.png">
        </a>
      </div></header>
    <section class="u-align-center u-clearfix u-grey-60 u-section-1" id="carousel_851e">
      <div class="u-clearfix u-sheet u-sheet-1">
        <h2 class="u-custom-font u-font-montserrat u-text u-text-default u-text-grey-5 u-text-1">Faça seu registro</h2>
        <div class="u-container-style u-grey-90 u-group u-radius-50 u-shape-round u-group-1">
          <div class="u-container-layout u-container-layout-1">
            <img class="u-image u-image-circle u-preserve-proportions u-image-1" src="${req.query.userAvatar}" alt="" data-image-width="720" data-image-height="720">
            <h4 class="u-align-center u-custom-font u-font-montserrat u-text u-text-2">Olá @${req.query.userNickname}<br>Complete seu registro
            </h4>
            <div class="u-form u-form-1">
              <form method="POST" class="u-clearfix u-form-spacing-28 u-form-vertical u-inner-form" source="email" name="form" style="padding: 0px;">
                <div class="u-form-address u-form-group u-label-top u-form-group-1">
                  <label for="address-be2d" class="u-label">Nome</label>
                  <input type="text" placeholder="Digite seu nome " id="address-be2d" name="name" class="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-10 u-white" required="">
                </div>
                <div class="u-form-group u-form-name u-label-top u-form-group-2">
                  <label for="name-a3be" class="u-label">Sobrenome</label>
                  <input type="text" placeholder="Digite seu sobrenome" id="name-a3be" name="second_name" class="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-10 u-white" required="">
                </div>
                <div class="u-form-email u-form-group u-form-partition-factor-2 u-label-top">
                  <label for="email-c6a3" class="u-label">Email</label>
                  <input type="email" placeholder="Digite um e-mail válido" id="email-c6a3" name="email" class="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-10 u-white" required="">
                </div>
                <div class="u-form-group u-form-name u-form-partition-factor-2 u-label-top">
                  <label for="name-c6a3" class="u-label">Nickname</label>
                  <input type="text" placeholder="Digite seu nome de usuário" id="name-c6a3" name="nickname" class="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-10 u-white" required="">
                </div>
                <div class="u-form-group u-label-top u-form-group-5">
                  <label for="text-e7fe" class="u-label">Senha</label>
                  <input type="text" placeholder="Digite sua senha" id="text-e7fe" name="password" class="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-10 u-white" required="required">
                </div>
                <div class="u-form-group u-label-top u-form-group-6">
                  <label for="text-531e" class="u-form-control-hidden u-label"></label>
                  <input type="text" id="text-531e" name="second_password" class="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-10 u-white" placeholder="Repita a sua senha" required="required">
                </div>
                <div class="u-align-center u-form-group u-form-submit u-label-top">
                  <input type="submit" name="submit" class="u-border-none u-btn u-btn-round u-btn-submit u-button-style u-custom-color-1 u-hover-palette-1-light-1 u-radius-20 u-btn-1" value="REGISTRAR" class="u-form-control-hidden">
                </div>
              </form>
            </div>
            <h6 class="u-align-center u-custom-font u-font-montserrat u-text u-text-3">
              <span style="font-size: 0.875rem;">A</span>
              <span style="font-size: 0.875rem;">s informações providas serão armazenadas de acordo com nossos <a href="https://www.hypeds.com/tos" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-palette-1-base u-btn-2" target="_blank">termos de serviço</a>, e ao clicar em "Registrar" o usuário está de acordo com os termos e sobre as nossas políticas de compartilhamento de informações.
              </span>
            </h6>
          </div>
        </div>
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
  }
  res.sendFile(__dirname + "/html/Register.html")
});

router.post('/', function(req, res) {
  if(req.query.type === "replit") {
    if(req.body.password !== req.body.second_password) return
    let HasAccount = db.get(`HPD_User_HasAccount_${req.body.nickname}`)
    if(HasAccount === true) return
    let HasEmail = db.get(`HPD_User_HasMailAccount_${req.body.email}`)
    if(HasEmail === true) return
    
    let UserId = GenId(18, true, false);
    if(db.get(`HPD_UserID_IsRegistered_${UserId}`) === true) UserId = GenId(18, true, false)
    const newDate = new Date();

    db.set(`HPD_UserID_${req.body.nickname}`, UserId)
    db.set(`HPD_User_HasAccount_${req.body.nickname}`, true)
    db.set(`HPD_User_HasMailAccount_${req.body.email}`, true)
    db.set(`HPD_UserID_IsRegistered_${UserId}`, true)
    
    db.set(`HPD_User_Nickname_${UserId}`, req.body.nickname)
    db.set(`HPD_User_ReplitNickname_${UserId}`, req.query.userNickname)
    db.set(`HPD_User_ReplitIsConnected_${UserId}`, true)
    db.set(`HPD_User_Avatar_${UserId}`, req.query.userAvatar)
    db.set(`HPD_User_RegisteredBy_${UserId}`, "REPLIT")
    db.set(`HPD_User_CreationDate_${UserId}`, `${newDate.toString()}`)
    db.set(`HPD_User_FullName_${UserId}`, req.body.name + " " + req.body.second_name)
    db.set(`HPD_User_FirstName_${UserId}`, req.body.name)
    db.set(`HPD_User_SecondName_${UserId}`, req.body.second_name)
    db.set(`HPD_User_Password_${UserId}`, req.body.password)
    db.set(`HPD_User_Email_${UserId}`, req.body.email)
    db.push(`HPD_MailList`, req.body.email)

    let isConDiscord = db.get(`HPD_User_DiscordIsConnected_${UserId}`)

    if(isConDiscord !== true) {
      return res.redirect(`https://api.hypeds.com/v6/oauth2/loginWith/addDiscord?clientID=${UserId}`)
    } else {
      return res.redirect(`https://api.hypeds.com/v6/oauth2/login`)
    }
  }
  if(req.query.type === "discord") {
    if(req.body.password !== req.body.second_password) return
    let HasAccount = db.get(`HPD_User_HasAccount_${req.body.nickname}`)
    if(HasAccount === true) return
    let HasEmail = db.get(`HPD_User_HasMailAccount_${req.body.email}`)
    if(HasEmail === true) return

    let UserId = GenId(18, true, false)
    if(db.get(`HPD_UserID_IsRegistered_${UserId}`) === true) UserId = GenId(18, true, false)
    const newDate = new Date();

    db.set(`HPD_UserID_${req.body.nickname}`, UserId)
    db.set(`HPD_User_HasAccount_${req.body.nickname}`, true)
    db.set(`HPD_User_HasMailAccount_${req.body.email}`, true)
    db.set(`HPD_UserID_IsRegistered_${UserId}`, true)
    
    db.set(`HPD_User_Nickname_${UserId}`, req.body.nickname)
    db.set(`HPD_User_DiscordNickname_${UserId}`, req.query.userNickname)
    db.set(`HPD_User_DiscordIsConnected_${UserId}`, true)
    db.set(`HPD_User_DiscordID_${UserId}`, req.query.userID)
    db.set(`HPD_User_Avatar_${UserId}`, `https://cdn.discordapp.com/avatars/${req.query.userID}/${req.query.userAvatar}.webp`)
    db.set(`HPD_User_RegisteredBy_${UserId}`, "DISCORD")
    db.set(`HPD_User_CreationDate_${UserId}`, `${newDate.toString()}`)
    db.set(`HPD_User_FullName_${UserId}`, req.body.name + " " + req.body.second_name)
    db.set(`HPD_User_FirstName_${UserId}`, req.body.name)
    db.set(`HPD_User_SecondName_${UserId}`, req.body.second_name)
    db.set(`HPD_User_Password_${UserId}`, req.body.password)
    db.set(`HPD_User_Email_${UserId}`, req.body.email)
    db.push(`HPD_MailList`, req.body.email)

    return res.redirect(`https://api.hypeds.com/v6/oauth2/login`)
  }
  let HasAccount = db.get(`HPD_User_HasAccount_${req.body.nickname}`)
  if(HasAccount === true) return console.log("Nickname already registered")
  let HasEmail = db.get(`HPD_User_HasMailAccount_${req.body.email}`)
  if(HasEmail === true) return console.log("Email already registered")
  
  if(req.body.password !== req.body.second_password) return console.log("Password incorrect")
  let UserId = GenId(18, true, false)
  if(db.get(`HPD_UserID_IsRegistered_${UserId}`) === true) UserId = GenId(18, true, false)
  const newDate = new Date();

  //SET USER Criation data
  db.set(`HPD_UserID_${req.body.nickname}`, UserId)
  db.set(`HPD_User_HasAccount_${req.body.nickname}`, true)
  db.set(`HPD_User_HasMailAccount_${req.body.email}`, true)
  db.set(`HPD_UserID_IsRegistered_${UserId}`, true)
  
  db.set(`HPD_User_Nickname_${UserId}`, req.body.nickname)
  db.set(`HPD_User_RegisteredBy_${UserId}`, "HYPED")
  db.set(`HPD_User_CreationDate_${UserId}`, `${newDate.toString()}`)
  db.set(`HPD_User_FullName_${UserId}`, req.body.name + " " + req.body.second_name)
  db.set(`HPD_User_FirstName_${UserId}`, req.body.name)
  db.set(`HPD_User_SecondName_${UserId}`, req.body.second_name)
  db.set(`HPD_User_Password_${UserId}`, req.body.password)
  db.set(`HPD_User_Email_${UserId}`, req.body.email)
  db.push(`HPD_MailList`, req.body.email)

  let isConDiscord = db.get(`HPD_User_DiscordIsConnected_${UserId}`)
  
  if(isConDiscord !== true) {
    return res.redirect(`https://api.hypeds.com/v6/oauth2/loginWith/addDiscord?clientID=${UserId}`)
  } else {
    return res.redirect(`https://api.hypeds.com/v6/oauth2/login`)
  }
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

function SendEmail(toSomeone, firstName) {
  
}

module.exports = router;