const express = require('express');
const nodemailer = require('nodemailer');
const db = require('quick.db');
var router = express.Router();  

const config = require('./config.json')

router.get('/', function(req, res) {
  return res.json({ message: "Please provide an Product to Checkout" })
})

router.get('/:product', function(req, res) {
  res.send(`<!DOCTYPE html>
<html style="font-size: 16px;"><head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <meta name="keywords" content="Copie seu URL abaixo:">
    <meta name="description" content="">
    <title>HYPED MC | Checkout</title>
    <link rel="shortcut icon" href="https://static.wixstatic.com/media/a926b2_cfc2b507c19546d88a6a2231b832b022%7Emv2.png/v1/fill/w_32%2Ch_32%2Clg_1%2Cusm_0.66_1.00_0.01/a926b2_cfc2b507c19546d88a6a2231b832b022%7Emv2.png" type="image/png">
    <link rel="stylesheet" href="https://www.hypeds.com/css/2nicepage.css" media="screen">
<link rel="stylesheet" href="https://www.hypeds.com/css/FormUUID.css" media="screen">
    <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
    <meta name="theme-color" content="#478ac9">
    <meta property="og:title" content="FormUUID">
    <meta property="og:type" content="website">
  </head>
  <body class="u-body u-xl-mode"><header class="u-clearfix u-grey-75 u-header u-header" id="sec-b08d"><div class="u-clearfix u-sheet u-sheet-1">
        <a href="https://www.hypeds.com/" class="u-image u-logo u-image-1" data-image-width="640" data-image-height="642" title="Home">
          <img src="https://www.hypeds.com/images/hyped.png" class="u-logo-image u-logo-image-1">
        </a>
        <nav class="u-menu u-menu-dropdown u-offcanvas u-menu-1">
          <div class="menu-collapse" style="font-size: 1rem; letter-spacing: 0px; font-weight: 700; text-transform: uppercase;">
            <a class="u-button-style u-custom-active-border-color u-custom-active-color u-custom-border u-custom-border-color u-custom-borders u-custom-hover-border-color u-custom-hover-color u-custom-left-right-menu-spacing u-custom-padding-bottom u-custom-text-active-color u-custom-text-color u-custom-text-hover-color u-custom-top-bottom-menu-spacing u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base" href="#">
              <svg class="u-svg-link" viewBox="0 0 24 24"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#menu-hamburger"></use></svg>
              <svg class="u-svg-content" version="1.1" id="menu-hamburger" viewBox="0 0 16 16" x="0px" y="0px" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><g><rect y="1" width="16" height="2"></rect><rect y="7" width="16" height="2"></rect><rect y="13" width="16" height="2"></rect>
</g></svg>
            </a>
          </div>
          <div class="u-custom-menu u-nav-container">
            <ul class="u-nav u-spacing-30 u-unstyled u-nav-1"><li class="u-nav-item"><a class="u-border-2 u-border-active-palette-1-base u-border-hover-palette-1-base u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-text-active-palette-1-base u-text-grey-90 u-text-hover-grey-90" href="https://www.hypeds.com/" style="padding: 10px 0px;">Home</a>
</li><li class="u-nav-item"><a class="u-border-2 u-border-active-palette-1-base u-border-hover-palette-1-base u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-text-active-palette-1-base u-text-grey-90 u-text-hover-grey-90" href="https://www.hypeds.com/hypedmusic" style="padding: 10px 0px;">Hyped Music</a>
</li><li class="u-nav-item"><a class="u-border-2 u-border-active-palette-1-base u-border-hover-palette-1-base u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-text-active-palette-1-base u-text-grey-90 u-text-hover-grey-90" href="https://www.hypeds.com/minecraft" style="padding: 10px 0px;">Minecraft</a>
</li><li class="u-nav-item"><a class="u-border-2 u-border-active-palette-1-base u-border-hover-palette-1-base u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-text-active-palette-1-base u-text-grey-90 u-text-hover-grey-90" href="https://www.hypeds.com/docs" style="padding: 10px 0px;">Docs</a>
</li><li class="u-nav-item"><a class="u-border-2 u-border-active-palette-1-base u-border-hover-palette-1-base u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-text-active-palette-1-base u-text-grey-90 u-text-hover-grey-90" href="https://api.hypeds.com/v5/oauth/login" style="padding: 10px 0px;">LOGIN</a>
</li></ul>
          </div>
          <div class="u-custom-menu u-nav-container-collapse">
            <div class="u-black u-container-style u-inner-container-layout u-opacity u-opacity-95 u-sidenav">
              <div class="u-inner-container-layout u-sidenav-overflow">
                <div class="u-menu-close"></div>
                <ul class="u-align-center u-nav u-popupmenu-items u-unstyled u-nav-2"><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/">Home</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/hypedmusic">Hyped Music</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/minecraft">Minecraft</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/docs">Docs</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://api.hypeds.com/v5/oauth/login">LOGIN</a>
</li></ul>
              </div>
            </div>
            <div class="u-black u-menu-overlay u-opacity u-opacity-70"></div>
          </div>
        </nav>
      </div></header>
    <section class="u-clearfix u-grey-60 u-section-1" id="sec-4676">
      <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
        <div class="u-border-3 u-border-grey-40 u-container-style u-grey-80 u-group u-group-1">
          <div class="u-container-layout u-container-layout-1">
            <h2 class="u-align-center u-text u-text-1">Digite suas informações abaixo:</h2>
            <div class="u-form u-form-1">
              <form method="POST" class="u-clearfix u-form-spacing-10 u-form-vertical u-inner-form" source="custom" name="form" style="padding: 10px;">
                
                
                <div class="u-form-group u-form-name">
                  <label for="name-292e" class="u-label">Nickname</label>
                  <input type="text" placeholder="Nickname do Minecraft" id="name-292e" name="nickname" class="u-border-1 u-border-grey-30 u-grey-5 u-input u-input-rectangle u-radius-33" required="">
                </div>
                <div class="u-form-email u-form-group">
                  <label for="email-292e" class="u-label">Email</label>
                  <input type="email" placeholder="Digite seu e-mail" id="email-292e" name="email" class="u-border-1 u-border-grey-30 u-grey-5 u-input u-input-rectangle u-radius-33" required="">
                </div>
                <div class="u-form-group u-form-group-3">
                  <label for="text-857b" class="u-label">Cupom</label>
                  <input type="text" placeholder="Digite um cupom (caso tenha)" id="text-857b" name="cupom" class="u-border-1 u-border-grey-30 u-grey-5 u-input u-input-rectangle u-radius-33">
                </div>
                <div class="u-align-right u-form-group u-form-submit">
                  <input type="submit" value="Prosseguir p/ revisão" class="u-border-none u-btn u-btn-round u-btn-submit u-button-style u-custom-color-2 u-hover-palette-1-light-1 u-radius-36 u-btn-1">
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    
    <footer class="u-align-center u-clearfix u-footer u-grey-90 u-footer" id="sec-4960"><div class="u-clearfix u-sheet u-sheet-1">
        <p class="u-text u-text-1">Links Úteis&nbsp;<br>
          <span style="font-weight: 400;">
            <a href="https://stats.uptimerobot.com/1BnoXi6Mgp" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-custom-color-2 u-btn-1"> Status Page</a>
          </span>
          <br>
          <span style="font-weight: 400;">
            <a href="https://v4.hypeds.com/api" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-custom-color-2 u-btn-2">API</a>
          </span>
          <br>
          <span style="font-weight: 400;">
            <a href="https://www.hypeds.com/discord" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-custom-color-2 u-btn-3">Discord</a>
          </span>
          <br>
        </p>
        <p class="u-text u-text-2">
          <a href="https://www.hypeds.com/tos" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-palette-1-base u-btn-4">TOS</a>
        </p>
        <p class="u-small-text u-text u-text-variant u-text-3">© HYPED GROUP 2022</p>
      </div></footer>
</body></html>`)
})

