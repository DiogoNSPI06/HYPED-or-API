const express = require('express');
const request = require('https')
const db = require('quick.db');
var router = express.Router();

//HANDLER
//https://api.hypeds.com/v7/payments/checkout ✅
//https://api.hypeds.com/v7/payments/checkout/selectPayment✅

//MP CHECKOUT
//https://api.hypeds.com/v7/payments/checkout/mp ✅
//https://api.hypeds.com/v7/payments/checkout/mp/aprooved ✅
//https://api.hypeds.com/v7/payments/checkout/mp/deny
//https://api.hypeds.com/v7/payments/checkout/mp/awaiting

//PAYPAL CHECKOUT
//https://api.hypeds.com/v7/payments/checkout/paypal ✅ 
//https://api.hypeds.com/v7/payments/checkout/paypal/aprooved ✅
//https://api.hypeds.com/v7/payments/checkout/paypal/deny


router.get('/', function(req, res) {
  let token = req.cookies.SessionId
  let userID = db.get(`SessionUser_${token}`)
  let isLogged = db.get(`SessionIsLogged_${token}_${userID}`)

  let id = db.get(`HPD_UserID_${userID}`)
  
  if(!req.query.productID) return res.json({ message: 'Missing productID parameter' })
  
  if(isLogged !== true) return res.redirect(`https://www.hypeds.com/login?redirectTo=https://api.hypeds.com/v7/payments/checkout?productID=${req.query.productID}`);

  let productID = req.query.productID
  
  let isProduct = db.get(`HP_IsProduct_${productID}`)
  if(!isProduct) return res.json({ message: 'Invalid product' })

  let productName = db.get(`HP_Product_Name_${productID}`)
  let productStore = db.get(`HP_Product_Store_${productID}`)
  let productType = db.get(`HP_Product_Type_${productID}`)
  let Value = db.get(`HP_Product_Value_${productID}`)
  let Currency = db.get(`HP_Product_Currency_${productID}`)
  let imageURL = db.get(`HP_Product_ImageURL_${productID}`)
  let Description = db.get(`HP_Product_Description_${productID}`)

  let username = db.get(`HPD_User_FirstName_${id}`)
  let sobrenome = db.get(`HPD_User_SecondName_${id}`)
  let usermail = db.get(`HPD_User_Email_${id}`)
  let discordUsername = db.get(`HPD_User_DiscordNickname_${id}`)

  let time = "7d e 18hrs"

  if(req.query.json === "true") return res.send({ productID: productID, productName: productName, productStore: productStore, Value: Value, Currency: Currency, imageURL: imageURL, Description: Description })

  let value = Value

  if(productType === "minecraft") {
    res.send(`<!DOCTYPE html>
<html style="font-size: 16px;" lang="en"><head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <meta name="keywords" content="HOME&nbsp; &nbsp; LOJA&nbsp; &nbsp;DASHBOARD, Um nome bem longo ou não de um produto, R$ ${value}">
    <meta name="description" content="">
    <title>HYPED MC | Produto</title>
    <link rel="stylesheet" href="https://www.hypeds.com/css/HypedLibv5.css" media="screen">
<link rel="stylesheet" href="https://www.hypeds.com/css/HPD_vips.css" media="screen">
    <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
    <meta name="theme-color" content="#478ac9">
    <meta name="twitter:site" content="@">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="HPD_vips">
    <meta name="twitter:description" content="New_Hyped">
    <meta property="og:title" content="HPD_vips">
    <meta property="og:type" content="website">
  </head>
  <body class="u-body u-xl-mode" data-lang="en">
    <section class="u-align-center u-clearfix u-custom-color-1 u-section-1" id="sec-ef01">
      <div class="u-clearfix u-sheet u-valign-middle-lg u-sheet-1">
        <img class="u-image u-image-contain u-image-default u-image-1" src="https://www.hypeds.com/images/hyped.png" alt="" data-image-width="640" data-image-height="642" data-href="https://www.hypeds.com">
        <h1 class="u-text u-text-default-lg u-text-default-md u-text-default-sm u-text-default-xl u-text-1">
          <a href="https://loja.hypeds.com/" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-custom-color-3 u-btn-1">HOME</a>&nbsp; &nbsp; <a href="https://loja.hypeds.com/produtos" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-custom-color-3 u-btn-2">LOJA</a>&nbsp; &nbsp;<a href="https://loja.hypeds.com/login" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-custom-color-3 u-btn-3">DASHBOARD</a>
        </h1>
      </div>
    </section>
    <section class="u-border-2 u-border-grey-75 u-clearfix u-grey-75 u-section-2" id="sec-475e">
      <div class="u-clearfix u-sheet u-sheet-1">
        <h1 class="u-text u-text-1">${productName}</h1>
        <div class="u-container-style u-custom-color-1 u-group u-radius-20 u-shape-round u-group-1">
          <div class="u-container-layout u-valign-top-md u-container-layout-1">
            <div class="u-container-style u-custom-color-3 u-group u-radius-10 u-shape-round u-group-2">
              <div class="u-container-layout u-valign-middle-xl u-container-layout-2">
                <p class="u-text u-text-2"><span class="u-file-icon u-icon u-text-white u-icon-1"><img src="https://www.hypeds.com/images/66163-17.png" alt=""></span>&nbsp;TERMINA EM: ${time}
                </p>
              </div>
            </div>
            <p class="u-text u-text-3"><span class="u-file-icon u-icon u-text-white u-icon-2"><img src="https://www.hypeds.com/images/879757-18.png" alt=""></span>&nbsp;Desconto: <span style="font-weight: 700;">10%</span>
            </p>
          </div>
        </div>
        <img class="u-image u-image-round u-preserve-proportions u-radius-20 u-image-1" src="${imageURL}" alt="" data-image-width="1024" data-image-height="1024">
        <h6 class="u-text u-text-default u-text-4">De: R$ ${~~Value + 10.90}</h6>
        <h1 class="u-text u-text-default u-text-5">R$ ${Value}</h1>
        <div class="u-form u-form-1">
          <form method="POST" class="u-clearfix u-form-horizontal u-form-spacing-10 u-inner-form" source="email" name="form" style="padding: 10px;">
            <div class="u-form-group u-form-name u-label-none">
              <label for="name-a66d" class="u-label">Name</label>
              <input type="text" placeholder="Digite seu nickname" id="name-a66d" name="nickname" class="u-border-1 u-border-grey-30 u-grey-80 u-input u-input-rectangle u-radius-10" required="">
            </div>
            <div class="u-align-right u-form-group u-form-submit u-label-none">
              <button type="submit" value="submit" class="u-border-none u-btn u-btn-round u-btn-submit u-button-style u-gradient u-hover-custom-color-2 u-none u-radius-10 u-btn-1"><span class="u-file-icon u-icon u-text-white u-icon-3"><img src="https://www.hypeds.com/images/2838838-8c0c1801.png" alt=""></span>&nbsp;<b>COMPRAR</b>
                <br>
              </button>
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
        <p class="u-text u-text-default u-text-3">© HYPED GROUP 2023</p>
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

  res.send(`<!DOCTYPE html>
<html style="font-size: 16px;" lang="en"><head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <meta name="keywords" content="R$: ${value}">
    <meta name="description" content="">
    <title>HYPED | Checkout</title>
    <link rel="shortcut icon" href="https://static.wixstatic.com/media/a926b2_cfc2b507c19546d88a6a2231b832b022%7Emv2.png/v1/fill/w_32%2Ch_32%2Clg_1%2Cusm_0.66_1.00_0.01/a926b2_cfc2b507c19546d88a6a2231b832b022%7Emv2.png" type="image/png">
    <link rel="stylesheet" href="https://beta.hypeds.com/css/HypedLibv5.css" media="screen">
    <link rel="stylesheet" href="https://www.hypeds.com/css/newCheckout.css" media="screen">
    <script class="u-script" type="text/javascript" src="https://www.hypeds.com/js/jquery.js" defer=""></script>
    <script class="u-script" type="text/javascript" src="https://www.hypeds.com/js/HypedLib.js" defer=""></script>
    <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
  </head>
  <body class="u-body u-xl-mode" data-lang="en"><header class="u-clearfix u-grey-70 u-header u-header" id="sec-011c"><div class="u-clearfix u-sheet u-sheet-1">
        <a href="https://www.hypeds.com/login?redirectTo=https://www.hypeds.com/dashboard" class="u-active-grey-75 u-border-1 u-border-grey-30 u-border-hover-black u-btn u-btn-round u-button-style u-grey-90 u-hover-grey-80 u-radius-12 u-text-active-white u-text-hover-white u-btn-1">Login</a>
        <nav class="u-menu u-menu-one-level u-offcanvas u-menu-1" data-responsive-from="MD">
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
</li><li class="u-nav-item"><a class="u-border-2 u-border-active-custom-color-1 u-border-grey-90 u-border-hover-custom-color-1 u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-radius-2 u-text-active-custom-color-1 u-text-grey-90 u-text-hover-custom-color-1" href="https://www.hypeds.com/hypedhost" style="padding: 10px 0px;">Hyped Host</a>
</li><li class="u-nav-item"><a class="u-border-2 u-border-active-custom-color-1 u-border-grey-90 u-border-hover-custom-color-1 u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-radius-2 u-text-active-custom-color-1 u-text-grey-90 u-text-hover-custom-color-1" href="https://www.hypeds.com/hypedcloud" style="padding: 10px 0px;">Hyped Cloud</a>
</li></ul>
          </div>
          <div class="u-custom-menu u-nav-container-collapse">
            <div class="u-black u-container-style u-inner-container-layout u-opacity u-opacity-95 u-sidenav">
              <div class="u-inner-container-layout u-sidenav-overflow">
                <div class="u-menu-close"></div>
                <ul class="u-align-center u-nav u-popupmenu-items u-unstyled u-nav-2"><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com">Home</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/hypedbot">Hyped Bot</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/hypedmusic">Hyped Music</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/hypedhost">Hyped Host</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/hypedcloud">Hyped Cloud</a>
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
    <section class="u-align-center u-clearfix u-grey-80 u-section-1" id="sec-0288">
      <div class="u-align-left u-clearfix u-sheet u-sheet-1">
        <p class="u-text u-text-default u-text-1"><span class="u-icon u-text-white u-icon-1"><svg class="u-svg-content" viewBox="0 0 54.757 54.757" x="0px" y="0px" style="width: 1em; height: 1em;"><path d="M40.94,5.617C37.318,1.995,32.502,0,27.38,0c-5.123,0-9.938,1.995-13.56,5.617c-6.703,6.702-7.536,19.312-1.804,26.952
	L27.38,54.757L42.721,32.6C48.476,24.929,47.643,12.319,40.94,5.617z M27.557,26c-3.859,0-7-3.141-7-7s3.141-7,7-7s7,3.141,7,7
	S31.416,26,27.557,26z"></path></svg><img></span>
          <span style="font-size: 20px;"><b>&nbsp;SUAS INFORMAÇÕES</b>
          </span>
        </p>
        <blockquote class="u-border-custom-color-1 u-text u-text-2">NOME: ${username}<br>SOBRENOME: ${sobrenome}<br>E-MAIL: ${usermail}<br>DISCORD: ${discordUsername}
        </blockquote>
        <a href="?editInfo=true" class="u-border-none u-btn u-btn-round u-button-style u-custom-color-1 u-hover-custom-color-2 u-radius-10 u-btn-1">EDITAR</a>
      </div>
    </section>
    <section class="u-align-center-md u-align-center-sm u-align-center-xs u-clearfix u-grey-75 u-section-2" id="sec-e2cb">
      <div class="u-clearfix u-sheet u-valign-bottom-lg u-sheet-1">
        <div class="u-align-left u-container-style u-custom-color-1 u-expanded-width-xs u-group u-radius-20 u-shape-round u-group-1">
          <div class="u-container-layout u-valign-top-md u-valign-top-sm u-valign-top-xs u-container-layout-1">
            <p class="u-text u-text-default u-text-1"><span class="u-file-icon u-icon u-text-white u-icon-1"><img src="https://www.hypeds.com/images/1250990-21.png" alt=""></span>
              <span style="font-weight: 700; font-size: 1.25rem;">&nbsp;RESUMO</span>
            </p>
            <p class="u-small-text u-text u-text-default u-text-variant u-text-2">Valor dos produtos: <span style="font-weight: 700;">${Currency} ${~~value + 10.90}</span>
            </p>
            <div class="u-border-1 u-border-white u-line u-line-horizontal u-line-1"></div>
            <div class="u-container-style u-custom-color-3 u-group u-radius-10 u-shape-round u-group-2">
              <div class="u-container-layout u-container-layout-2">
                <p class="u-small-text u-text u-text-variant u-text-3">Valor com desconto:</p>
                <h1 class="u-text u-text-4">${Currency}: ${value}</h1>
                <p class="u-small-text u-text u-text-variant u-text-5">(Economize: <span style="font-weight: 700;">${Currency} 10.00)</span>
                </p>
              </div>
            </div>
            <a href="https://api.hypeds.com/v7/payments/checkout/selectPayment?productID=${req.query.productID}" class="u-border-none u-btn u-btn-round u-button-style u-custom-color-3 u-hover-palette-1-dark-1 u-radius-10 u-btn-1">IR PARA O PAGAMENTO</a>
          </div>
        </div>
        <p class="u-text u-text-default u-text-6"><span class="u-file-icon u-icon u-text-white u-icon-2"><img src="https://www.hypeds.com/images/2430422-22.png" alt=""></span>
          <span style="font-size: 20px;"><b>&nbsp;PRODUTO</b>
          </span>
        </p>
        <div class="u-align-left u-container-style u-expanded-width-sm u-expanded-width-xs u-grey-80 u-group u-shape-rectangle u-group-3">
          <div class="u-container-layout u-container-layout-3">
            <h4 class="u-text u-text-default u-text-7">${productName}</h4>
            <p class="u-text u-text-8"><b>${Description}</b>
            </p>
            <h4 class="u-text u-text-default u-text-9">${Currency} ${value}</h4>
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
});

//ADDING THE NICKNAME TO THE SYSTEM
router.post('/', function(req, res) {
  //VERIFY IF USER IS LOGGED
  let token = req.cookies.SessionId
  let userID = db.get(`SessionUser_${token}`)
  let isLogged = db.get(`SessionIsLogged_${token}_${userID}`)
  if(isLogged!== true) return res.redirect(`https://api.hypeds.com/v6/oauth2/login?redirectTo=https://api.hypeds.com/v7/payments/checkout/selectPayment?productID=${productID}}`) 

  db.set(`HPD_MC_PaymentNickname_${userID}`, req.body.nickname)
  res.redirect(`https://api.hypeds.com/v7/payments/checkout/selectPayment?productID=${req.query.productID}`)
})

router.get('/selectPayment', function(req, res) {
  //VERIFY THE PRODUCT 
  if(!req.query.productID) return res.send({ message: "Please provide a productID query parameter" })
  
  //VERIFY IF USER IS LOGGED
  let token = req.cookies.SessionId
  let userID = db.get(`SessionUser_${token}`)
  let isLogged = db.get(`SessionIsLogged_${token}_${userID}`)
  if(isLogged!== true) return res.redirect(`https://api.hypeds.com/v6/oauth2/login?redirectTo=https://api.hypeds.com/v7/payments/checkout/selectPayment?productID=${productID}}`) 

  res.send(`<!DOCTYPE html>
<html style="font-size: 16px;" lang="en"><head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <meta name="keywords" content="Selecione seu método de pagamento">
    <meta name="description" content="">
    <title>HYPED | Select Payment</title>
    <link rel="stylesheet" href="https://www.hypeds.com/css/HypedLibv5.css" media="screen">
    <link rel="stylesheet" href="https://www.hypeds.com/css/HPD_paymentSelect.css" media="screen">
    <script class="u-script" type="text/javascript" src="https://www.hypeds.com/js/jquery.js" defer=""></script>
    <script class="u-script" type="text/javascript" src="https://www.hypeds.com/js/HypedLib.js" defer=""></script>
    <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
    <meta name="theme-color" content="#478ac9">
    <meta name="twitter:site" content="@">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="HPD_paymentSelect">
    <meta name="twitter:description" content="New_Hyped">
    <meta property="og:title" content="HPD_paymentSelect">
    <meta property="og:type" content="website">
  </head>
  <body class="u-body u-xl-mode" data-lang="en"><header class="u-clearfix u-grey-70 u-header u-header" id="sec-011c"><div class="u-clearfix u-sheet u-sheet-1">
        <a href="https://www.hypeds.com/login?redirectTo=https://www.hypeds.com/dashboard" class="u-active-grey-75 u-border-1 u-border-grey-30 u-border-hover-black u-btn u-btn-round u-button-style u-grey-90 u-hover-grey-80 u-radius-12 u-text-active-white u-text-hover-white u-btn-1">Login</a>
        <nav class="u-menu u-menu-one-level u-offcanvas u-menu-1" data-responsive-from="MD">
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
</li><li class="u-nav-item"><a class="u-border-2 u-border-active-custom-color-1 u-border-grey-90 u-border-hover-custom-color-1 u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-radius-2 u-text-active-custom-color-1 u-text-grey-90 u-text-hover-custom-color-1" href="https://www.hypeds.com/hypedhost" style="padding: 10px 0px;">Hyped Host</a>
</li><li class="u-nav-item"><a class="u-border-2 u-border-active-custom-color-1 u-border-grey-90 u-border-hover-custom-color-1 u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-radius-2 u-text-active-custom-color-1 u-text-grey-90 u-text-hover-custom-color-1" href="https://www.hypeds.com/hypedcloud" style="padding: 10px 0px;">Hyped Cloud</a>
</li></ul>
          </div>
          <div class="u-custom-menu u-nav-container-collapse">
            <div class="u-black u-container-style u-inner-container-layout u-opacity u-opacity-95 u-sidenav">
              <div class="u-inner-container-layout u-sidenav-overflow">
                <div class="u-menu-close"></div>
                <ul class="u-align-center u-nav u-popupmenu-items u-unstyled u-nav-2"><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com">Home</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/hypedbot">Hyped Bot</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/hypedmusic">Hyped Music</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/hypedhost">Hyped Host</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/hypedcloud">Hyped Cloud</a>
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
    <section class="u-align-left u-clearfix u-grey-75 u-section-1" id="sec-227e">
      <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
        <div class="u-align-center u-container-style u-grey-90 u-group u-radius-10 u-shape-round u-group-1">
          <div class="u-container-layout u-valign-top u-container-layout-1">
            <h1 class="u-text u-text-default u-text-1">Selecione seu método de pagamento</h1>
            <a href="https://api.hypeds.com/v7/payments/checkout/paypal?productID=${req.query.productID}" class="u-border-none u-btn u-btn-round u-button-style u-custom-color-1 u-hover-custom-color-2 u-radius-6 u-btn-1"><span class="u-file-icon u-icon"><img src="https://www.hypeds.com/images/888871.png" alt=""></span>&nbsp;PAYPAL CHECKOUT
            </a>
            <a href="https://api.hypeds.com/v7/payments/checkout/mp?productID=${req.query.productID}" class="u-border-none u-btn u-btn-round u-button-style u-custom-color-1 u-hover-custom-color-2 u-radius-6 u-btn-2"><span class="u-file-icon u-icon u-text-white u-icon-2"><img src="https://www.hypeds.com/images/3029336-78c04ffc.png" alt=""></span>&nbsp;MERCADO PAGO
            </a>
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
        <p class="u-text u-text-default u-text-3">© HYPED GROUP 2023</p>
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