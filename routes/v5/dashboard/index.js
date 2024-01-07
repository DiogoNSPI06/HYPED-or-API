const express = require('express');
const request = require('https')
const db = require('quick.db');
var router = express.Router();  

router.get('/:uuid', function(req, res) {
  let token = db.get(`SessionToken_${req.cookies.SessionId}`)
  let sessionToken = db.get(`SessionIsLogged_${token}_${req.params.uuid}`)
  
  if(!sessionToken) {
    return res.sendFile('/home/runner/HYPED-or-API/routes/v5/dashboard/html/loginFail.html')
  } 
  let userID = db.get(`UserID_${req.params.uuid}`)
    
  request.get(`https://v4.hypeds.com/api/users/${userID}`, (resp) => {
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
    <meta name="keywords" content="Olá @user, BEM VINDO A DASHBOARD, Configure seu perfil:, PEGUE SEU DAILY:">
    <meta name="description" content="">
    <meta name="page_type" content="np-template-header-footer-from-plugin">
    <title>HYPED | Dashboard</title>
    <link rel="stylesheet" href="https://www.hypeds.com/css/2nicepage.css" media="screen">
<link rel="stylesheet" href="https://www.hypeds.com/css/Dashboard.css" media="screen">
<link rel="shortcut icon" href="https://static.wixstatic.com/media/a926b2_cfc2b507c19546d88a6a2231b832b022%7Emv2.png/v1/fill/w_32%2Ch_32%2Clg_1%2Cusm_0.66_1.00_0.01/a926b2_cfc2b507c19546d88a6a2231b832b022%7Emv2.png" type="image/png">
    <script class="u-script" type="text/javascript" src="https://www.hypeds.com/js/nicepage.js" defer=""></script>
    <script class="u-script" type="text/javascript" src="https://www.hypeds.com/js/jquery.js" defer=""></script>
    <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
    
    
    
    
    
    
    <script type="application/ld+json">{
		"@context": "http://schema.org",
		"@type": "Organization",
		"name": ""
}</script>
    <meta name="theme-color" content="#478ac9">
    <meta property="og:title" content="HYPED | Dashboard">
    <meta property="og:type" content="website">
  </head>
  <body class="u-body u-xl-mode">
    <section class="u-align-center u-black u-clearfix u-section-1" id="sec-04f5">
      <div class="u-align-left u-clearfix u-sheet u-sheet-1">
        <img class="u-image u-image-circle u-image-1" src="${JSON.parse(data).avatarURL}" alt="" data-image-width="780" data-image-height="450" data-href="https://api.hypeds.com/v5/users/profile/${userID}" data-target="_blank">
        <img class="u-image u-image-default u-preserve-proportions u-image-2" src="https://www.hypeds.com/images/hypedavatar.png" alt="" data-image-width="1024" data-image-height="1024" data-href="https://api.hypeds.com/v5/dashboard/${req.params.uuid}">
        <h1 class="u-text u-text-default u-text-1">Olá @${JSON.parse(data).nickname}</h1>
        <h5 class="u-text u-text-default u-text-2">
          <a href="https://api.hypeds.com/v5/oauth/logout/${req.params.uuid}" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-grey-50 u-btn-1">Logout</a>
        </h5>
      </div>
    </section>
    <section class="u-align-left u-clearfix u-image u-shading u-section-2" src="" data-image-width="1600" data-image-height="900" id="sec-d58a">
      <div class="u-clearfix u-sheet u-sheet-1">
        <h1 class="u-text u-text-default u-title u-text-1">BEM VINDO A DASHBOARD</h1>
        <p class="u-large-text u-text u-text-variant u-text-2">Aqui você pode configurar facilmente o hyped!</p>
      </div>
    </section>
    <section class="u-align-left u-clearfix u-grey-50 u-section-3" id="sec-a320">
      <div class="u-clearfix u-sheet u-sheet-1">
        <div class="fr-view u-clearfix u-rich-text u-text u-text-1">
          <h1 style="text-align: left;">
            <br>
          </h1>
          <blockquote>
            <p style="text-align: left;">
              <span style="line-height: 2; font-weight: 700;">Está procurando seu Token de api? Pegue-o&nbsp;</span>
              <a href="https://api.hypeds.com/v5/dashboard/${req.params.uuid}/createToken"></a>
              <span style="line-height: 2; font-weight: 700;">
                <a href="https://api.hypeds.com/v5/dashboard/${req.params.uuid}/createToken">
                  <span class="u-text-palette-1-base">aqui</span>
                </a>
              </span>
              <span style="line-height: 2; font-weight: 700;">!&nbsp;</span>
            </p>
          </blockquote>
        </div>
      </div>
    </section>
    <section class="u-align-center u-clearfix u-grey-50 u-section-4" id="carousel_4a11">
      <div class="u-align-left u-clearfix u-sheet u-sheet-1">
        <h2 class="u-text u-text-default u-text-1">ENCURTADOR HYPED:</h2>
        <a href="https://api.hypeds.com/v5/dashboard/${req.params.uuid}/encurtador" class="u-border-none u-btn u-btn-round u-button-style u-hover-palette-1-light-1 u-palette-1-base u-radius-50 u-btn-1">CONFIGURE</a>
      </div>
    </section>
    <section class="u-align-center u-clearfix u-grey-50 u-section-4" id="sec-6d0d">
      <div class="u-clearfix u-sheet u-sheet-1">
        <h2 class="u-text u-text-default u-text-1">Configure seu perfil:</h2>
        <div class="u-form u-form-1">
          <form method="POST" class="u-clearfix u-form-horizontal u-form-spacing-15 u-inner-form" style="padding: 15px;" source="custom">
            <div class="u-form-group u-form-name u-label-none">
              <label for="name-ef64" class="u-label">Aboutme</label>
              <input type="text" placeholder="Escreva seu sobremim aqui!" id="name-ef64" name="aboutme" class="u-border-1 u-border-grey-30 u-input u-input-rectangle" required="">
            </div>
            <div class="u-form-group u-form-submit">
              <a href="#" class="u-border-none u-btn u-btn-round u-btn-submit u-button-style u-palette-1-base u-radius-19 u-btn-1">Salvar<br>
              </a>
              <input type="submit" value="submit" class="u-form-control-hidden">
            </div>
            <div class="u-form-send-message u-form-send-success">#FormSendSuccess</div>
            <div class="u-form-send-error u-form-send-message">#FormSendError</div>
            <input type="hidden" value="" name="recaptchaResponse">
          </form>
        </div>
      </div>
    </section>
    <section class="u-align-center u-clearfix u-grey-50 u-section-5" id="sec-4094">
      <div class="u-align-left u-clearfix u-sheet u-sheet-1">
        <h2 class="u-text u-text-default u-text-1">PEGUE SEU DAILY:</h2>
        <img class="u-image u-image-round u-preserve-proportions u-radius-10 u-image-1" src="https://www.hypeds.com/images/gift.png" alt="" data-image-width="147" data-image-height="150">
        <a href="https://api.hypeds.com/v5/buttons/daily/${userID}" class="u-border-none u-btn u-btn-round u-button-style u-hover-palette-1-light-1 u-palette-1-base u-radius-50 u-btn-1">CLIQUE PARA PEGAR</a>
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
  </body>
</html>`)
    })
  })
  
});

//ENCURTADOR
router.get('/:uuid/encurtador', function(req, res) {
  let token = db.get(`SessionToken_${req.cookies.SessionId}`)
  let sessionToken = db.get(`SessionIsLogged_${token}_${req.params.uuid}`)
  
  if(!sessionToken) {
    return res.sendFile('/home/runner/HYPED-or-API/routes/v5/dashboard/html/loginFail.html')
  } 
  let userID = db.get(`UserID_${req.params.uuid}`)
  let userURLs = db.get(`UserUrls_${userID}`)

  request.get(`https://v4.hypeds.com/api/users/${userID}`, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      res.send(`<!DOCTYPE html>
<html style="font-size: 16px;"><head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <meta name="keywords" content="">
    <meta name="description" content="">
    <title>HYPED | Encurtador</title>
    <link rel="stylesheet" href="https://www.hypeds.com/css/2nicepage.css" media="screen">
<link rel="stylesheet" href="https://www.hypeds.com/css/Encurtador.css" media="screen">
    <link rel="shortcut icon" href="https://static.wixstatic.com/media/a926b2_cfc2b507c19546d88a6a2231b832b022%7Emv2.png/v1/fill/w_32%2Ch_32%2Clg_1%2Cusm_0.66_1.00_0.01/a926b2_cfc2b507c19546d88a6a2231b832b022%7Emv2.png" type="image/png">
    <script class="u-script" type="text/javascript" src="https://www.hypeds.com/js/jquery.js" defer=""></script>
    <script class="u-script" type="text/javascript" src="https://www.hypeds.com/js/nicepage.js" defer=""></script>
    <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
    <script type="application/ld+json">{
		"@context": "http://schema.org",
		"@type": "Organization",
		"name": "HYPED | Encurtador"
}</script>
    <script>
     let items = ["${userURLs}"],
    ul = document.createElement('ul');

document.getElementById('list').appendChild(ul);

items.forEach(item => {
    let li = document.createElement('li');
    ul.appendChild(li);

    li.innerHTML += item;
});
    </script>
    <meta name="theme-color" content="#478ac9">
    <meta property="og:title" content="Encurtador">
    <meta property="og:type" content="website">
  </head>
  <body class="u-body u-xl-mode">
    <section class="u-align-center u-black u-clearfix u-section-1" id="sec-020a">
      <div class="u-align-left u-clearfix u-sheet u-sheet-1">
        <img class="u-image u-image-circle u-image-1" src="${JSON.parse(data).avatarURL}" alt="" data-image-width="780" data-image-height="450" data-href="https://api.hypeds.com/v5/users/profile/${userID}" data-target="_blank">
        <img class="u-image u-image-default u-preserve-proportions u-image-2" src="https://www.hypeds.com/images/hypedavatar.png" alt="" data-image-width="1024" data-image-height="1024" data-href="https://api.hypeds.com/v5/dashboard/${req.params.uuid}">
        <h3 class="u-text u-text-default u-text-1">Olá @${JSON.parse(data).nickname}</h3>
        <h5 class="u-text u-text-default u-text-2">
          <a href="https://api.hypeds.com/v5/oauth/logout/${req.params.uuid}" class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-grey-50 u-btn-1">Logout</a>
        </h5>
        <a href="https://e.hypeds.com/newurl/${userID}" class="u-btn u-btn-round u-button-style u-hover-palette-1-light-1 u-palette-1-base u-radius-50 u-btn-2">NOVA URL</a>
      </div>
    </section>
    <section class="u-clearfix u-grey-80 u-section-2" id="sec-f6af">
      <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
        <h3 class="u-text u-text-1">Suas URL's:</h3>
        <ul id="list"></ul>
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
  })
  
})

