const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session')
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const useragent = require('express-useragent');
const session = require('express-session');
const cors = require('cors')
const ejs = require('ejs');

const config = require('./config.json')

const app = express();//I'm gay

if(config.debug === true) {
  app.use(logger('dev'));
}

var corsOptions = {
  origin: ['https://shareit.hypeds.com', 'https://beta.hypeds.com', 'https://docs.hypeds.com', 'https://edu.hypeds.com', 'https://e.hypeds.com', 'https://hypeds.link', 'https://hpd.ink', 'https://fursmp.com'],
}

app.use(cors(corsOptions))
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(useragent.express());

app.use(cookieSession({
  name: 'session',
  keys: [config.cookieToken],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: config.cookieToken,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

var router = express.Router();  

var apiRouter = require('./routes/api.js')
var docsRouter = require('./routes/docs.js')
var versionRouter = require('./routes/version.js')

//V1
var hentaiRouter = require('./routes/v1/nsfw/hentai.js')
var yiffyRouter = require('./routes/v1/nsfw/yiff.js')
var nsfwRouter = require('./routes/v1/base/nsfw.js')
var usersRouter = require('./routes/v1/users.js')

//v5
var deletev5Router = require('./routes/v5/webdb/delete.js')
var profileDBv5Router = require('./routes/v5/webdb/profile.js')
var pushV5Router = require('./routes/v5/webdb/push.js')
var addv5Router = require('./routes/v5/webdb/add.js')
var getv5Router = require('./routes/v5/webdb/get.js')
var setv5Router = require('./routes/v5/webdb/set.js')

var tokenCheckV5Router = require('./routes/v5/req_handler/checkToken.js')

var indexDashboardRouter = require('./routes/v5/dashboard/index.js')

var oAuthLoginRouter = require('./routes/v5/login_sys/login.js')
var oAuthLogoutRouter = require('./routes/v5/login_sys/logout.js')
var oAuth2LoginRouter = require('./routes/v5/oauth2/login.js')
var oAuth2LogoutRouter = require('./routes/v5/oauth2/logout.js')

var usersv5router = require('./routes/v5/users.js')
var guildsv5router = require('./routes/v5/guilds.js')

var paymentsv5Checkout = require('./routes/v5/payments/checkouts/checkout.js')
var paymentsv5Router = require('./routes/v5/payments/payment.js')

var profilev5router = require('./routes/v5/users/profile.js')
var dynamicPageSemente_1 = require('./routes/v5/dynamicPage/school/index.js')
var dynamicPageRevistaSF_1 = require('./routes/v5/dynamicPage/revista/index.js')
var dynamicPageSemente_2 = require('./routes/v5/dynamicPage/school/formulario.js')
var dynamicPageSemente_3 = require('./routes/v5/dynamicPage/school/responseSent.js')

//v6
var oAuth2v6LoginRouter = require('./routes/v6/oauth2/login.js')
var oAuth2v6LogoutRouter = require('./routes/v6/oauth2/logout.js')
var oAuth2v6Register = require('./routes/v6/oauth2/register/hyped.js')
var oAuth2v6RegisterWithDiscord = require('./routes/v6/oauth2/register/discord.js')
var oAuth2v6RegisterWithReplit = require('./routes/v6/oauth2/register/replit.js')

var usersv6router = require('./routes/v6/users/info.js')
var profileCheckv6Router = require('./routes/v6/users/profiles.js')

var paymentsv6Router = require('./routes/v6/payments/handler.js')
var paychecksv6Checkout = require('./routes/v6/payments/checkout/index.js')

var dashboardRouter = require('./routes/v6/dashboard/index.js')

//v7
var usersInfov7router = require('./routes/v7/users/info/info.js')
var usersGetIdv7router = require('./routes/v7/users/info/getid.js')
var usersInfoByID = require('./routes/v7/users/info/byid.js')
var temptokenRouter = require('./routes/v7/temptoken.js')
var fursmpProfilev7router = require('./routes/v7/users/fursmp/profile.js')
var fursmpAddNickname = require('./routes/v7/users/addnickname.js');

var usersLinkinbiov7Router = require('./routes/v7/users/linkinbio.js')

var paymentsv7Router = require('./routes/v7/payments/old/handler.js')
var paychecksv7CheckoutMp = require('./routes/v7/payments/old/mp/checkout.js')
var paychecksv7CheckoutPaypal = require('./routes/v7/payments/old/paypal/checkout.js')

var getTokenv7Router = require('./routes/v7/getToken.js')
var getTokenv6Router = require('./routes/v6/getToken.js')
var getTokenv5Router = require('./routes/v5/getToken.js')

var libAddbio = require('./routes/v7/lib/addbio.js')
var userAddbio = require('./routes/v7/users/addbio.js')

var oauth22FAMailConfirmv7Router = require('./routes/v7/oauth2/2fa/mailconfirm.js');
var oauth22FAResendCodev7Router = require('./routes/v7/oauth2/2fa/resendcode.js');

var oauth2Loginv7Router = require('./routes/v7/oauth2/login.js');
var oauth2Logoutv7Router = require('./routes/v7/oauth2/logout.js');
var oauth2Registerv7Router = require('./routes/v7/oauth2/register/hyped');
var oauth2Registerv7RouterWithDiscord = require('./routes/v7/oauth2/register/discord');

var newsletterUsersAddv7Router = require('./routes/v7/newsletter/users/adduser.js');
var newsletterUsersRemovev7Router = require('./routes/v7/newsletter/users/removeuser.js');
var newsletterUsersNumberv7Router = require('./routes/v7/newsletter/users/getnumber.js');

var sendFormRouter = require('./routes/v7/forms/getForm.js')
var viewFormRouter = require('./routes/v7/forms/handler.js')
var dashboardFormsRouter = require('./routes/v7/forms/dashboard.js')

router.get('/', function(req, res, next) {
  res.json({ message: 'Oh, looks like you are trying to use our api, follow the link below to read the docs: https://www.hypeds.com/docs', note: "Api under development. Please wait until launch." });
});

//Use routes
//aaaaa
app.use('/v7/getToken', getTokenv7Router)
app.use('/v6/getToken', getTokenv6Router)
app.use('/v5/getToken', getTokenv5Router)

//v7
app.use('/v7/users/info', usersInfov7router);
app.use('/v7/users/getid', usersGetIdv7router);
app.use('/v7/users/byid', usersInfoByID);
app.use('/v7/users/fursmp/profiles', fursmpProfilev7router);
app.use('/v7/temptoken', temptokenRouter);
app.use('/v7/users/addnickname', fursmpAddNickname);

app.use('/v7/users/linkinbio', usersLinkinbiov7Router);
app.use('/v7/linkinbio', libAddbio);
app.use('/v7/users/addbio', userAddbio);

app.use('/v7/payments/checkout', paymentsv7Router);
app.use('/v7/payments/checkout/mp', paychecksv7CheckoutMp);
app.use('/v7/payments/checkout/paypal', paychecksv7CheckoutPaypal);

app.use('/v7/oauth2/2fa/mailconfirm', oauth22FAMailConfirmv7Router);
app.use('/v7/oauth2/2fa/resendcode', oauth22FAResendCodev7Router);

app.use('/v7/oauth2/login', oauth2Loginv7Router);
app.use('/v7/oauth2/logout', oauth2Logoutv7Router);
app.use('/v7/oauth2/register', oauth2Registerv7Router);
app.use('/v7/oauth2/partner/addDiscord', oauth2Registerv7RouterWithDiscord);

app.use('/v7/newsletter/users/adduser', newsletterUsersAddv7Router);
app.use('/v7/newsletter/users/removeuser', newsletterUsersRemovev7Router);
app.use('/v7/newsletter/users/getnumber', newsletterUsersNumberv7Router);

app.use('/v7/forms/sendform', sendFormRouter)
app.use('/v7/forms/view', viewFormRouter)
app.use('/v7/forms/dashboard', dashboardFormsRouter)

//v6
app.use('/v6/oauth2/login', oAuth2v6LoginRouter)
app.use('/v6/oauth2/logout', oAuth2v6LogoutRouter)
app.use('/v6/oauth2/register', oAuth2v6Register)
app.use('/v6/oauth2/loginWith', oAuth2v6RegisterWithDiscord)
app.use('/v6/oauth2/loginWith', oAuth2v6RegisterWithReplit)

app.use('/v6/users', usersv6router)
app.use('/v6/profiles/checkprofile', profileCheckv6Router)

app.use('/v6/payments', paymentsv6Router)
app.use('/v6/payments/checkout', paychecksv6Checkout)

app.use('/v6/dashboard', dashboardRouter)

//v5
app.use('/v5/db/delete', deletev5Router)
app.use('/v5/db/profile', profileDBv5Router)
app.use('/v5/db/push', pushV5Router)
app.use('/v5/db/add', addv5Router)
app.use('/v5/db/get', getv5Router)
app.use('/v5/db/set', setv5Router)
app.use('/v5/db', apiRouter)

app.use('/v5/checkToken', tokenCheckV5Router)

app.use('/v5/oauth/login', oAuthLoginRouter)
app.use('/v5/oauth/logout', oAuthLogoutRouter)
app.use('/v5/oauth2/login', oAuth2LoginRouter)
app.use('/v5/oauth2/logout', oAuth2LogoutRouter)

app.use('/v5/dashboard/', indexDashboardRouter)

app.use('/v5', apiRouter)
app.use('/v5/users', usersv5router)
app.use('/v5/guilds', guildsv5router)

app.use('/v5/checkout', paymentsv5Checkout)
app.use('/v5/payment', paymentsv5Router)

app.use('/v5/users/profile', profilev5router)
app.use('/v5/dynamicPage/semente', dynamicPageSemente_1)
app.use('/v5/dynamicPage/revista', dynamicPageRevistaSF_1)
app.use('/v5/dynamicPage/formulario/semente', dynamicPageSemente_2)
app.use('/v5/dynamicPage/formulario/enviado', dynamicPageSemente_3)

//v1
app.use('/v1/nsfw/yiff', yiffyRouter)
app.use('/v1/nsfw/hentai', hentaiRouter)
app.use('/v1/nsfw', nsfwRouter)
app.use('/v1', apiRouter)
app.use('/v1/', usersRouter)
app.use('/', router)
app.use('/version', versionRouter)
app.use('/docs', docsRouter)

let port = 30025

app.listen(port);
console.log('Magic happens on port ' + port);