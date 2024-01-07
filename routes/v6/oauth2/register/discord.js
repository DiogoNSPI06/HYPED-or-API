const express = require('express');
const db = require('quick.db');
const axios = require('axios').default;
var router = express.Router();

const config = require('./config.json')

router.get('/discord', async function(req, res) {
  let BackToLogin = req.query.redirectTo
  if(!req.query.redirectTo) BackToLogin = "https://api.hypeds.com/v6/oauth2/loginWith/discord"

  if(!req.query.code) return res.redirect(`https://discord.com/api/oauth2/authorize?client_id=1020746411354116146&scope=identify%20guilds&response_type=code&redirect_uri=${encodeURIComponent(BackToLogin)}`);

  const params = new URLSearchParams()
  params.append('code', req.query.code)
  params.append('client_id', config.client.id)
  params.append('grant_type', 'authorization_code')
  params.append('client_secret', config.client.secret)
  params.append('redirect_uri', BackToLogin);

  let tokens;
  try {
    const authResponse = await axios.post('https://discord.com/api/oauth2/token', params.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    tokens = authResponse.data;
  } catch (error) {
    return res.redirect('https://api.hypeds.com/v6/oauth2/loginWith/discord'); // handle error appropriately
  }

  if(!tokens.access_token) return res.redirect('https://api.hypeds.com/v6/oauth2/loginWith/discord');

  async function get(url) {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      });
      return response.data;
    } catch (error) {
      // handle error appropriately
    }
  }

  const user = {};

  try {
    user.me = await get('https://discord.com/api/users/@me');
    user.guilds = await get('https://discord.com/api/users/@me/guilds');
  } catch (error) {
    // handle error appropriately
  }

  req.session.user = user;
	req.client.emit('newUser', user.me);

  let redirectTo = req.query.redirectTo
  if(!req.query.redirectTo) redirectTo = "https://api.hypeds.com/v6/oauth2/register"

	return res.status(200).redirect(`${redirectTo}?type=discord&userAvatar=${user.me.avatar}&userID=${user.me.id}&userNickname=${user.me.username}`)
})

router.get('/addDiscord', function(req, res) {
  if(!req.query.code) return res.redirect(`https://api.hypeds.com/v6/oauth2/loginWith/discord?type=discord&redirectTo=https://api.hypeds.com/v6/oauth2/loginWith/addDiscord`);

  db.set(`HPD_User_DiscordNickname_${req.query.clientID}`, req.query.userNickname)
  db.set(`HPD_User_DiscordIsConnected_${req.query.clientID}`, true)
  db.set(`HPD_User_DiscordID_${req.query.clientID}`, req.query.userID)

  res.redirect(`https://www.hypeds.com/login`)
})

module.exports = router;