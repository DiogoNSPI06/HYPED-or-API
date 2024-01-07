const express = require('express');
const nodemailer = require('nodemailer');
const db = require('quick.db');
var router = express.Router();

const data = require('./data.json')

router.get('/', function(req, res) {
  let redirectTo = req.query.redirectTo
  let callback = req.query.callback
  
  //VERIFY THE USER
  let token = req.cookies.SessionId
  let userID = db.get(`SessionUser_${token}`)
  let isLogged = db.get(`SessionIsLogged_${token}_${userID}`)

  let UID = db.get(`LGN_SessionUserID_${token}`)

  let isStaff = db.get(`HPD_User_IsStaff_${UID}`)
  let Email = db.get(`HPD_User_Email_${UID}`)
  
  if(isLogged !== true) return res.redirect(`https://api.hypeds.com/v7/oauth2/login`)
  
  let mailIsConfirmed = db.get(`HPD_User_MailIsConfirmed_${UID}`)
  if(mailIsConfirmed === true) {
    return res.redirect(redirectTo)
  }
  
  let temptoken = GenId(24, false, true, false)

  db.set(`Authorization_${UID}_${temptoken}_MailConfirm`, token)

  let Code = GenId(4, true, false, false)
  db.set(`HPD_Mail_Code_${UID}`, `${Code}`)

  SendMail(Email, Code)

  if(req.query.error === true) {
    return res.send(`<!DOCTYPE html>
<html style="font-size: 16px;" lang="en"><head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <meta name="keywords" content="Faça Login, Login com o HYPED">
    <title>HYPED | Confirme seu e-mail</title>
        <link rel="stylesheet" href="https://beta.hypeds.com/css/NexusLib_v1.1.css" media="screen">
        <link rel="stylesheet" href="https://beta.hypeds.com/css/HPD_2FA.css" media="screen">
        <link rel="stylesheet" href="https://beta.hypeds.com/css/HPD_Loader.css">
        <link rel="stylesheet" href="https://beta.hypeds.com/css/Sidebar.css" media="screen">
        <link rel="shortcut icon" href="https://beta.hypeds.com/images/logo.png" type="image/png">
        <script src="https://replit.com/public/js/repl-auth-v2.js"></script>
        <meta name="referrer" content="origin">
        <script>
            async function GetAPIVersion() {
                let response = await fetch("https://api.hypeds.com/version")
                let data = await response.json()

                return data.version
            }
            async function fetchData() {
                let apiversion = await GetAPIVersion()
                console.log("[HPD] Api version: " + apiversion)
            }

            document.addEventListener("DOMContentLoaded", function() {
                setTimeout(function() {
                    document.querySelector("body").classList.add("loaded");
                }, 500)
            });
            fetchData();

            async function ReSendCode() {
              let response = await fetch("https://api.hypeds.com/v7/oauth2/2fa/resendcode?uuid=${UID}&authorization=${temptoken}")
              let result = await response.json()

              let data = result.message

              if(data === "101") {
                return alert("Aguarde alguns segundos para tentar novamente")
              }
              if(data === "102") {
                return alert("Seus dados de Login estão adulterados")
              }
              if(data === "103") {
                return alert("Token de autorização expirado! Dê um refresh na página e tente novamente!")
              }
              if(data === "104") {
                return alert("Enviamos novamente seu código! Tenha certeza de verificar sua caixa de SPAM!")
              }
            }

            alert("Digite o código corretamente! Enviamos novamente um código para o seu e-mail!")
        </script>
    <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
    <link id="u-page-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Oswald:200,300,400,500,600,700">
  <meta data-intl-tel-input-cdn-path="intlTelInput/"></head>
  <body class="u-body u-xl-mode" data-lang="en"><header class="u-black u-border-2 u-border-grey-50 u-border-no-left u-border-no-right u-border-no-top u-box-shadow u-clearfix u-header u-header" id="sec-b24e"><div class="u-clearfix u-sheet u-sheet-1">
        <a href="https://www.hypeds.com" class="u-image u-logo u-image-1" data-image-width="640" data-image-height="642" title="hyped_home">
          <img src="https://beta.hypeds.com/images/hyped1.png" class="u-logo-image u-logo-image-1">
        </a>
        <nav class="u-menu u-menu-dropdown u-offcanvas u-menu-1" data-responsive-from="MD" data-submenu-level="on-click">
          <div class="menu-collapse" style="font-size: 1.25rem; letter-spacing: 0px; font-weight: 700; text-transform: uppercase;">
            <a class="u-button-style u-custom-active-border-color u-custom-border u-custom-border-color u-custom-border-radius u-custom-borders u-custom-hover-border-color u-custom-left-right-menu-spacing u-custom-padding-bottom u-custom-text-active-color u-custom-text-color u-custom-text-hover-color u-custom-text-shadow u-custom-top-bottom-menu-spacing u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base" href="#" style="padding: 4px; font-size: calc(1em + 8px);">
              <svg class="u-svg-link" viewBox="0 0 24 24"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#menu-hamburger"></use></svg>
              <svg class="u-svg-content" version="1.1" id="menu-hamburger" viewBox="0 0 16 16" x="0px" y="0px" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><g><rect y="1" width="16" height="2"></rect><rect y="7" width="16" height="2"></rect><rect y="13" width="16" height="2"></rect>
</g></svg>
            </a>
          </div>
          <div class="u-custom-menu u-nav-container">
            <ul class="u-nav u-spacing-30 u-unstyled u-nav-1"><li class="u-nav-item"><a class="u-border-2 u-border-active-white u-border-hover-white u-border-no-left u-border-no-right u-border-no-top u-border-white u-button-style u-nav-link u-text-active-white u-text-body-alt-color u-text-hover-white" href="https://www.hypeds.com/" style="padding: 10px 0px;">Home</a>
</li><li class="u-nav-item"><a class="u-border-2 u-border-active-white u-border-hover-white u-border-no-left u-border-no-right u-border-no-top u-border-white u-button-style u-nav-link u-text-active-white u-text-body-alt-color u-text-hover-white" style="padding: 10px 0px;">Bots</a><div class="u-nav-popup"><ul class="u-border-1 u-border-grey-90 u-h-spacing-20 u-nav u-unstyled u-v-spacing-10"><li class="u-nav-item"><a class="u-active-grey-75 u-black u-button-style u-hover-grey-80 u-nav-link" href="https://www.hypeds.com/hypedbot">HYPED BOT</a>
</li><li class="u-nav-item"><a class="u-active-grey-75 u-black u-button-style u-hover-grey-80 u-nav-link" href="https://www.hypeds.com/hypedmusic">HYPED MUSIC</a>
</li></ul>
</div>
</li><li class="u-nav-item"><a class="u-border-2 u-border-active-white u-border-hover-white u-border-no-left u-border-no-right u-border-no-top u-border-white u-button-style u-nav-link u-text-active-white u-text-body-alt-color u-text-hover-white" style="padding: 10px 0px;">Neot</a><div class="u-nav-popup"><ul class="u-border-1 u-border-grey-90 u-h-spacing-20 u-nav u-unstyled u-v-spacing-10"><li class="u-nav-item"><a class="u-active-grey-75 u-black u-button-style u-hover-grey-80 u-nav-link" href="https://www.neotcom.co/">Home</a>
</li><li class="u-nav-item"><a class="u-active-grey-75 u-black u-button-style u-hover-grey-80 u-nav-link" href="https://www.neotcom.co/products">Produtos</a>
</li><li class="u-nav-item"><a class="u-active-grey-75 u-black u-button-style u-hover-grey-80 u-nav-link" href="https://www.neotcom.co/login">Painel</a>
</li></ul>
</div>
</li><li class="u-nav-item"><a class="u-border-2 u-border-active-white u-border-hover-white u-border-no-left u-border-no-right u-border-no-top u-border-white u-button-style u-nav-link u-text-active-white u-text-body-alt-color u-text-hover-white" style="padding: 10px 0px;">Soluções</a><div class="u-nav-popup"><ul class="u-border-1 u-border-grey-90 u-h-spacing-20 u-nav u-unstyled u-v-spacing-10"><li class="u-nav-item"><a class="u-active-grey-75 u-black u-button-style u-hover-grey-80 u-nav-link" href="https://beta.hypeds.com/communities">Communities</a>
</li><li class="u-nav-item"><a class="u-active-grey-75 u-black u-button-style u-hover-grey-80 u-nav-link" href="https://www.hypeds.tv">Hyped TV</a>
</li><li class="u-nav-item"><a class="u-active-grey-75 u-black u-button-style u-hover-grey-80 u-nav-link" href="https://www.hypeds.com/minecraft">Minecraft</a>
</li><li class="u-nav-item"><a class="u-active-grey-75 u-black u-button-style u-hover-grey-80 u-nav-link" href="https://hpd.ink">ShortIT</a>
</li><li class="u-nav-item"><a class="u-active-grey-75 u-black u-button-style u-hover-grey-80 u-nav-link" href="https://shareit.hypeds.com">ShareIT</a>
</li><li class="u-nav-item"><a class="u-active-grey-75 u-black u-button-style u-hover-grey-80 u-nav-link" href="https://edu.hypeds.com">Education</a>
</li></ul>
</div>
</li><li class="u-nav-item"><a class="u-border-2 u-border-active-white u-border-hover-white u-border-no-left u-border-no-right u-border-no-top u-border-white u-button-style u-nav-link u-text-active-white u-text-body-alt-color u-text-hover-white" style="padding: 10px 0px;">Hosting</a><div class="u-nav-popup"><ul class="u-border-1 u-border-grey-90 u-h-spacing-20 u-nav u-unstyled u-v-spacing-10"><li class="u-nav-item"><a class="u-active-grey-75 u-black u-button-style u-hover-grey-80 u-nav-link" href="https://www.hypeds.com/hypedhost">HYPED HOSTING</a>
</li><li class="u-nav-item"><a class="u-active-grey-75 u-black u-button-style u-hover-grey-80 u-nav-link" href="https://www.hypeds.com/hypedcloud">HYPED CLOUD</a>
</li></ul>
</div>
</li></ul>
          </div>
          <div class="u-custom-menu u-nav-container-collapse">
            <div class="u-black u-container-style u-inner-container-layout u-sidenav u-sidenav-1" data-offcanvas-width="227">
              <div class="u-inner-container-layout u-sidenav-overflow" style="padding: 0px;">
                <div class="u-menu-close u-menu-close-1"></div>
                <ul class="u-align-left u-nav u-popupmenu-items u-spacing-15 u-unstyled u-nav-6"><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/">Home</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link">Bots</a><div class="u-nav-popup"><ul class="u-border-1 u-border-grey-90 u-h-spacing-20 u-nav u-unstyled u-v-spacing-10"><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/hypedbot">HYPED BOT</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/hypedmusic">HYPED MUSIC</a>
</li></ul>
</div>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link">Neot</a><div class="u-nav-popup"><ul class="u-border-1 u-border-grey-90 u-h-spacing-20 u-nav u-unstyled u-v-spacing-10"><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.neotcom.co/">Home</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.neotcom.co/products">Produtos</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.neotcom.co/login">Painel</a>
</li></ul>
</div>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link">Soluções</a><div class="u-nav-popup"><ul class="u-border-1 u-border-grey-90 u-h-spacing-20 u-nav u-unstyled u-v-spacing-10"><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://beta.hypeds.com/communities">Communities</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.tv">Hyped TV</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/minecraft">Minecraft</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://hpd.ink">ShortIT</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://shareit.hypeds.com">ShareIT</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://edu.hypeds.com">Education</a>
</li></ul>
</div>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link">Hosting</a><div class="u-nav-popup"><ul class="u-border-1 u-border-grey-90 u-h-spacing-20 u-nav u-unstyled u-v-spacing-10"><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/hypedhost">HYPED HOSTING</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/hypedcloud">HYPED CLOUD</a>
</li></ul>
</div>
</li></ul>
                <div class="u-border-3 u-border-white u-line u-line-horizontal u-line-1"></div>
                <h6 class="u-text u-text-default u-text-1">Mais da Hyped</h6>
                <h3 class="u-text u-text-default u-text-2">
                  <a href="https://hypeds.tv" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-body-alt-color u-btn-1">Hyped Tv<br>
                  </a>
                  <br>
                  <a href="https://hpd.ink" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-white u-btn-2">ShortIT</a>
                  <br>
                  <br>
                  <a href="https://www.hypeds.com/" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-body-alt-color u-btn-3">Hyped Group</a>
                  <br>
                  <br>
                  <a href="https://www.hypeds.com/hypedbot" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-body-alt-color u-btn-4">Hyped Bots</a>
                  <br>
                  <br>
                  <a href="https://beta.hypeds.com/hypedhosting" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-body-alt-color u-btn-5">Hyped Hosting</a>
                  <br>
                </h3>
              </div>
            </div>
            <div class="u-menu-overlay"></div>
          </div>
        </nav>
        <a href="https://www.hypeds.com/login?redirectTo=https://www.hypeds.com/dashboard" class="u-border-1 u-border-white u-btn u-btn-round u-button-style u-none u-radius-10 u-text-body-alt-color u-text-hover-white u-btn-6">Login</a>
      </div></header>
    <section class="u-clearfix u-image u-section-1" id="sec-20fd" data-image-width="1920" data-image-height="1080">
      <div class="u-clearfix u-sheet u-valign-middle-sm u-valign-middle-xs u-sheet-1">
        <h1 class="u-custom-font u-font-oswald u-text u-text-body-alt-color u-text-default u-text-1">Confirme seu e-mail</h1>
      </div>
    </section>
    <section class="u-align-center-md u-align-center-sm u-align-center-xs u-black u-clearfix u-section-2" id="sec-155b">
      <div class="u-clearfix u-sheet u-valign-bottom-md u-sheet-1">
        <div class="u-align-center u-container-style u-expanded-width-xs u-grey-90 u-group u-radius-15 u-shape-round u-group-1">
          <div class="u-container-layout u-container-layout-1">
            <h1 class="u-custom-font u-font-oswald u-text u-text-body-alt-color u-text-default u-text-1">Digite o código</h1>
            <p class="u-text u-text-2">&nbsp;Digite o código de quatro dígitos que enviamos ao seu e-mail cadastrado.</p>
            <div class="u-form u-form-1">
              <form method="POST" class="u-clearfix u-form-spacing-10 u-form-vertical u-inner-form" source="email" name="form" style="padding: 10px;">
                <div class="u-form-group u-form-partition-factor-4 u-label-none u-form-group-1">
                  <label for="text-557c" class="u-label"></label>
                  <input type="text" placeholder="" id="text-557c" name="num1" class="u-input u-input-rectangle" required="required" autofocus="autofocus" maxlength="1">
                </div>
                <div class="u-form-group u-form-partition-factor-4 u-label-none u-form-group-2">
                  <label for="text-82b7" class="u-label"></label>
                  <input type="text" placeholder="" id="text-82b7" name="num2" class="u-input u-input-rectangle" required="required" maxlength="1">
                </div>
                <div class="u-form-group u-form-partition-factor-4 u-label-none u-form-group-3">
                  <label for="text-2969" class="u-label"></label>
                  <input type="text" placeholder="" id="text-2969" name="num3" class="u-input u-input-rectangle" required="required" maxlength="1">
                </div>
                <div class="u-form-group u-form-partition-factor-4 u-label-none u-form-group-4">
                  <label for="text-9b15" class="u-label"></label>
                  <input type="text" placeholder="" id="text-9b15" name="num4" class="u-input u-input-rectangle" required="required" maxlength="1">
                </div>
                <div class="u-align-center u-form-group u-form-submit u-label-none">
                  <input type="submit" value="CONFIRMAR" class="u-border-none u-btn u-btn-round u-btn-submit u-button-style u-custom-color-1 u-radius-10 u-btn-1">
                </div>
              </form>
            </div>
            <h3 class="u-custom-font u-font-oswald u-text u-text-3">Não recebeu nenhum código?</h3>
            <p class="u-text u-text-4"> Verifique sua caixa de spam ou clique no botão abaixo para tentar novamente.</p>
            <button onclick="ReSendCode()" class="u-border-none u-btn u-btn-round u-button-style u-custom-color-1 u-radius-10 u-btn-2">RE-ENVIAR</button>
          </div>
        </div>
      </div>
    </section>
    <section class="u-clearfix u-container-align-center u-image u-section-3" id="sec-06df" data-image-width="1920" data-image-height="1080">
      <div class="u-clearfix u-sheet u-sheet-1"></div>
    </section>
    
    
    <footer class="u-align-center u-clearfix u-footer u-grey-90 u-footer" id="sec-7a5d"><div class="u-clearfix u-sheet u-sheet-1">
        <h5 class="u-text u-text-default u-text-1">Certificados</h5>
        <h6 class="u-text u-text-default u-text-2"> © HYPED GROUP 2023</h6>
        <a href="https://www.hypeds.com/login?redirectTo=https://www.hypeds.com/" class="u-border-1 u-border-white u-btn u-btn-round u-button-style u-none u-radius-10 u-text-body-alt-color u-text-hover-white u-btn-1">Login</a>
        <h6 class="u-text u-text-default u-text-3">Links Úteis<br>
          <a href="https://status.hypeds.com/" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-custom-color-1 u-btn-2">Status Page<br>
          </a>
          <a href="https://api.hypeds.com/docs" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-custom-color-1 u-btn-3" target="_blank">API</a>
          <br>
          <a href="https://www.hypeds.com/discord" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-custom-color-1 u-btn-4">Discord</a>
          <br>
          <a href="https://hpd.ink" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-custom-color-1 u-btn-5">Encurtador</a>
        </h6>
        <img class="u-image u-image-contain u-image-default u-image-1" src="https://beta.hypeds.com/images/google-safe-browsing.png" alt="" data-image-width="844" data-image-height="243" data-href="https://transparencyreport.google.com/safe-browsing/search?url=https:%2F%2Fwww.hypeds.com&amp;hl=pt_BR" data-target="_blank">
        <h6 class="u-text u-text-default u-text-4">
          <a href="https://www.hypeds.com/about" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-custom-color-1 u-btn-6">Sobre Nós</a>
          <br>
          <a href="https://www.hypeds.com/support" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-custom-color-1 u-btn-7">Suporte</a>
          <br>
          <a href="https://www.hypeds.com/privacypolicy" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-custom-color-1 u-btn-8">Políticas de Privacidade<br>
          </a>
          <a href="https://www.hypeds.com/tos" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-custom-color-1 u-btn-9">Termos de Serviço</a>
          <br>
          <a href="https://www.hypeds.com/cookies" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-custom-color-1 u-btn-10">Cookies</a>
        </h6>
        <img class="u-image u-image-contain u-image-default u-image-2" src="https://beta.hypeds.com/images/ssl-secure.png" alt="" data-image-width="713" data-image-height="200" data-href="https://www.sslchecker.com/sslchecker?su=da98d944ba1834a64794f688375a401b" data-target="_blank">
        <div class="u-social-icons u-spacing-10 u-social-icons-1">
          <a class="u-social-url" title="facebook" target="_blank" href="https://www.hypeds.com/facebook"><span class="u-icon u-social-facebook u-social-icon u-text-white u-icon-1"><svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 112 112" style=""><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-753e"></use></svg><svg class="u-svg-content" viewBox="0 0 112 112" x="0" y="0" id="svg-753e"><path fill="currentColor" d="M75.5,28.8H65.4c-1.5,0-4,0.9-4,4.3v9.4h13.9l-1.5,15.8H61.4v45.1H42.8V58.3h-8.8V42.4h8.8V32.2
c0-7.4,3.4-18.8,18.8-18.8h13.8v15.4H75.5z"></path></svg></span>
          </a>
          <a class="u-social-url" title="twitter" target="_blank" href="https://www.hypeds.com/twitter"><span class="u-icon u-social-icon u-social-twitter u-text-white u-icon-2"><svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 112 112" style=""><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-ec45"></use></svg><svg class="u-svg-content" viewBox="0 0 112 112" x="0" y="0" id="svg-ec45"><path fill="currentColor" d="M92.2,38.2c0,0.8,0,1.6,0,2.3c0,24.3-18.6,52.4-52.6,52.4c-10.6,0.1-20.2-2.9-28.5-8.2
	c1.4,0.2,2.9,0.2,4.4,0.2c8.7,0,16.7-2.9,23-7.9c-8.1-0.2-14.9-5.5-17.3-12.8c1.1,0.2,2.4,0.2,3.4,0.2c1.6,0,3.3-0.2,4.8-0.7
	c-8.4-1.6-14.9-9.2-14.9-18c0-0.2,0-0.2,0-0.2c2.5,1.4,5.4,2.2,8.4,2.3c-5-3.3-8.3-8.9-8.3-15.4c0-3.4,1-6.5,2.5-9.2
	c9.1,11.1,22.7,18.5,38,19.2c-0.2-1.4-0.4-2.8-0.4-4.3c0.1-10,8.3-18.2,18.5-18.2c5.4,0,10.1,2.2,13.5,5.7c4.3-0.8,8.1-2.3,11.7-4.5
	c-1.4,4.3-4.3,7.9-8.1,10.1c3.7-0.4,7.3-1.4,10.6-2.9C98.9,32.3,95.7,35.5,92.2,38.2z"></path></svg></span>
          </a>
          <a class="u-social-url" title="instagram" target="_blank" href="https://www.hypeds.com/instagram"><span class="u-icon u-social-icon u-social-instagram u-text-white u-icon-3"><svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 112 112" style=""><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-ea92"></use></svg><svg class="u-svg-content" viewBox="0 0 112 112" x="0" y="0" id="svg-ea92"><path fill="currentColor" d="M55.9,32.9c-12.8,0-23.2,10.4-23.2,23.2s10.4,23.2,23.2,23.2s23.2-10.4,23.2-23.2S68.7,32.9,55.9,32.9z
	 M55.9,69.4c-7.4,0-13.3-6-13.3-13.3c-0.1-7.4,6-13.3,13.3-13.3s13.3,6,13.3,13.3C69.3,63.5,63.3,69.4,55.9,69.4z"></path><path fill="#FFFFFF" d="M79.7,26.8c-3,0-5.4,2.5-5.4,5.4s2.5,5.4,5.4,5.4c3,0,5.4-2.5,5.4-5.4S82.7,26.8,79.7,26.8z"></path><path fill="currentColor" d="M78.2,11H33.5C21,11,10.8,21.3,10.8,33.7v44.7c0,12.6,10.2,22.8,22.7,22.8h44.7c12.6,0,22.7-10.2,22.7-22.7
	V33.7C100.8,21.1,90.6,11,78.2,11z M91,78.4c0,7.1-5.8,12.8-12.8,12.8H33.5c-7.1,0-12.8-5.8-12.8-12.8V33.7
	c0-7.1,5.8-12.8,12.8-12.8h44.7c7.1,0,12.8,5.8,12.8,12.8V78.4z"></path></svg></span>
          </a>
        </div>
      </div></footer>
</body></html>`)
  }
  
  return res.send(`<!DOCTYPE html>
<html style="font-size: 16px;" lang="en"><head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <meta name="keywords" content="Faça Login, Login com o HYPED">
    <title>HYPED | Confirme seu e-mail</title>
        <link rel="stylesheet" href="https://beta.hypeds.com/css/NexusLib_v1.1.css" media="screen">
        <link rel="stylesheet" href="https://beta.hypeds.com/css/HPD_2FA.css" media="screen">
        <link rel="stylesheet" href="https://beta.hypeds.com/css/HPD_Loader.css">
        <link rel="stylesheet" href="https://beta.hypeds.com/css/Sidebar.css" media="screen">
        <link rel="shortcut icon" href="https://beta.hypeds.com/images/logo.png" type="image/png">
        <script src="https://replit.com/public/js/repl-auth-v2.js"></script>
        <meta name="referrer" content="origin">
        <script>
            async function GetAPIVersion() {
                let response = await fetch("https://api.hypeds.com/version")
                let data = await response.json()

                return data.version
            }
            async function fetchData() {
                let apiversion = await GetAPIVersion()
                console.log("[HPD] Api version: " + apiversion)
            }

            document.addEventListener("DOMContentLoaded", function() {
                setTimeout(function() {
                    document.querySelector("body").classList.add("loaded");
                }, 500)
            });
            fetchData();

            async function ReSendCode() {
              let response = await fetch("https://api.hypeds.com/v7/oauth2/2fa/resendcode?uuid=${UID}&authorization=${temptoken}")
              let result = await response.json()

              let data = result.message

              if(data === "101") {
                return alert("Aguarde alguns segundos para tentar novamente")
              }
              if(data === "102") {
                return alert("Seus dados de Login estão adulterados")
              }
              if(data === "103") {
                return alert("Token de autorização expirado! Dê um refresh na página e tente novamente!")
              }
              if(data === "104") {
                return alert("Enviamos novamente seu código! Tenha certeza de verificar sua caixa de SPAM!")
              }
            }
        </script>
    <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
    <link id="u-page-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Oswald:200,300,400,500,600,700">
  <meta data-intl-tel-input-cdn-path="intlTelInput/"></head>
  <body class="u-body u-xl-mode" data-lang="en"><header class="u-black u-border-2 u-border-grey-50 u-border-no-left u-border-no-right u-border-no-top u-box-shadow u-clearfix u-header u-header" id="sec-b24e"><div class="u-clearfix u-sheet u-sheet-1">
        <a href="https://www.hypeds.com" class="u-image u-logo u-image-1" data-image-width="640" data-image-height="642" title="hyped_home">
          <img src="https://beta.hypeds.com/images/hyped1.png" class="u-logo-image u-logo-image-1">
        </a>
        <nav class="u-menu u-menu-dropdown u-offcanvas u-menu-1" data-responsive-from="MD" data-submenu-level="on-click">
          <div class="menu-collapse" style="font-size: 1.25rem; letter-spacing: 0px; font-weight: 700; text-transform: uppercase;">
            <a class="u-button-style u-custom-active-border-color u-custom-border u-custom-border-color u-custom-border-radius u-custom-borders u-custom-hover-border-color u-custom-left-right-menu-spacing u-custom-padding-bottom u-custom-text-active-color u-custom-text-color u-custom-text-hover-color u-custom-text-shadow u-custom-top-bottom-menu-spacing u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base" href="#" style="padding: 4px; font-size: calc(1em + 8px);">
              <svg class="u-svg-link" viewBox="0 0 24 24"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#menu-hamburger"></use></svg>
              <svg class="u-svg-content" version="1.1" id="menu-hamburger" viewBox="0 0 16 16" x="0px" y="0px" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><g><rect y="1" width="16" height="2"></rect><rect y="7" width="16" height="2"></rect><rect y="13" width="16" height="2"></rect>
</g></svg>
            </a>
          </div>
          <div class="u-custom-menu u-nav-container">
            <ul class="u-nav u-spacing-30 u-unstyled u-nav-1"><li class="u-nav-item"><a class="u-border-2 u-border-active-white u-border-hover-white u-border-no-left u-border-no-right u-border-no-top u-border-white u-button-style u-nav-link u-text-active-white u-text-body-alt-color u-text-hover-white" href="https://www.hypeds.com/" style="padding: 10px 0px;">Home</a>
</li><li class="u-nav-item"><a class="u-border-2 u-border-active-white u-border-hover-white u-border-no-left u-border-no-right u-border-no-top u-border-white u-button-style u-nav-link u-text-active-white u-text-body-alt-color u-text-hover-white" style="padding: 10px 0px;">Bots</a><div class="u-nav-popup"><ul class="u-border-1 u-border-grey-90 u-h-spacing-20 u-nav u-unstyled u-v-spacing-10"><li class="u-nav-item"><a class="u-active-grey-75 u-black u-button-style u-hover-grey-80 u-nav-link" href="https://www.hypeds.com/hypedbot">HYPED BOT</a>
</li><li class="u-nav-item"><a class="u-active-grey-75 u-black u-button-style u-hover-grey-80 u-nav-link" href="https://www.hypeds.com/hypedmusic">HYPED MUSIC</a>
</li></ul>
</div>
</li><li class="u-nav-item"><a class="u-border-2 u-border-active-white u-border-hover-white u-border-no-left u-border-no-right u-border-no-top u-border-white u-button-style u-nav-link u-text-active-white u-text-body-alt-color u-text-hover-white" style="padding: 10px 0px;">Neot</a><div class="u-nav-popup"><ul class="u-border-1 u-border-grey-90 u-h-spacing-20 u-nav u-unstyled u-v-spacing-10"><li class="u-nav-item"><a class="u-active-grey-75 u-black u-button-style u-hover-grey-80 u-nav-link" href="https://www.neotcom.co/">Home</a>
</li><li class="u-nav-item"><a class="u-active-grey-75 u-black u-button-style u-hover-grey-80 u-nav-link" href="https://www.neotcom.co/products">Produtos</a>
</li><li class="u-nav-item"><a class="u-active-grey-75 u-black u-button-style u-hover-grey-80 u-nav-link" href="https://www.neotcom.co/login">Painel</a>
</li></ul>
</div>
</li><li class="u-nav-item"><a class="u-border-2 u-border-active-white u-border-hover-white u-border-no-left u-border-no-right u-border-no-top u-border-white u-button-style u-nav-link u-text-active-white u-text-body-alt-color u-text-hover-white" style="padding: 10px 0px;">Soluções</a><div class="u-nav-popup"><ul class="u-border-1 u-border-grey-90 u-h-spacing-20 u-nav u-unstyled u-v-spacing-10"><li class="u-nav-item"><a class="u-active-grey-75 u-black u-button-style u-hover-grey-80 u-nav-link" href="https://beta.hypeds.com/communities">Communities</a>
</li><li class="u-nav-item"><a class="u-active-grey-75 u-black u-button-style u-hover-grey-80 u-nav-link" href="https://www.hypeds.tv">Hyped TV</a>
</li><li class="u-nav-item"><a class="u-active-grey-75 u-black u-button-style u-hover-grey-80 u-nav-link" href="https://www.hypeds.com/minecraft">Minecraft</a>
</li><li class="u-nav-item"><a class="u-active-grey-75 u-black u-button-style u-hover-grey-80 u-nav-link" href="https://hpd.ink">ShortIT</a>
</li><li class="u-nav-item"><a class="u-active-grey-75 u-black u-button-style u-hover-grey-80 u-nav-link" href="https://shareit.hypeds.com">ShareIT</a>
</li><li class="u-nav-item"><a class="u-active-grey-75 u-black u-button-style u-hover-grey-80 u-nav-link" href="https://edu.hypeds.com">Education</a>
</li></ul>
</div>
</li><li class="u-nav-item"><a class="u-border-2 u-border-active-white u-border-hover-white u-border-no-left u-border-no-right u-border-no-top u-border-white u-button-style u-nav-link u-text-active-white u-text-body-alt-color u-text-hover-white" style="padding: 10px 0px;">Hosting</a><div class="u-nav-popup"><ul class="u-border-1 u-border-grey-90 u-h-spacing-20 u-nav u-unstyled u-v-spacing-10"><li class="u-nav-item"><a class="u-active-grey-75 u-black u-button-style u-hover-grey-80 u-nav-link" href="https://www.hypeds.com/hypedhost">HYPED HOSTING</a>
</li><li class="u-nav-item"><a class="u-active-grey-75 u-black u-button-style u-hover-grey-80 u-nav-link" href="https://www.hypeds.com/hypedcloud">HYPED CLOUD</a>
</li></ul>
</div>
</li></ul>
          </div>
          <div class="u-custom-menu u-nav-container-collapse">
            <div class="u-black u-container-style u-inner-container-layout u-sidenav u-sidenav-1" data-offcanvas-width="227">
              <div class="u-inner-container-layout u-sidenav-overflow" style="padding: 0px;">
                <div class="u-menu-close u-menu-close-1"></div>
                <ul class="u-align-left u-nav u-popupmenu-items u-spacing-15 u-unstyled u-nav-6"><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/">Home</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link">Bots</a><div class="u-nav-popup"><ul class="u-border-1 u-border-grey-90 u-h-spacing-20 u-nav u-unstyled u-v-spacing-10"><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/hypedbot">HYPED BOT</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/hypedmusic">HYPED MUSIC</a>
</li></ul>
</div>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link">Neot</a><div class="u-nav-popup"><ul class="u-border-1 u-border-grey-90 u-h-spacing-20 u-nav u-unstyled u-v-spacing-10"><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.neotcom.co/">Home</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.neotcom.co/products">Produtos</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.neotcom.co/login">Painel</a>
</li></ul>
</div>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link">Soluções</a><div class="u-nav-popup"><ul class="u-border-1 u-border-grey-90 u-h-spacing-20 u-nav u-unstyled u-v-spacing-10"><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://beta.hypeds.com/communities">Communities</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.tv">Hyped TV</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/minecraft">Minecraft</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://hpd.ink">ShortIT</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://shareit.hypeds.com">ShareIT</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://edu.hypeds.com">Education</a>
</li></ul>
</div>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link">Hosting</a><div class="u-nav-popup"><ul class="u-border-1 u-border-grey-90 u-h-spacing-20 u-nav u-unstyled u-v-spacing-10"><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/hypedhost">HYPED HOSTING</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/hypedcloud">HYPED CLOUD</a>
</li></ul>
</div>
</li></ul>
                <div class="u-border-3 u-border-white u-line u-line-horizontal u-line-1"></div>
                <h6 class="u-text u-text-default u-text-1">Mais da Hyped</h6>
                <h3 class="u-text u-text-default u-text-2">
                  <a href="https://hypeds.tv" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-body-alt-color u-btn-1">Hyped Tv<br>
                  </a>
                  <br>
                  <a href="https://hpd.ink" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-white u-btn-2">ShortIT</a>
                  <br>
                  <br>
                  <a href="https://www.hypeds.com/" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-body-alt-color u-btn-3">Hyped Group</a>
                  <br>
                  <br>
                  <a href="https://www.hypeds.com/hypedbot" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-body-alt-color u-btn-4">Hyped Bots</a>
                  <br>
                  <br>
                  <a href="https://beta.hypeds.com/hypedhosting" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-body-alt-color u-btn-5">Hyped Hosting</a>
                  <br>
                </h3>
              </div>
            </div>
            <div class="u-menu-overlay"></div>
          </div>
        </nav>
        <a href="https://www.hypeds.com/login?redirectTo=https://www.hypeds.com/dashboard" class="u-border-1 u-border-white u-btn u-btn-round u-button-style u-none u-radius-10 u-text-body-alt-color u-text-hover-white u-btn-6">Login</a>
      </div></header>
    <section class="u-clearfix u-image u-section-1" id="sec-20fd" data-image-width="1920" data-image-height="1080">
      <div class="u-clearfix u-sheet u-valign-middle-sm u-valign-middle-xs u-sheet-1">
        <h1 class="u-custom-font u-font-oswald u-text u-text-body-alt-color u-text-default u-text-1">Confirme seu e-mail</h1>
      </div>
    </section>
    <section class="u-align-center-md u-align-center-sm u-align-center-xs u-black u-clearfix u-section-2" id="sec-155b">
      <div class="u-clearfix u-sheet u-valign-bottom-md u-sheet-1">
        <div class="u-align-center u-container-style u-expanded-width-xs u-grey-90 u-group u-radius-15 u-shape-round u-group-1">
          <div class="u-container-layout u-container-layout-1">
            <h1 class="u-custom-font u-font-oswald u-text u-text-body-alt-color u-text-default u-text-1">Digite o código</h1>
            <p class="u-text u-text-2">&nbsp;Digite o código de quatro dígitos que enviamos ao seu e-mail cadastrado.</p>
            <div class="u-form u-form-1">
              <form method="POST" class="u-clearfix u-form-spacing-10 u-form-vertical u-inner-form" source="email" name="form" style="padding: 10px;">
                <div class="u-form-group u-form-partition-factor-4 u-label-none u-form-group-1">
                  <label for="text-557c" class="u-label"></label>
                  <input type="text" placeholder="" id="text-557c" name="num1" class="u-input u-input-rectangle" required="required" autofocus="autofocus" maxlength="1">
                </div>
                <div class="u-form-group u-form-partition-factor-4 u-label-none u-form-group-2">
                  <label for="text-82b7" class="u-label"></label>
                  <input type="text" placeholder="" id="text-82b7" name="num2" class="u-input u-input-rectangle" required="required" maxlength="1">
                </div>
                <div class="u-form-group u-form-partition-factor-4 u-label-none u-form-group-3">
                  <label for="text-2969" class="u-label"></label>
                  <input type="text" placeholder="" id="text-2969" name="num3" class="u-input u-input-rectangle" required="required" maxlength="1">
                </div>
                <div class="u-form-group u-form-partition-factor-4 u-label-none u-form-group-4">
                  <label for="text-9b15" class="u-label"></label>
                  <input type="text" placeholder="" id="text-9b15" name="num4" class="u-input u-input-rectangle" required="required" maxlength="1">
                </div>
                <div class="u-align-center u-form-group u-form-submit u-label-none">
                  <input type="submit" value="CONFIRMAR" class="u-border-none u-btn u-btn-round u-btn-submit u-button-style u-custom-color-1 u-radius-10 u-btn-1">
                </div>
              </form>
            </div>
            <h3 class="u-custom-font u-font-oswald u-text u-text-3">Não recebeu nenhum código?</h3>
            <p class="u-text u-text-4"> Verifique sua caixa de spam ou clique no botão abaixo para tentar novamente.</p>
            <button onclick="ReSendCode()" class="u-border-none u-btn u-btn-round u-button-style u-custom-color-1 u-radius-10 u-btn-2">RE-ENVIAR</button>
          </div>
        </div>
      </div>
    </section>
    <section class="u-clearfix u-container-align-center u-image u-section-3" id="sec-06df" data-image-width="1920" data-image-height="1080">
      <div class="u-clearfix u-sheet u-sheet-1"></div>
    </section>
    
    
    <footer class="u-align-center u-clearfix u-footer u-grey-90 u-footer" id="sec-7a5d"><div class="u-clearfix u-sheet u-sheet-1">
        <h5 class="u-text u-text-default u-text-1">Certificados</h5>
        <h6 class="u-text u-text-default u-text-2"> © HYPED GROUP 2023</h6>
        <a href="https://www.hypeds.com/login?redirectTo=https://www.hypeds.com/" class="u-border-1 u-border-white u-btn u-btn-round u-button-style u-none u-radius-10 u-text-body-alt-color u-text-hover-white u-btn-1">Login</a>
        <h6 class="u-text u-text-default u-text-3">Links Úteis<br>
          <a href="https://status.hypeds.com/" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-custom-color-1 u-btn-2">Status Page<br>
          </a>
          <a href="https://api.hypeds.com/docs" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-custom-color-1 u-btn-3" target="_blank">API</a>
          <br>
          <a href="https://www.hypeds.com/discord" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-custom-color-1 u-btn-4">Discord</a>
          <br>
          <a href="https://hpd.ink" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-custom-color-1 u-btn-5">Encurtador</a>
        </h6>
        <img class="u-image u-image-contain u-image-default u-image-1" src="https://beta.hypeds.com/images/google-safe-browsing.png" alt="" data-image-width="844" data-image-height="243" data-href="https://transparencyreport.google.com/safe-browsing/search?url=https:%2F%2Fwww.hypeds.com&amp;hl=pt_BR" data-target="_blank">
        <h6 class="u-text u-text-default u-text-4">
          <a href="https://www.hypeds.com/about" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-custom-color-1 u-btn-6">Sobre Nós</a>
          <br>
          <a href="https://www.hypeds.com/support" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-custom-color-1 u-btn-7">Suporte</a>
          <br>
          <a href="https://www.hypeds.com/privacypolicy" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-custom-color-1 u-btn-8">Políticas de Privacidade<br>
          </a>
          <a href="https://www.hypeds.com/tos" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-custom-color-1 u-btn-9">Termos de Serviço</a>
          <br>
          <a href="https://www.hypeds.com/cookies" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-custom-color-1 u-btn-10">Cookies</a>
        </h6>
        <img class="u-image u-image-contain u-image-default u-image-2" src="https://beta.hypeds.com/images/ssl-secure.png" alt="" data-image-width="713" data-image-height="200" data-href="https://www.sslchecker.com/sslchecker?su=da98d944ba1834a64794f688375a401b" data-target="_blank">
        <div class="u-social-icons u-spacing-10 u-social-icons-1">
          <a class="u-social-url" title="facebook" target="_blank" href="https://www.hypeds.com/facebook"><span class="u-icon u-social-facebook u-social-icon u-text-white u-icon-1"><svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 112 112" style=""><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-753e"></use></svg><svg class="u-svg-content" viewBox="0 0 112 112" x="0" y="0" id="svg-753e"><path fill="currentColor" d="M75.5,28.8H65.4c-1.5,0-4,0.9-4,4.3v9.4h13.9l-1.5,15.8H61.4v45.1H42.8V58.3h-8.8V42.4h8.8V32.2
c0-7.4,3.4-18.8,18.8-18.8h13.8v15.4H75.5z"></path></svg></span>
          </a>
          <a class="u-social-url" title="twitter" target="_blank" href="https://www.hypeds.com/twitter"><span class="u-icon u-social-icon u-social-twitter u-text-white u-icon-2"><svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 112 112" style=""><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-ec45"></use></svg><svg class="u-svg-content" viewBox="0 0 112 112" x="0" y="0" id="svg-ec45"><path fill="currentColor" d="M92.2,38.2c0,0.8,0,1.6,0,2.3c0,24.3-18.6,52.4-52.6,52.4c-10.6,0.1-20.2-2.9-28.5-8.2
	c1.4,0.2,2.9,0.2,4.4,0.2c8.7,0,16.7-2.9,23-7.9c-8.1-0.2-14.9-5.5-17.3-12.8c1.1,0.2,2.4,0.2,3.4,0.2c1.6,0,3.3-0.2,4.8-0.7
	c-8.4-1.6-14.9-9.2-14.9-18c0-0.2,0-0.2,0-0.2c2.5,1.4,5.4,2.2,8.4,2.3c-5-3.3-8.3-8.9-8.3-15.4c0-3.4,1-6.5,2.5-9.2
	c9.1,11.1,22.7,18.5,38,19.2c-0.2-1.4-0.4-2.8-0.4-4.3c0.1-10,8.3-18.2,18.5-18.2c5.4,0,10.1,2.2,13.5,5.7c4.3-0.8,8.1-2.3,11.7-4.5
	c-1.4,4.3-4.3,7.9-8.1,10.1c3.7-0.4,7.3-1.4,10.6-2.9C98.9,32.3,95.7,35.5,92.2,38.2z"></path></svg></span>
          </a>
          <a class="u-social-url" title="instagram" target="_blank" href="https://www.hypeds.com/instagram"><span class="u-icon u-social-icon u-social-instagram u-text-white u-icon-3"><svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 112 112" style=""><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-ea92"></use></svg><svg class="u-svg-content" viewBox="0 0 112 112" x="0" y="0" id="svg-ea92"><path fill="currentColor" d="M55.9,32.9c-12.8,0-23.2,10.4-23.2,23.2s10.4,23.2,23.2,23.2s23.2-10.4,23.2-23.2S68.7,32.9,55.9,32.9z
	 M55.9,69.4c-7.4,0-13.3-6-13.3-13.3c-0.1-7.4,6-13.3,13.3-13.3s13.3,6,13.3,13.3C69.3,63.5,63.3,69.4,55.9,69.4z"></path><path fill="#FFFFFF" d="M79.7,26.8c-3,0-5.4,2.5-5.4,5.4s2.5,5.4,5.4,5.4c3,0,5.4-2.5,5.4-5.4S82.7,26.8,79.7,26.8z"></path><path fill="currentColor" d="M78.2,11H33.5C21,11,10.8,21.3,10.8,33.7v44.7c0,12.6,10.2,22.8,22.7,22.8h44.7c12.6,0,22.7-10.2,22.7-22.7
	V33.7C100.8,21.1,90.6,11,78.2,11z M91,78.4c0,7.1-5.8,12.8-12.8,12.8H33.5c-7.1,0-12.8-5.8-12.8-12.8V33.7
	c0-7.1,5.8-12.8,12.8-12.8h44.7c7.1,0,12.8,5.8,12.8,12.8V78.4z"></path></svg></span>
          </a>
        </div>
      </div></footer>
</body></html>`)
});