router.post('/:product', function(req, res) {
  let random = '';
  let dict = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXZ'
  for(var i = 0; i < 9; i++) {
    random = random + dict.charAt(Math.floor(Math.random() * dict.length));
  }
  let checkoutID = `NzCK${random}`

  db.set(`CheckoutProduct_${checkoutID}`, req.params.product)
  db.set(`CheckoutNickname_${checkoutID}`, req.body.nickname)
  db.set(`CheckoutEmail_${checkoutID}`, req.body.email)
  db.set(`CheckoutCupom_${checkoutID}`, req.body.cupom)

  let productName = req.params.product
  let productPrice = db.get(`ProductPrice_${productName}`)

  if(productName === "vip") productName = "VIP - HYPED MC"
  if(productName === "mvp") productName = "MVP - HYPED MC"
  if(productName === "mvpplus") productName = "MVP+ - HYPED MC"

  let transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: "contato@hypeds.com",
      pass: config.mailPassword
    },
  })

  transporter.sendMail({
    from: '"HYPED GROUP" <contato@hypeds.com>',
    to: `${req.body.email}`,
    subject: `Pedido: ${checkoutID}`,
    text: `Obrigado por realizar seu pedido!
    
    | Informações do pedido:
    - Produto: ${productName}
    - Preço: ${productPrice}
    - Para: ${req.body.nickname}`,
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
                      <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:51px;color:#333333;font-size:34px">Pedido: ${checkoutID}<br></p></td> 
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
                      <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Pedido realizado no nosso sistema de pagamento.</p></td> 
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
                      <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:45px;color:#333333;font-size:30px">| Obrigado por realizar seu pedido.</p></td> 
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
                      <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:30px;color:#333333;font-size:20px">| Informações do seu pedido:</p> 
                       <ul> 
                        <li style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;Margin-bottom:15px;margin-left:0;color:#333333;font-size:14px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:30px;color:#333333;font-size:20px">Produto: ${productName}</p></li> 
                        <li style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;Margin-bottom:15px;margin-left:0;color:#333333;font-size:14px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:30px;color:#333333;font-size:20px">Preço: ${productPrice}&nbsp;</p></li> 
                        <li style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;Margin-bottom:15px;margin-left:0;color:#333333;font-size:14px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:30px;color:#333333;font-size:20px">Para: ${req.body.nickname}</p></li> 
                       </ul></td> 
                     </tr> 
                     <tr> 
                      <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:45px;color:#333333;font-size:30px">| Status do pedido:</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:45px;color:#333333;font-size:30px">-&nbsp;<span style="font-size:25px">NÃO CONFIRMADO</span></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:38px;color:#333333;font-size:25px"></p></td> 
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
                      <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#FFFFFF;font-size:14px">© HYPED GROUP 2022</p></td> 
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
  
  res.redirect(`https://api.hypeds.com/v5/checkout/review/${checkoutID}`)
})

