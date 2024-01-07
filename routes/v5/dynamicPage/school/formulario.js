const express = require('express');
const db = require('quick.db');
let config = require('./config.json')
var router = express.Router(); 

router.get('/', function(req, res) {
  res.send(`<!DOCTYPE html>
<html style="font-size: 16px;" lang="en"><head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <meta name="keywords" content="Pesquisa informativa pessoal">
    <meta name="description" content="">
    <link rel="shortcut icon" href="https://beta.hypeds.com/images/logo.png" type="image/png">
    <title>HYPED | Formulário Semente</title>
    <link rel="stylesheet" href="https://beta.hypeds.com/css/NEOHypedLib.css" media="screen">
    <link rel="stylesheet" href="https://www.hypeds.com/css/SMNT_Formulário.css" media="screen">
    <meta name="referrer" content="origin">
    <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
    <meta name="theme-color" content="#478ac9">
    <meta name="twitter:site" content="@">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Formulário sobre a Solidão">
    <meta name="twitter:description" content="">
    <meta property="og:title" content="Você se sente só?">
    <meta property="og:type" content="forms">
  <meta data-intl-tel-input-cdn-path="intlTelInput/"></head>
  <body class="u-body u-xl-mode" data-lang="en">
    <section class="u-align-center u-black u-clearfix u-section-1" id="sec-bb7e">
      <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
        <h1 class="u-text u-text-default u-text-1">Pesquisa informativa pessoal</h1>
      </div>
    </section>
    <section class="u-clearfix u-grey-90 u-section-2" id="sec-a38d">
      <div class="u-clearfix u-sheet u-sheet-1">
        <div class="u-form u-form-1">
          <form method="POST" class="u-clearfix u-form-spacing-10 u-form-vertical u-inner-form" source="email" name="form" style="padding: 10px;">
            <div class="u-form-group u-form-name u-label-top">
              <label for="name-8b6a" class="u-label u-label-1">Nome ou nickname</label>
              <input type="text" placeholder="Digite seu nome ou nickname preferido" id="name-8b6a" name="name" class="u-input u-input-rectangle" required="">
            </div>
            <div class="u-form-group u-form-input-layout-vertical u-form-radiobutton u-label-top u-form-group-2">
              <label class="u-label u-label-2">Em média, quantas horas passa na internet por dia?</label>
              <div class="u-form-radio-button-wrapper">
                <div class="u-input-row">
                  <input id="field-52da" type="radio" name="horas" value="30to1" class="u-field-input" data-calc="30to1" required="required">
                  <label class="u-field-label" for="field-52da">De 30 min a 1 hora</label>
                </div>
                <div class="u-input-row">
                  <input id="field-2927" type="radio" name="horas" value="1to2" class="u-field-input" data-calc="1to2" required="required">
                  <label class="u-field-label" for="field-2927">De 1 hora a 2 horas</label>
                </div>
                <div class="u-input-row">
                  <input id="field-c89c" type="radio" name="horas" value="3to5" class="u-field-input" data-calc="3to5" required="required">
                  <label class="u-field-label" for="field-c89c">De 3 horas a 5 horas</label>
                </div>
                <div class="u-input-row">
                  <input id="field-c8ff" data-calc="5to8" type="radio" name="horas" value="5to8" class="u-field-input" required="required">
                  <label class="u-field-label" for="field-c8ff">De 5 horas a 8 horas</label>
                </div>
                <div class="u-input-row">
                  <input id="field-cba1" data-calc="9orplus" type="radio" name="horas" value="9orplus" class="u-field-input" required="required">
                  <label class="u-field-label" for="field-cba1">9 horas ou mais</label>
                </div>
              </div>
            </div>
            <div class="u-form-group u-form-input-layout-vertical u-form-radiobutton u-label-top u-form-group-3">
              <label class="u-label u-label-3">Com que frequência você se sente tímido?</label>
              <div class="u-form-radio-button-wrapper">
                <div class="u-input-row">
                  <input id="field-7971" type="radio" name="snttmd" value="nvr" class="u-field-input" required="required" data-calc="nvr">
                  <label class="u-field-label" for="field-7971">Nunca</label>
                </div>
                <div class="u-input-row">
                  <input id="field-73ef" type="radio" name="snttmd" value="avzz" class="u-field-input" required="required" data-calc="avzz">
                  <label class="u-field-label" for="field-73ef">As vezes</label>
                </div>
                <div class="u-input-row">
                  <input id="field-5fa5" type="radio" name="snttmd" value="mtvzz" class="u-field-input" required="required" data-calc="mtvzz">
                  <label class="u-field-label" for="field-5fa5">Muitas vezes</label>
                </div>
                <div class="u-input-row">
                  <input id="field-f122" data-calc="constt" type="radio" name="snttmd" value="constt" class="u-field-input">
                  <label class="u-field-label" for="field-f122">Constantemente</label>
                </div>
              </div>
            </div>
            <div class="u-form-group u-form-input-layout-vertical u-form-radiobutton u-label-top u-form-group-4">
              <label class="u-label u-label-4">Com que frequência você sente que lhe falta companhia?</label>
              <div class="u-form-radio-button-wrapper">
                <div class="u-input-row">
                  <input id="field-14cb" type="radio" name="fltcmn" value="nvr" class="u-field-input" data-calc="nvr" required="required">
                  <label class="u-field-label" for="field-14cb">Nunca</label>
                </div>
                <div class="u-input-row">
                  <input id="field-b25d" type="radio" name="fltcmn" value="avzz" class="u-field-input" data-calc="avzz" required="required">
                  <label class="u-field-label" for="field-b25d">As vezes</label>
                </div>
                <div class="u-input-row">
                  <input id="field-1b43" type="radio" name="fltcmn" value="mtvzz" class="u-field-input" data-calc="mtvzz" required="required">
                  <label class="u-field-label" for="field-1b43">Muitas vezes</label>
                </div>
                <div class="u-input-row">
                  <input id="field-59b1" data-calc="constt" type="radio" name="fltcmn" value="constt" class="u-field-input" required="required">
                  <label class="u-field-label" for="field-59b1">Constantemente</label>
                </div>
              </div>
            </div>
            <div class="u-form-group u-form-input-layout-vertical u-form-radiobutton u-label-top u-form-group-5">
              <label class="u-label u-label-5">Com que frequência você se sente isolado dos outros?</label>
              <div class="u-form-radio-button-wrapper">
                <div class="u-input-row">
                  <input id="field-a496" type="radio" name="isold" value="nvr" class="u-field-input" data-calc="nvr" required="required">
                  <label class="u-field-label" for="field-a496">Nunca</label>
                </div>
                <div class="u-input-row">
                  <input id="field-90a5" type="radio" name="isold" value="avzz" class="u-field-input" data-calc="avzz" required="required">
                  <label class="u-field-label" for="field-90a5">As vezes</label>
                </div>
                <div class="u-input-row">
                  <input id="field-50e1" type="radio" name="isold" value="mtvzz" class="u-field-input" data-calc="mtvzz" required="required">
                  <label class="u-field-label" for="field-50e1">Muitas vezes</label>
                </div>
                <div class="u-input-row">
                  <input id="field-ea12" data-calc="constt" type="radio" name="isold" value="constt" class="u-field-input" required="required">
                  <label class="u-field-label" for="field-ea12">Contantemente</label>
                </div>
              </div>
            </div>
            <div class="u-form-group u-form-input-layout-vertical u-form-radiobutton u-label-top u-form-group-6">
              <label class="u-label u-label-6">Com que frequência você se sente só?</label>
              <div class="u-form-radio-button-wrapper">
                <div class="u-input-row">
                  <input id="field-e99f" type="radio" name="sntso" value="nvr" class="u-field-input" required="required" data-calc="nvr">
                  <label class="u-field-label" for="field-e99f">Nunca</label>
                </div>
                <div class="u-input-row">
                  <input id="field-17d3" type="radio" name="sntso" value="avzz" class="u-field-input" required="required" data-calc="avzz">
                  <label class="u-field-label" for="field-17d3">As vezes</label>
                </div>
                <div class="u-input-row">
                  <input id="field-53e3" type="radio" name="sntso" value="mtvzz" class="u-field-input" required="required" data-calc="mtvzz">
                  <label class="u-field-label" for="field-53e3">Muitas vezes</label>
                </div>
                <div class="u-input-row">
                  <input id="field-0658" data-calc="constt" type="radio" name="sntso" value="constt" class="u-field-input">
                  <label class="u-field-label" for="field-0658">Constantemente</label>
                </div>
              </div>
            </div>
            <div class="u-align-center u-form-group u-form-submit u-label-top">
              <button type="submit" value="submit" class="u-border-none u-btn u-btn-round u-btn-submit u-button-style u-custom-color-1 u-radius-10 u-btn-1">Enviar</button>
            </div>
          </form>
        </div>
        <h6 class="u-align-center u-text u-text-1">Nota: As informações providas serão armazenadas anonimamente e encriptografadas para a proteção do usuário final segundo nossos <a href="https://www.hypeds.com/tos" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-custom-color-1 u-btn-2">termos</a>. Serão apenas analizados números e provas de veracidade dos dados. Nomes e outras informações compartilhadas são para definição de veracidade dos dados e são deletados imediatamente após o envio das respostas. E ao clicar em "Enviar" o usuário final concorda e aceita com os nossos&nbsp;<a href="https://www.hypeds.com/tos" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-custom-color-1 u-btn-3">termos</a>. 
        </h6>
      </div>
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
  if(req.body.name === "Gay") {
    return res.redirect('back');
  } else {
    //BODY.HORAS
    if(req.body.horas === "30to1") {
      db.add("SMNT_HRS_30to1", 1)
    }
    if(req.body.horas === "1to2") {
      db.add("SMNT_HRS_1to2", 1)
    }
    if(req.body.horas === "3to5") {
      db.add("SMNT_HRS_3to5", 1)
    }
    if(req.body.horas === "5to8") {
      db.add("SMNT_HRS_5to8", 1)
    }
    if(req.body.horas === "9orplus") {
      db.add("SMNT_HRS_9orplus", 1)
    }

    //BODY.snttmd
    if(req.body.snttmd === "nvr") {
      db.add("SMNT_snttmd_nvr", 1)
    }
    if(req.body.snttmd === "avzz") {
      db.add("SMNT_snttmd_avzz", 1)
    }
    if(req.body.snttmd === "mtvzz") {
      db.add("SMNT_snttmd_mtvzz", 1)
    }
    if(req.body.snttmd === "constt") {
      db.add("SMNT_snttmd_constt", 1)
    }

    //BODY.fltcmn
    if(req.body.fltcmn === "nvr") {
      db.add("SMNT_fltcmn_nvr", 1)
    }
    if(req.body.fltcmn === "avzz") {
      db.add("SMNT_fltcmn_avzz", 1)
    }
    if(req.body.fltcmn === "mtvzz") {
      db.add("SMNT_fltcmn_mtvzz", 1)
    }
    if(req.body.fltcmn === "constt") {
      db.add("SMNT_fltcmn_constt", 1)
    }

    //BODY.isold
    if(req.body.isold === "nvr") {
      db.add("SMNT_isold_nvr", 1)
    }
    if(req.body.isold === "avzz") {
      db.add("SMNT_isold_avzz", 1)
    }
    if(req.body.isold === "mtvzz") {
      db.add("SMNT_isold_mtvzz", 1)
    }
    if(req.body.isold === "constt") {
      db.add("SMNT_isold_constt", 1)
    }

    //BODY.sntso
    if(req.body.sntso === "nvr") {
      db.add("SMNT_sntso_nvr", 1)
    }
    if(req.body.sntso === "avzz") {
      db.add("SMNT_sntso_avzz", 1)
    }
    if(req.body.sntso === "mtvzz") {
      db.add("SMNT_sntso_mtvzz", 1)
    }
    if(req.body.sntso === "constt") {
      db.add("SMNT_sntso_constt", 1)
    }
    
    res.redirect('https://api.hypeds.com/v5/dynamicPage/formulario/enviado')
  }
})

router.get('/:token/info', function(req, res) {
  if(req.params.token !== config.token) {
    return res.json({ message: 'Invalid Token.' })
  } else {
    let to301 = db.get("SMNT_HRS_30to1")
    let to12 = db.get("SMNT_HRS_1to2")
    let to35 = db.get("SMNT_HRS_3to5")
    let to58 = db.get("SMNT_HRS_5to8")
    let to9plus = db.get("SMNT_HRS_9orplus")

    let snttmd = db.get("SMNT_snttmd_nvr")
    let snttmdavz = db.get("SMNT_snttmd_avzz")
    let snttmdmtvz = db.get("SMNT_snttmd_mtvzz")
    let snttmdconstt = db.get("SMNT_snttmd_constt")

    let fltcmn = db.get("SMNT_fltcmn_nvr")
    let fltcmnavz = db.get("SMNT_fltcmn_avzz")
    let fltcmnmtvz = db.get("SMNT_fltcmn_mtvzz")
    let fltcmnconstt = db.get("SMNT_fltcmn_constt")

    let isold = db.get("SMNT_isold_nvr")
    let isoldavz = db.get("SMNT_isold_avzz")
    let isoldmtvz = db.get("SMNT_isold_mtvzz")
    let isoldconstt = db.get("SMNT_isold_constt")
    
    let sntso = db.get("SMNT_sntso_nvr")
    let sntsoavz = db.get("SMNT_sntso_avzz")
    let sntsomtvz = db.get("SMNT_sntso_mtvzz")
    let sntsoconstt = db.get("SMNT_sntso_constt")

    
    res.json({ message: "Informações do formulário:", Quantas_Horas: { de_30min_a_1hora: to301, de_1horas_a_2horas: to12, de_2horas_a_3horas: to35, de_3horas_a_5horas: to58, de_5horas_a_9horas: to9plus  }, Sentem_Timidos: { Nunca: snttmd, As_Vezes: snttmdavz, Muitas_Vezes: snttmdmtvz, Constante: snttmdconstt  }, Faltam_Companhia: { Nunca: fltcmn, As_Vezes: fltcmnavz, Muitas_Vezes: fltcmnmtvz, Constante: fltcmnconstt }, Sente_Isolado: { Nunca: isold, As_Vezes: isoldavz, Muitas_Vezes: isoldmtvz, Constante: isoldconstt }, Sente_Sozinho: { Nunca: sntso, As_Vezes: sntsoavz, Muitas_Vezes: sntsomtvz, Constante: sntsoconstt }})
  }
})

module.exports = router;