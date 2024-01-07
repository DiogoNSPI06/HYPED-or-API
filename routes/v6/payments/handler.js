const express = require('express');
const request = require('https')
const db = require('quick.db');
var router = express.Router();

//DASHBOARD

router.get('/dashboard', function(req, res) {
  let token = req.cookies.SessionId
  let userID = db.get(`SessionUser_${token}`)
  let isLogged = db.get(`SessionIsLogged_${token}_${userID}`)
  
  let id = db.get(`HPD_UserID_${userID}`)
  
  let userDiscordID = db.get(`HPD_User_DiscordID_${id}`)
  let nickName = db.get(`HPD_User_Nickname_${id}`)
  let isStaff = db.get(`HPD_User_IsStaff_${id}`)
  
  if(isLogged !== true) return res.redirect(`https://www.hypeds.com/login?redirectTo=https://api.hypeds.com/v6/payments/addProduct`);

  if(isStaff !== "true") return res.redirect(`https://api.hypeds.com/v6/oauth2/logout?redirectTo=https://api.hypeds.com/v6/payments/addProduct`);

  request.get(`https://v4.hypeds.com/api/users/${userDiscordID}`, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      res.send(`<!DOCTYPE html>
<html style="font-size: 16px;" lang="en"><head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <meta name="keywords" content="HYPED | Dashboard">
    <meta name="description" content="">
    <title>HYPED | StaffDashboard</title>
    <link rel="stylesheet" href="https://beta.hypeds.com/css/HypedLibv5.css" media="screen">
    <link rel="stylesheet" href="https://www.hypeds.com/css/StaffDashboard.css" media="screen">
    <script class="u-script" type="text/javascript" src="https://www.hypeds.com/js/jquery.js" defer=""></script>
    <script class="u-script" type="text/javascript" src="https://www.hypeds.com/js/HypedLib.js" defer=""></script>
    <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
    <link id="u-page-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Oswald:200,300,400,500,600,700">
  </head>
  <body class="u-body u-xl-mode" data-lang="en">
    <section class="u-align-center u-black u-clearfix u-section-1" id="sec-5845">
      <div class="u-clearfix u-sheet u-sheet-1">
        <img class="u-image u-image-contain u-image-default u-image-1" src="https://www.hypeds.com/images/hyped.png" alt="" data-image-width="640" data-image-height="642" data-href="https://api.hypeds.com/v6/payments/dashboard">
        <img class="u-image u-image-round u-preserve-proportions u-radius-50 u-image-2" src="${JSON.parse(data).avatarURL}" alt="" data-image-width="1024" data-image-height="1024">
        <h1 class="u-text u-text-default u-text-1">HYPED | STAFF Dashboard</h1>
        <h3 class="u-text u-text-default u-text-2">
          <a href="https://api.hypeds.com/v6/oauth2/logout" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-custom-color-1 u-btn-1">LOGOUT</a>
        </h3>
      </div>
    </section>
    <section class="u-align-center u-clearfix u-image u-shading u-section-2" src="" data-image-width="1920" data-image-height="1080" id="sec-34ec">
      <div class="u-clearfix u-sheet u-sheet-1">
        <h1 class="u-custom-font u-font-oswald u-text u-text-default u-title u-text-1">Configure o HYPED</h1>
        <p class="u-large-text u-text u-text-default u-text-variant u-text-2">VEJA ABAIXO AS OPÇÕES</p>
      </div>
    </section>
    <section class="u-align-center u-clearfix u-grey-80 u-section-3" id="sec-27b8">
      <div class="u-clearfix u-sheet u-sheet-1">
        <h1 class="u-text u-text-default u-text-1">Adicione um produto</h1>
        <a href="https://api.hypeds.com/v6/payments/addProduct" class="u-border-none u-btn u-btn-round u-button-style u-custom-color-1 u-radius-20 u-btn-1" data-animation-name="customAnimationIn" data-animation-duration="1000" data-animation-direction="">CONFIGURE</a>
      </div>
    </section>
    <section class="u-align-center u-clearfix u-grey-75 u-section-4" id="carousel_c101">
      <div class="u-clearfix u-sheet u-sheet-1">
        <h1 class="u-text u-text-default u-text-1">Remova um produto</h1>
        <a href="https://api.hypeds.com/v6/payments/removeProduct" class="u-border-none u-btn u-btn-round u-button-style u-custom-color-1 u-radius-20 u-btn-1" data-animation-name="customAnimationIn" data-animation-duration="1000" data-animation-direction="">CONFIGURE</a>
      </div>
    </section>
    <section class="u-align-center u-clearfix u-grey-80 u-section-5" id="carousel_a7b7">
      <div class="u-clearfix u-sheet u-sheet-1">
        <h1 class="u-text u-text-default u-text-1">Crie um cupom</h1>
        <a href="https://api.hypeds.com/v6/payments/createCupom" class="u-border-none u-btn u-btn-round u-button-style u-custom-color-1 u-radius-20 u-btn-1" data-animation-name="customAnimationIn" data-animation-duration="1000" data-animation-direction="">CONFIGURE</a>
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
    })
  })
});

//ADDPRODUCT

router.get('/addProduct', function(req, res) {
  let token = req.cookies.SessionId
  let userID = db.get(`SessionUser_${token}`)
  let isLogged = db.get(`SessionIsLogged_${token}_${userID}`)
  
  let id = db.get(`HPD_UserID_${userID}`)
  
  let userDiscordID = db.get(`HPD_User_DiscordID_${id}`)
  let nickName = db.get(`HPD_User_Nickname_${id}`)
  let isStaff = db.get(`HPD_User_IsStaff_${id}`)
  
  if(isLogged !== true) return res.redirect(`https://www.hypeds.com/login?redirectTo=https://api.hypeds.com/v6/payments/addProduct`);

  if(isStaff !== "true") return res.redirect(`https://api.hypeds.com/v6/oauth2/logout?redirectTo=https://api.hypeds.com/v6/payments/addProduct`);

  request.get(`https://v4.hypeds.com/api/users/${userDiscordID}`, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      res.send(`<!DOCTYPE html>
<html style="font-size: 16px;" lang="en"><head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <meta name="keywords" content="HYPED | STAFF Dashboard, ADICIONE UM PRODUTO">
    <meta name="description" content="">
    <title>HYPED | AddProduct</title>
    <link rel="stylesheet" href="https://beta.hypeds.com/css/HypedLibv5.css" media="screen">
    <link rel="shortcut icon" href="https://static.wixstatic.com/media/a926b2_cfc2b507c19546d88a6a2231b832b022%7Emv2.png/v1/fill/w_32%2Ch_32%2Clg_1%2Cusm_0.66_1.00_0.01/a926b2_cfc2b507c19546d88a6a2231b832b022%7Emv2.png" type="image/png">
    <link rel="stylesheet" href="https://www.hypeds.com/css/AddProduct.css" media="screen">
    <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
    <link id="u-page-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Oswald:200,300,400,500,600,700">
  </head>
  <body class="u-body u-xl-mode" data-lang="en">
    <section class="u-align-center u-black u-clearfix u-section-1" id="sec-5c79">
      <div class="u-clearfix u-sheet u-sheet-1">
        <img class="u-image u-image-contain u-image-default u-image-1" src="https://www.hypeds.com/images/hyped.png" alt="" data-image-width="640" data-image-height="642" data-href="https://api.hypeds.com/v6/payments/dashboard">
        <img class="u-image u-image-round u-preserve-proportions u-radius-50 u-image-2" src="${JSON.parse(data).avatarURL}" alt="" data-image-width="1024" data-image-height="1024">
        <h1 class="u-text u-text-default u-text-1">HYPED | STAFF Dashboard</h1>
        <h3 class="u-text u-text-default u-text-2">
          <a href="https://api.hypeds.com/v6/oauth2/logout" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-custom-color-1 u-btn-1">LOGOUT</a>
        </h3>
      </div>
    </section>
    <section class="u-align-center u-clearfix u-image u-shading u-section-2" src="" data-image-width="1920" data-image-height="1080" id="sec-4c65">
      <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
        <h1 class="u-custom-font u-font-oswald u-text u-text-default u-title u-text-1">ADICIONE UM PRODUTO</h1>
      </div>
    </section>
    <section class="u-align-center u-clearfix u-grey-80 u-section-3" id="sec-9f0c">
      <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
        <div class="u-form u-form-1">
          <form method="POST" class="u-clearfix u-form-spacing-10 u-form-vertical u-inner-form" style="padding: 10px" source="email" name="form">
            <div class="u-form-group u-form-name u-label-top">
              <label for="name-3b9a" class="u-label">Nome do produto</label>
              <input type="text" id="name-3b9a" name="productName" class="u-border-1 u-border-grey-30 u-grey-75 u-input u-input-rectangle u-radius-10" required="" placeholder="Nome do produto">
            </div>
            <div class="u-form-group u-form-select u-form-group-2">
              <label for="select-7d85" class="u-label">Loja que será vendido</label>
              <div class="u-form-select-wrapper">
                <select id="select-7d85" name="store" class="u-border-1 u-border-grey-30 u-grey-75 u-input u-input-rectangle u-radius-10" required="required">
                  <option value="host">host</option>
                  <option value="shop">shop</option>
                  <option value="mcstore">mcstore</option>
                  <option value="cloud">cloud</option>
                </select>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" version="1" class="u-caret"><path fill="currentColor" d="M4 8L0 4h8z"></path></svg>
              </div>
            </div>
            <div class="u-form-group u-form-select u-form-group-3">
              <label for="select-9411" class="u-label">Tipo de produto (se houver)</label>
              <div class="u-form-select-wrapper">
                <select id="select-9411" name="type" class="u-border-1 u-border-grey-30 u-grey-75 u-input u-input-rectangle u-radius-10">
                  <option value="minecraft">minecraft</option>
                  <option value="mta">mta</option>
                  <option value="vps">vps</option>
                  <option value="samp">samp</option>
                  <option value="cpanel">cpanel</option>
                  <option value="discordjs">discordjs</option>
                  <option value="cloud">cloud</option>
                </select>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" version="1" class="u-caret"><path fill="currentColor" d="M4 8L0 4h8z"></path></svg>
              </div>
            </div>
            <div class="u-form-group u-form-partition-factor-2 u-form-select u-form-group-4">
              <label for="select-9199" class="u-label">Moeda</label>
              <div class="u-form-select-wrapper">
                <select id="select-9199" name="currency" class="u-border-1 u-border-grey-30 u-grey-75 u-input u-input-rectangle u-radius-10" required="required">
                  <option value="R$">R$</option>
                  <option value="$">$</option>
                </select>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" version="1" class="u-caret"><path fill="currentColor" d="M4 8L0 4h8z"></path></svg>
              </div>
            </div>
            <div class="u-form-group u-form-partition-factor-2 u-label-top u-form-group-5">
              <label for="text-9fa9" class="u-label">Valor</label>
              <input type="text" id="text-9fa9" name="value" class="u-border-1 u-border-grey-30 u-grey-75 u-input u-input-rectangle u-radius-10" placeholder="Valor do produto" required="required">
            </div>
            <div class="u-form-group u-form-message u-label-top">
              <label for="message-3b9a" class="u-label">Descrição do Produto</label>
              <textarea placeholder="Descrição do produto (se houver)" rows="4" cols="50" id="message-3b9a" name="description" class="u-border-1 u-border-grey-30 u-grey-75 u-input u-input-rectangle u-radius-10" maxlength="100"></textarea>
            </div>
            <div class="u-form-group u-label-top u-form-group-7">
              <label for="text-1ceb" class="u-label">Imagem do Produto</label>
              <input type="text" placeholder="URL da imagem do produto (se houver)" id="text-1ceb" name="imgURL" class="u-border-1 u-border-grey-30 u-grey-75 u-input u-input-rectangle u-radius-10">
            </div>
            <div class="u-align-left u-form-group u-form-submit u-label-top">
              <button type="submit" value="submit" class="u-border-none u-btn u-btn-round u-btn-submit u-button-style u-custom-color-1 u-radius-10 u-text-body-alt-color u-btn-1">ADICIONAR</button>
            </div>
          </form>
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
    })
  })
});

router.post('/addProduct', function(req, res) {
  let token = req.cookies.SessionId
  let userID = db.get(`SessionUser_${token}`)
  let isLogged = db.get(`SessionIsLogged_${token}_${userID}`)
  
  if(isLogged !== true) return res.redirect(`https://www.hypeds.com/login?redirectTo=https://api.hypeds.com/v6/dashboard`);

  let productID = GenId(8, false, false, false)

  db.set(`HP_Product_Name_${productID}`, req.body.productName)
  db.set(`HP_Product_Store_${productID}`, req.body.store)
  db.set(`HP_Product_Value_${productID}`, req.body.value)
  db.set(`HP_Product_Currency_${productID}`, req.body.currency)
  db.set(`HP_Product_ImageURL_${productID}`, req.body.imgURL)
  db.set(`HP_Product_Description_${productID}`, req.body.description)
  db.set(`HP_Product_Type_${productID}`, req.body.type)
  db.set(`HP_IsProduct_${productID}`, true)

  res.json({ message: "Product added", result: `A URL de pagamento criada é a seguinte: https://api.hypeds.com/v7/payments/checkout?productID=${productID}` })
})

//REMOVE PRODUCT

router.get('/removeProduct', function(req, res) {
  let token = req.cookies.SessionId
  let userID = db.get(`SessionUser_${token}`)
  let isLogged = db.get(`SessionIsLogged_${token}_${userID}`)
  
  let id = db.get(`HPD_UserID_${userID}`)
  
  let userDiscordID = db.get(`HPD_User_DiscordID_${id}`)
  let nickName = db.get(`HPD_User_Nickname_${id}`)
  let isStaff = db.get(`HPD_User_IsStaff_${id}`)
  
  if(isLogged !== true) return res.redirect(`https://www.hypeds.com/login?redirectTo=https://api.hypeds.com/v6/payments/addProduct`);

  if(isStaff !== "true") return res.redirect(`https://api.hypeds.com/v6/oauth2/logout?redirectTo=https://api.hypeds.com/v6/payments/addProduct`);

  request.get(`https://v4.hypeds.com/api/users/${userDiscordID}`, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      res.send(`<!DOCTYPE html>
<html style="font-size: 16px;" lang="en"><head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <meta name="keywords" content="HYPED | STAFF Dashboard, REMOVA UM PRODUTO">
    <meta name="description" content="">
    <title>HYPED | RemoveProduct</title>
    <link rel="stylesheet" href="https://beta.hypeds.com/css/HypedLibv5.css" media="screen">
    <link rel="stylesheet" href="https://www.hypeds.com/css/RemoveProduct.css" media="screen">
    <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
    <link id="u-page-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Oswald:200,300,400,500,600,700">
    <meta name="theme-color" content="#478ac9">
    <meta name="twitter:site" content="@">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="RemoveProduct">
    <meta name="twitter:description" content="New_Hyped">
    <meta property="og:title" content="RemoveProduct">
    <meta property="og:type" content="website">
  </head>
  <body class="u-body u-xl-mode" data-lang="en">
    <section class="u-align-center u-black u-clearfix u-section-1" id="sec-9a14">
      <div class="u-clearfix u-sheet u-sheet-1">
        <img class="u-image u-image-contain u-image-default u-image-1" src="https://www.hypeds.com/images/hyped.png" alt="" data-image-width="640" data-image-height="642" data-href="https://api.hypeds.com/v6/payments/dashboard">
        <img class="u-image u-image-round u-preserve-proportions u-radius-50 u-image-2" src="${JSON.parse(data).avatarURL}" alt="" data-image-width="1024" data-image-height="1024">
        <h1 class="u-text u-text-default u-text-1">HYPED | STAFF Dashboard</h1>
        <h3 class="u-text u-text-default u-text-2">
          <a href="https://api.hypeds.com/v6/oauth2/logout" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-custom-color-1 u-btn-1">LOGOUT</a>
        </h3>
      </div>
    </section>
    <section class="u-align-center u-clearfix u-image u-shading u-section-2" src="" data-image-width="1920" data-image-height="1080" id="sec-6e81">
      <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
        <h1 class="u-custom-font u-font-oswald u-text u-text-default u-title u-text-1">REMOVA UM PRODUTO</h1>
      </div>
    </section>
    <section class="u-align-center u-clearfix u-grey-80 u-section-3" id="sec-da44">
      <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
        <div class="u-form u-form-1">
          <form method="POST" class="u-clearfix u-form-spacing-15 u-form-vertical u-inner-form" style="padding: 15px;" source="email" name="form">
            <div class="u-form-group u-form-name u-label-top u-form-group-1">
              <label for="name-6797" class="u-label">ID do Produto</label>
              <input type="text" placeholder="ID do produto" id="name-6797" name="productID" class="u-border-1 u-border-grey-30 u-grey-75 u-input u-input-rectangle u-radius-10 u-input-1" required="">
            </div>
            <div class="u-align-left u-form-group u-form-submit u-label-top u-form-group-2">
              <button type="submit" value="submit" class="u-border-none u-btn u-btn-round u-btn-submit u-button-style u-custom-color-1 u-radius-10 u-btn-1">Remover</button>
            </div>
          </form>
        </div>
      </div>
    </section>
    <section class="u-clearfix u-grey-75 u-section-4" id="sec-7063">
      <div class="u-clearfix u-sheet u-sheet-1">
        <h3 class="u-text u-text-1">O que é o ID do produto?</h3>
        <p class="u-text u-text-2">No final de cada URL de pagamento a um query&nbsp; (objeto após a interrogação: https://www.hypeds.com/teste?queryGostoso), chamado de productID, você ira pegar o texto que fica após o sinal de igual da url, ex:<br>
          <br>
          <a class="anchor-1MIwyf anchorUnderlineOnHover-2qPutX u-active-none u-border-none u-btn u-button-style u-hover-none u-none u-text-palette-1-base u-btn-1" title="https://api.hypeds.com/v6/payments/checkout?productID=5ak4kypt" href="https://api.hypeds.com/v6/payments/checkout?productID=5ak4kypt" rel="noreferrer noopener" target="_blank" role="button" tabindex="0">https://api.hypeds.com/v6/payments/checkout?productID=5ak4kypt</a>&nbsp;<br>
          <br>Query: ?productID=5ak4kypt<br>
          <br>Seu ID é: 5ak4kypt
        </p>
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
    })
  })
});

router.post('/removeProduct', function(req, res) {
  let token = req.cookies.SessionId
  let userID = db.get(`SessionUser_${token}`)
  let isLogged = db.get(`SessionIsLogged_${token}_${userID}`)
  
  if(isLogged !== true) return res.redirect(`https://www.hypeds.com/login?redirectTo=https://api.hypeds.com/v6/dashboard`);

  let productID = req.body.productID

  db.delete(`HP_Product_Name_${productID}`)
  db.delete(`HP_Product_Store_${productID}`)
  db.delete(`HP_Product_Value_${productID}`)
  db.delete(`HP_Product_Currency_${productID}`)
  db.delete(`HP_Product_Type_${productID}`)
  db.set(`HP_IsProduct_${productID}`, false)

  res.json({ message: "Product deleted" })
})


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