const express = require('express');
const axios = require('axios').default; // using axios
const db = require('quick.db');
var router = express.Router();

const config = require('./config.json')

router.get('/', async function(req, res) {
  let BackToLogin = "https://api.hypeds.com/v7/oauth2/partner/addDiscord"

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

  let RedirectTO = "https://api.hypeds.com/v7/oauth2/register";

  return res.status(200).redirect(`${RedirectTO}?type=discord&userAvatar=${user.me.avatar}&userID=${user.me.id}&userNickname=${user.me.username}`)
});

module.exports = router;
