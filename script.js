/**
 * Using Authorization code flow, attempt at PKCE (not used) found in authPKCE.js
 * https://developer.spotify.com/documentation/web-api/tutorials/code-flow
*/ 
require('dotenv').config();
const express = require('express');

var client_id = process.env.client_id;
// var client_secret = process.env.client_secret;
var redirect_uri = 'http://localhost:8888/callback';

var app = express();

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  console.log(state);
  var scope = 'user-read-private user-read-email';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});
