/**
 * Using Authorization code flow instead of PKCE, attempt (unused) can be found in authPKCE.js
 */
require('dotenv').config()
const axios = require('axios');
const qs = require('querystring');

// Client ID and Client Secret from the Spotify Developer Dashboard
const CLIENT_ID = process.env.CLIENT_ID; 
const CLIENT_SECRET = process.env.CLIENT_SECRET;