router.post('/', function(req, res) {
  let redirectTo = req.query.redirectTo
  let callback = req.query.callback
  
  //VERIFY THE USER
  let token = req.cookies.SessionId
  let userID = db.get(`SessionUser_${token}`)
  let isLogged = db.get(`SessionIsLogged_${token}_${userID}`)

  let UID = db.get(`LGN_SessionUserID_${token}`)

  let isStaff = db.get(`HPD_User_IsStaff_${UID}`)
  let Email = db.get(`HPD_User_Email_${UID}`)
  
  if(isLogged !== true) return res.redirect(`https://api.hypeds.com/v7/oauth2/login`)

  let mailCode = db.get(`HPD_Mail_Code_${UID}`)

  let mailInput = [req.body.num1, req.body.num2, req.body.num3, req.body.num4]

  let code = mailInput.join('')

  if(mailCode === code) {
    db.set(`HPD_User_MailIsConfirmed_${UID}` , true)
    db.delete(`HPD_Mail_Code_${UID}`)

    return res.redirect(redirectTo)
  }
  
  db.delete(`HPD_Mail_Code_${UID}`)
  return res.redirect(`https://api.hypeds.com/v7/oauth2/2fa/mailconfirm?callback=${callback}&redirectTo=${redirectTo}&error=true`)
});