//API TOKEN
router.get('/:uuid/createToken', function(req, res) {
  let token = db.get(`SessionToken_${req.cookies.SessionId}`)
  let sessionToken = db.get(`SessionIsLogged_${token}_${req.params.uuid}`)
  
  if(!sessionToken) {
    return res.sendFile('/home/runner/HYPED-or-API/routes/v5/dashboard/html/loginFail.html')
  } 
  let userID = db.get(`UserID_${req.params.uuid}`)
    
  request.get(`https://v4.hypeds.com/api/users/${userID}`, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      res.send(`<html><head><style>
    body {
        background-color: #262629;
        font-family: 'Roboto', sans-serif;
    }
    .outer-container {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #99aab5;
        box-shadow: 0px 0px 10px #1B1E21;
        border-radius: 50px;
        width: 45%;
    }
    .plasma {
        color: #ffffff;
        font-size: 70px;
        margin: 0;
        font-weight: 400;
        text-align: center;
    }
    .ends {
        color: #ffffff;
        font-size: 35px;
        margin: 0;
        text-align: center;
    }
    .date {
        color: #99AAB5;
        font-size: 25px;
        margin: 0;
        padding-bottom: 50px;
        text-align: center;
    }
    .logo {
        max-width: 100%;
        height: auto;
        width: auto;
        margin: 0;
    }
</style>
<link href="https://fonts.googleapis.com/css2?family=Roboto&amp;display=swap" rel="stylesheet">
<link rel="shortcut icon" type="image/x-icon" href="https://static.wixstatic.com/media/a926b2_cfc2b507c19546d88a6a2231b832b022%7Emv2.png/v1/fill/w_32%2Ch_32%2Clg_1%2Cusm_0.66_1.00_0.01/a926b2_cfc2b507c19546d88a6a2231b832b022%7Emv2.png">
<title>HYPED | Dashboard</title>
</head><body><div class="outer-container" wfd-id="0">
    <div class="container" wfd-id="1">
        <p class="plasma">Clique abaixo para criar seu token!</p>
        <a href="https://api.hypeds.com/v5/dashboard/${req.params.uuid}/yourToken">
          <button>Crie seu token</button>
        </a>
    </div>
</div>
</body></html>`)
    })
  })
  
});