router.get('/review/:id', function(req, res) {
  let productName = db.get(`CheckoutProduct_${req.params.id}`)
  let userNickname = db.get(`CheckoutNickname_${req.params.id}`)
  let userEmail = db.get(`CheckoutEmail_${req.params.id}`)
  let checkoutCupom = db.get(`CheckoutCupom_${req.params.id}`)

  let checkoutCupomPercentage = db.get(`CupomPercent_${checkoutCupom}`)
  let productPrice = db.get(`ProductPrice_${productName}`)

  if(!checkoutCupom) checkoutCupom = "Inválido / Não Especificado"
  if(!checkoutCupomPercentage) checkoutCupomPercentage = "0"
  
  if(productName === "vip") productName = "VIP - HYPED MC"
  if(productName === "mvp") productName = "MVP - HYPED MC"
  if(productName === "mvpplus") productName = "MVP+ - HYPED MC"
  
  res.send(`<!DOCTYPE html>
<html style="font-size: 16px;"><head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <meta name="keywords" content="Copie seu URL abaixo:">
    <meta name="description" content="">
    <title>HYPED MC | ReviewCheckout</title>
    <link rel="stylesheet" href="https://www.hypeds.com/css/2nicepage.css" media="screen">
<link rel="stylesheet" href="https://www.hypeds.com/css/ReviewCheckout.css" media="screen">
    <link rel="shortcut icon" href="https://static.wixstatic.com/media/a926b2_cfc2b507c19546d88a6a2231b832b022%7Emv2.png/v1/fill/w_32%2Ch_32%2Clg_1%2Cusm_0.66_1.00_0.01/a926b2_cfc2b507c19546d88a6a2231b832b022%7Emv2.png" type="image/png">
    <script class="u-script" type="text/javascript" src="https://www.hypeds.com/js/jquery.js" defer=""></script>
    <script class="u-script" type="text/javascript" src="https://www.hypeds.com/js/nicepage.js" defer=""></script>
    <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
    <meta name="theme-color" content="#478ac9">
    <meta property="og:title" content="ReviewCheckout">
    <meta property="og:type" content="website">
  </head>
  <body class="u-body u-xl-mode"><header class="u-clearfix u-grey-75 u-header u-header" id="sec-b08d"><div class="u-clearfix u-sheet u-sheet-1">
        <a href="https://www.hypeds.com/" class="u-image u-logo u-image-1" data-image-width="640" data-image-height="642" title="Home">
          <img src="https://www.hypeds.com/images/hyped.png" class="u-logo-image u-logo-image-1">
        </a>
        <nav class="u-menu u-menu-dropdown u-offcanvas u-menu-1">
          <div class="menu-collapse" style="font-size: 1rem; letter-spacing: 0px; font-weight: 700; text-transform: uppercase;">
            <a class="u-button-style u-custom-active-border-color u-custom-active-color u-custom-border u-custom-border-color u-custom-borders u-custom-hover-border-color u-custom-hover-color u-custom-left-right-menu-spacing u-custom-padding-bottom u-custom-text-active-color u-custom-text-color u-custom-text-hover-color u-custom-top-bottom-menu-spacing u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base" href="#">
              <svg class="u-svg-link" viewBox="0 0 24 24"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#menu-hamburger"></use></svg>
              <svg class="u-svg-content" version="1.1" id="menu-hamburger" viewBox="0 0 16 16" x="0px" y="0px" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><g><rect y="1" width="16" height="2"></rect><rect y="7" width="16" height="2"></rect><rect y="13" width="16" height="2"></rect>
</g></svg>
            </a>
          </div>
          <div class="u-custom-menu u-nav-container">
            <ul class="u-nav u-spacing-30 u-unstyled u-nav-1"><li class="u-nav-item"><a class="u-border-2 u-border-active-palette-1-base u-border-hover-palette-1-base u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-text-active-palette-1-base u-text-grey-90 u-text-hover-grey-90" href="https://www.hypeds.com/" style="padding: 10px 0px;">Home</a>
</li><li class="u-nav-item"><a class="u-border-2 u-border-active-palette-1-base u-border-hover-palette-1-base u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-text-active-palette-1-base u-text-grey-90 u-text-hover-grey-90" href="https://www.hypeds.com/hypedmusic" style="padding: 10px 0px;">Hyped Music</a>
</li><li class="u-nav-item"><a class="u-border-2 u-border-active-palette-1-base u-border-hover-palette-1-base u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-text-active-palette-1-base u-text-grey-90 u-text-hover-grey-90" href="https://www.hypeds.com/minecraft" style="padding: 10px 0px;">Minecraft</a>
</li><li class="u-nav-item"><a class="u-border-2 u-border-active-palette-1-base u-border-hover-palette-1-base u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-text-active-palette-1-base u-text-grey-90 u-text-hover-grey-90" href="https://www.hypeds.com/docs" style="padding: 10px 0px;">Docs</a>
</li><li class="u-nav-item"><a class="u-border-2 u-border-active-palette-1-base u-border-hover-palette-1-base u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-text-active-palette-1-base u-text-grey-90 u-text-hover-grey-90" href="https://api.hypeds.com/v5/oauth/login" style="padding: 10px 0px;">LOGIN</a>
</li></ul>
          </div>
          <div class="u-custom-menu u-nav-container-collapse">
            <div class="u-black u-container-style u-inner-container-layout u-opacity u-opacity-95 u-sidenav">
              <div class="u-inner-container-layout u-sidenav-overflow">
                <div class="u-menu-close"></div>
                <ul class="u-align-center u-nav u-popupmenu-items u-unstyled u-nav-2"><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/">Home</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/hypedmusic">Hyped Music</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/minecraft">Minecraft</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/docs">Docs</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://api.hypeds.com/v5/oauth/login">LOGIN</a>
</li></ul>
              </div>
            </div>
            <div class="u-black u-menu-overlay u-opacity u-opacity-70"></div>
          </div>
        </nav>
      </div></header>
    <section class="u-clearfix u-grey-60 u-section-1" id="sec-4676">
      <div class="u-clearfix u-sheet u-sheet-1">
        <div class="u-border-3 u-border-grey-40 u-container-style u-grey-80 u-group u-group-1">
          <div class="u-container-layout u-container-layout-1">
            <h2 class="u-align-center u-text u-text-1">Revise seu pedido:</h2>
            <h4 class="u-text u-text-2">| Pedido:</h4>
            <ul class="u-text u-text-3">
              <li>
                <div class="class u-list-icon"></div>${productName}
              </li>
              <li>
                <div class="class u-list-icon"></div>R$ ${productPrice}
              </li>
            </ul>
            <h4 class="u-text u-text-4">| Informações de Entrega:</h4>
            <ul class="u-text u-text-5">
              <li>
                <div class="class u-list-icon"></div>Nickname: ${userNickname}
              </li>
              <li>
                <div class="class u-list-icon"></div>Email: ${userEmail}
              </li>
            </ul>
            <h4 class="u-text u-text-6">| Cupom:</h4>
            <ul class="u-text u-text-7">
              <li>
                <div class="class u-list-icon"></div>${checkoutCupom}
              </li>
              <li>
                <div class="class u-list-icon"></div>${checkoutCupomPercentage} % de desconto
              </li>
            </ul>
            <a href="https://api.hypeds.com/v5/checkout/pay/${req.params.id}" class="u-btn u-btn-round u-button-style u-hover-palette-1-light-1 u-palette-1-base u-radius-50 u-btn-1">Prosseguir p/ pagamento</a>
            <a href="https://api.hypeds.com/v5/checkout/${db.get(`CheckoutProduct_${req.params.id}`)}" class="u-border-none u-btn u-btn-round u-button-style u-grey-60 u-hover-grey-50 u-radius-50 u-btn-2">Voltar</a>
          </div>
        </div>
      </div>
    </section>
    
    
    <footer class="u-align-center u-clearfix u-footer u-grey-90 u-footer" id="sec-4960"><div class="u-clearfix u-sheet u-sheet-1">
        <p class="u-text u-text-1">Links Úteis&nbsp;<br>
          <span style="font-weight: 400;">
            <a href="https://stats.uptimerobot.com/1BnoXi6Mgp" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-custom-color-2 u-btn-1"> Status Page</a>
          </span>
          <br>
          <span style="font-weight: 400;">
            <a href="https://v4.hypeds.com/api" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-custom-color-2 u-btn-2">API</a>
          </span>
          <br>
          <span style="font-weight: 400;">
            <a href="https://www.hypeds.com/discord" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-custom-color-2 u-btn-3">Discord</a>
          </span>
          <br>
        </p>
        <p class="u-text u-text-2">
          <a href="https://www.hypeds.com/tos" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-palette-1-base u-btn-4">TOS</a>
        </p>
        <p class="u-small-text u-text u-text-variant u-text-3">© HYPED GROUP 2022</p>
      </div></footer>
</body></html>`)
})