function SendMail(mail, mailCode) {
  let transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: "contato@hypeds.com",
      pass: data.config.mailPassword
    },
  })

  transporter.sendMail({
    from: '"HYPED GROUP" <contato@hypeds.com>',
    to: `${mail}`,
    subject: `Confirme seu e-mail!`,
    text: `Confirme seu e-mail!
    
    | Código: ${mailCode}`,
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="font-family:arial, 'helvetica neue', helvetica, sans-serif"> 
 <head> 
  <meta charset="UTF-8"> 
  <meta content="width=device-width, initial-scale=1" name="viewport"> 
  <meta name="x-apple-disable-message-reformatting"> 
  <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
  <meta content="telephone=no" name="format-detection"> 
  <title>Não Responda - HYPED</title><!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
<xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG></o:AllowPNG>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
</xml>
<![endif]--> 
  <style type="text/css">
#outlook a {
	padding:0;
}
.es-button {
	mso-style-priority:100!important;
	text-decoration:none!important;
}
a[x-apple-data-detectors] {
	color:inherit!important;
	text-decoration:none!important;
	font-size:inherit!important;
	font-family:inherit!important;
	font-weight:inherit!important;
	line-height:inherit!important;
}
.es-desk-hidden {
	display:none;
	float:left;
	overflow:hidden;
	width:0;
	max-height:0;
	line-height:0;
	mso-hide:all;
}
[data-ogsb] .es-button {
	border-width:0!important;
	padding:10px 20px 10px 20px!important;
}
@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:30px!important; text-align:left } h2 { font-size:24px!important; text-align:left } h3 { font-size:20px!important; text-align:left } h1 a { text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } h2 a { text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:24px!important } h3 a { text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:18px!important; display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }
</style> 
 </head> 
 <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
  <div class="es-wrapper-color" style="background-color:#F6F6F6"><!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#f6f6f6"></v:fill>
			</v:background>
		<![endif]--> 
   <table class="es-wrapper" cellspacing="0" cellpadding="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top"> 
     <tr> 
      <td valign="top" style="padding:0;Margin:0"> 
       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
         <tr> 
          <td class="es-adaptive es-info-area" align="center" style="padding:0;Margin:0"> 
           <table class="es-content-body" cellspacing="0" cellpadding="0" align="center" bgcolor="#ffffff" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
             <tr> 
              <td align="left" style="padding:10px;Margin:0"><!--[if mso]><table style="width:580px"><tr><td style="width:280px" valign="top"><![endif]--> 
               <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                 <tr> 
                  <td align="left" style="padding:0;Margin:0;width:280px"> 
                   <table cellspacing="0" cellpadding="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr> 
                      <td class="es-infoblock es-m-txt-c" align="left" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px">Preheader text</p></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table><!--[if mso]></td><td style="width:20px"></td><td style="width:280px" valign="top"><![endif]--> 
               <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
                 <tr> 
                  <td align="left" style="padding:0;Margin:0;width:280px"> 
                   <table cellspacing="0" cellpadding="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr> 
                      <td class="es-infoblock es-m-txt-c" align="right" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px"><a href="http://#" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px">View in browser</a></p></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table><!--[if mso]></td></tr></table><![endif]--></td> 
             </tr> 
           </table></td> 
         </tr> 
       </table> 
       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
         <tr> 
          <td class="es-adaptive" align="center" style="padding:0;Margin:0"> 
           <table class="es-content-body" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
             <tr> 
              <td align="left" style="padding:10px;Margin:0"> 
               <table cellspacing="0" cellpadding="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                 <tr> 
                  <td valign="top" align="center" style="padding:0;Margin:0;width:580px"> 
                   <table cellspacing="0" cellpadding="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr> 
                      <td class="es-infoblock" align="center" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px"><a href="http://#" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px">View in browser</a></p></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
           </table></td> 
         </tr> 
       </table> 
       <table class="es-header" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"> 
         <tr> 
          <td class="es-adaptive" align="center" style="padding:0;Margin:0"> 
           <table class="es-header-body" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px"> 
             <tr> 
              <td style="padding:15px;Margin:0;background-color:#4b4b4b;border-bottom:1px solid #2cb543" bgcolor="#4b4b4b" align="left"><!--[if mso]><table style="width:570px" cellpadding="0" cellspacing="0"><tr><td style="width:180px" valign="top"><![endif]--> 
               <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                 <tr> 
                  <td class="es-m-p0r es-m-p20b" valign="top" align="center" style="padding:0;Margin:0;width:180px"> 
                   <table cellspacing="0" cellpadding="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr> 
                      <td class="es-m-p0l es-m-txt-c" align="left" style="padding:0;Margin:0;padding-left:15px;font-size:0px"><img src="https://www.hypeds.com/images/hyped.png" alt width="108" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table><!--[if mso]></td><td style="width:20px"></td><td style="width:370px" valign="top"><![endif]--> 
               <table cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                 <tr> 
                  <td align="left" style="padding:0;Margin:0;width:370px"> 
                   <table cellspacing="0" cellpadding="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr class="es-mobile-hidden"> 
                      <td align="center" height="20" style="padding:0;Margin:0"></td> 
                     </tr> 
                     <tr> 
                      <td class="es-m-p0r es-m-p0t es-m-txt-c" align="right" style="padding:0;Margin:0;padding-right:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#ffffff;font-size:14px">Hyped Mail System</p></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table><!--[if mso]></td></tr></table><![endif]--></td> 
             </tr> 
           </table></td> 
         </tr> 
       </table> 
       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
         <tr> 
          <td align="center" style="padding:0;Margin:0"> 
           <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#ffffff;width:600px" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"> 
             <tr> 
              <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px"> 
               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                 <tr> 
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr> 
                      <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:51px;color:#333333;font-size:34px">Confirme seu e-mail!<br></p></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
             <tr> 
              <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px"> 
               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                 <tr> 
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
             <tr> 
              <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px"> 
               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                 <tr> 
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">  
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
             <tr> 
              <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px"> 
               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                 <tr> 
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr> 
                      <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:30px;color:#333333;font-size:20px">| Seu código de confirmação:</p> 
                       <ul> 
                        <li style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;Margin-bottom:15px;margin-left:0;color:#333333;font-size:14px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:30px;color:#333333;font-size:20px">Código: ${mailCode}</p></li>
                       </ul></td> 
                     </tr> 
                     <tr> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
           </table></td> 
         </tr> 
       </table> 
       <table class="es-footer" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"> 
         <tr> 
          <td align="center" style="padding:0;Margin:0"> 
           <table class="es-footer-body" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#333333;width:600px"> 
             <tr> 
              <td align="left" style="Margin:0;padding-top:25px;padding-bottom:25px;padding-left:40px;padding-right:40px"><!--[if mso]><table style="width:520px" cellpadding="0" cellspacing="0"><tr><td style="width:180px"><![endif]--> 
               <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                 <tr> 
                  <td class="es-m-p0r es-m-p20b" align="center" style="padding:0;Margin:0;width:160px"> 
                   <table cellspacing="0" cellpadding="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr> 
                      <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:45px;color:#FFFFFF;font-size:30px">TOS</p></td> 
                     </tr> 
                   </table></td> 
                  <td class="es-hidden" style="padding:0;Margin:0;width:20px"></td> 
                 </tr> 
               </table><!--[if mso]></td><td style="width:160px"><![endif]--> 
               <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                 <tr> 
                  <td class="es-m-p0r es-m-p20b" align="center" style="padding:0;Margin:0;width:160px"> 
                   <table cellspacing="0" cellpadding="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr> 
                      <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#FFFFFF;font-size:14px">© HYPED GROUP 2023</p></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table><!--[if mso]></td><td style="width:20px"></td><td style="width:160px"><![endif]--> 
               <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
                 <tr> 
                  <td class="es-m-p0r es-m-p20b" align="center" style="padding:0;Margin:0;width:160px"> 
                   <table cellspacing="0" cellpadding="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr> 
                      <td class="es-m-txt-c" align="right" style="padding:0;Margin:0;padding-bottom:10px"><h3 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:normal;color:#ffffff">#HPD4EVER</h3></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table><!--[if mso]></td></tr></table><![endif]--></td> 
             </tr> 
           </table></td> 
         </tr> 
       </table></td> 
     </tr> 
   </table> 
  </div>  
 </body>
</html>`
  })
}

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