router.get('/:uuid/yourToken', function(req, res) {
  let token = db.get(`SessionToken_${req.cookies.SessionId}`)
  let sessionToken = db.get(`SessionIsLogged_${token}_${req.params.uuid}`)
  
  if(!sessionToken) {
    return res.sendFile('/home/runner/Hyped-API/routes/v5/dashboard/html/loginFail.html')
  } 
  let userID = db.get(`UserID_${req.params.uuid}`)

  let random = '';
  let dict = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  for(var i = 0; i < 14; i++) {
    random = random + dict.charAt(Math.floor(Math.random() * dict.length));
  }

  let generatedToken = `Nzal${random}621`

  let userHasToken = db.get(`UserHasToken_${userID}`)
  if(userHasToken === true) generatedToken = db.get(`UserToken_${userID}`)

  db.set(generatedToken, generatedToken)
  db.set(`UserToken_${userID}`, generatedToken)
  db.set(`UserHasToken_${userID}`, true)
    
  request.get(`https://v4.hypeds.com/api/users/${userID}`, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      res.send(`<html><head><style>
    body {
        background-color: #262629;
        font-family: 'Roboto', sans-serif;
    }
    .outer-container {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #99aab5;
        box-shadow: 0px 0px 10px #1B1E21;
        border-radius: 50px;
        width: 45%;
    }
    .plasma {
        color: #ffffff;
        font-size: 70px;
        margin: 0;
        font-weight: 400;
        text-align: center;
    }
    .ends {
        color: #ffffff;
        font-size: 35px;
        margin: 0;
        text-align: center;
    }
    .date {
        color: #99AAB5;
        font-size: 25px;
        margin: 0;
        padding-bottom: 50px;
        text-align: center;
    }
    .logo {
        max-width: 100%;
        height: auto;
        width: auto;
        margin: 0;
    }
</style>
<link href="https://fonts.googleapis.com/css2?family=Roboto&amp;display=swap" rel="stylesheet">
<link rel="shortcut icon" type="image/x-icon" href="https://static.wixstatic.com/media/a926b2_cfc2b507c19546d88a6a2231b832b022%7Emv2.png/v1/fill/w_32%2Ch_32%2Clg_1%2Cusm_0.66_1.00_0.01/a926b2_cfc2b507c19546d88a6a2231b832b022%7Emv2.png">
<title>HYPED | Dashboard</title>
</head><body><div class="outer-container" wfd-id="0">
    <div class="container" wfd-id="1">
        <p class="plasma">Copie seu token abaixo!</p>
        <p>${generatedToken}</p>
    </div>
</div>
</body></html>`)
    })
  })
  
});

module.exports = router;