router.get('/pay/:id', function(req, res) {
  let productName = db.get(`CheckoutProduct_${req.params.id}`)
  let productPrice = db.get(`ProductPrice_${productName}`)

  if(productPrice === "9,99") productPrice = "9.99"
  if(productPrice === "24,99") productPrice = "24.99"
  if(productPrice === "49,99") productPrice = "49.99"
  
  if(productName === "vip") productName = "VIP - HYPED MC"
  if(productName === "mvp") productName = "MVP - HYPED MC"
  if(productName === "mvpplus") productName = "MVP+ - HYPED MC"
  
  res.send(`<!DOCTYPE html>
<html style="font-size: 16px;"><head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <title>HYPED MC | Checkout</title>
    <link rel="shortcut icon" href="https://static.wixstatic.com/media/a926b2_cfc2b507c19546d88a6a2231b832b022%7Emv2.png/v1/fill/w_32%2Ch_32%2Clg_1%2Cusm_0.66_1.00_0.01/a926b2_cfc2b507c19546d88a6a2231b832b022%7Emv2.png" type="image/png">
    <link rel="stylesheet" href="https://www.hypeds.com/css/2nicepage.css" media="screen">
<link rel="stylesheet" href="https://www.hypeds.com/css/Checkout.css" media="screen">
    <script class="u-script" type="text/javascript" src="https://www.hypeds.com/js/jquery.js" defer=""></script>
    <script class="u-script" type="text/javascript" src="https://www.hypeds.com/js/nicepage.js" defer=""></script>
    <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
    <meta name="theme-color" content="#478ac9">
    <meta property="og:title" content="Checkout">
    <meta property="og:type" content="website">
  </head>
  <body class="u-body u-xl-mode"><header class="u-clearfix u-grey-75 u-header u-header" id="sec-b08d"><div class="u-clearfix u-sheet u-sheet-1">
        <a href="https://www.hypeds.com/" class="u-image u-logo u-image-1" data-image-width="640" data-image-height="642" title="Home">
          <img src="https://www.hypeds.com/images/hyped.png" class="u-logo-image u-logo-image-1">
        </a>
        <nav class="u-menu u-menu-dropdown u-offcanvas u-menu-1">
          <div class="menu-collapse" style="font-size: 1rem; letter-spacing: 0px; font-weight: 700; text-transform: uppercase;">
            <a class="u-button-style u-custom-active-border-color u-custom-active-color u-custom-border u-custom-border-color u-custom-borders u-custom-hover-border-color u-custom-hover-color u-custom-left-right-menu-spacing u-custom-padding-bottom u-custom-text-active-color u-custom-text-color u-custom-text-hover-color u-custom-top-bottom-menu-spacing u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base" href="#">
              <svg class="u-svg-link" viewBox="0 0 24 24"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#menu-hamburger"></use></svg>
              <svg class="u-svg-content" version="1.1" id="menu-hamburger" viewBox="0 0 16 16" x="0px" y="0px" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><g><rect y="1" width="16" height="2"></rect><rect y="7" width="16" height="2"></rect><rect y="13" width="16" height="2"></rect>
</g></svg>
            </a>
          </div>
          <div class="u-custom-menu u-nav-container">
            <ul class="u-nav u-spacing-30 u-unstyled u-nav-1"><li class="u-nav-item"><a class="u-border-2 u-border-active-palette-1-base u-border-hover-palette-1-base u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-text-active-palette-1-base u-text-grey-90 u-text-hover-grey-90" href="https://www.hypeds.com" style="padding: 10px 0px;">Home</a>
</li><li class="u-nav-item"><a class="u-border-2 u-border-active-palette-1-base u-border-hover-palette-1-base u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-text-active-palette-1-base u-text-grey-90 u-text-hover-grey-90" href="https://www.hypeds.com/hypedmusic" style="padding: 10px 0px;">Hyped Music</a>
</li><li class="u-nav-item"><a class="u-border-2 u-border-active-palette-1-base u-border-hover-palette-1-base u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-text-active-palette-1-base u-text-grey-90 u-text-hover-grey-90" href="https://www.hypeds.com/minecraft" style="padding: 10px 0px;">Minecraft</a>
</li><li class="u-nav-item"><a class="u-border-2 u-border-active-palette-1-base u-border-hover-palette-1-base u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-text-active-palette-1-base u-text-grey-90 u-text-hover-grey-90" href="https://www.hypeds.com/docs" style="padding: 10px 0px;">Docs</a>
</li><li class="u-nav-item"><a class="u-border-2 u-border-active-palette-1-base u-border-hover-palette-1-base u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-text-active-palette-1-base u-text-grey-90 u-text-hover-grey-90" href="https://api.hypeds.com/v5/oauth/login" style="padding: 10px 0px;">LOGIN</a>
</li></ul>
          </div>
          <div class="u-custom-menu u-nav-container-collapse">
            <div class="u-black u-container-style u-inner-container-layout u-opacity u-opacity-95 u-sidenav">
              <div class="u-inner-container-layout u-sidenav-overflow">
                <div class="u-menu-close"></div>
                <ul class="u-align-center u-nav u-popupmenu-items u-unstyled u-nav-2"><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com">Home</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/hypedmusic">Hyped Music</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/minecraft">Minecraft</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://www.hypeds.com/docs">Docs</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="https://api.hypeds.com/v5/oauth/login">LOGIN</a>
</li></ul>
              </div>
            </div>
            <div class="u-black u-menu-overlay u-opacity u-opacity-70"></div>
          </div>
        </nav>
      </div></header>
    <section class="u-clearfix u-grey-60 u-section-1" id="sec-4676">
      <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
        <div class="u-border-3 u-border-grey-40 u-container-style u-grey-80 u-group u-group-1">
          <div class="u-container-layout u-container-layout-1">
            <h2 class="u-align-center u-text u-text-1">Realize o pagamento:<br>
            </h2>
            <div id="smart-button-container">
              <div style="text-align: center;">
                <div id="paypal-button-container"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <script src="https://www.paypal.com/sdk/js?client-id=sb&enable-funding=venmo&currency=BRL" data-sdk-integration-source="button-factory"></script>
  <script>
    function initPayPalButton() {
      paypal.Buttons({
        style: {
          shape: 'pill',
          color: 'silver',
          layout: 'vertical',
          label: 'paypal',
          
        },

        createOrder: function(data, actions) {
          return actions.order.create({
            purchase_units: [{"description":"${productName}","amount":{"currency_code":"BRL","value":${productPrice}}}]
          });
        },

        onApprove: function(data, actions) {
          return actions.order.capture().then(function(orderData) {
            
            // Full available details
            console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

            // Show a success message within this page, e.g.
            //const element = document.getElementById('paypal-button-container');
            //element.innerHTML = '';
            //element.innerHTML = '<h3>Thank you for your payment!</h3>';

            actions.redirect('https://api.hypeds.com/v5/payment/a/${req.params.id}');
            
          });
        },

        onError: function(err) {
          console.log(err);
        }
      }).render('#paypal-button-container');
    }
    initPayPalButton();
  </script>
    <footer class="u-align-center u-clearfix u-footer u-grey-90 u-footer" id="sec-4960"><div class="u-clearfix u-sheet u-sheet-1">
        <p class="u-text u-text-1">Links Úteis&nbsp;<br>
          <span style="font-weight: 400;">
            <a href="https://stats.uptimerobot.com/1BnoXi6Mgp" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-custom-color-2 u-btn-1"> Status Page</a>
          </span>
          <br>
          <span style="font-weight: 400;">
            <a href="https://v4.hypeds.com/api" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-custom-color-2 u-btn-2">API</a>
          </span>
          <br>
          <span style="font-weight: 400;">
            <a href="https://www.hypeds.com/discord" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-custom-color-2 u-btn-3">Discord</a>
          </span>
          <br>
        </p>
        <p class="u-text u-text-2">
          <a href="https://www.hypeds.com/tos" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-palette-1-base u-btn-4">TOS</a>
        </p>
        <p class="u-small-text u-text u-text-variant u-text-3">© HYPED GROUP 2022</p>
      </div></footer>
  
</body></html>`)
});

module.exports = router;