/**
 * Using Authorization code flow instead of PKCE, attempt (unused) can be found in authPKCE.js
 */

require('dotenv').config()
const axios = require('axios');
const qs = require('querystring');

// Your Client ID and Client Secret from the Spotify Developer Dashboard
const CLIENT_ID = process.env.CLIENT_ID; 
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// The URL for Spotify's authorization API
const TOKEN_URL = 'https://accounts.spotify.com/api/token';

// Encode the Client ID and Client Secret in base64 for basic auth
const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

// Request the token from Spotify
async function getAccessToken() {
    try {
        // Send a POST request to get the access token
        const response = await axios.post(TOKEN_URL, qs.stringify({ grant_type: 'client_credentials' }), {
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        // Extract the access token from the response
        const accessToken = response.data.access_token;
        console.log('Access Token:', accessToken);

        return accessToken;
    } catch (error) {
        console.error('Error getting access token:', error);
    }
}

// Token usage
getAccessToken().then((token) => {
    // Now you can use the token to make requests to the Spotify API
    auth_code = process.env.AUTH_CODE
    const res = axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${auth_code}`,  // Set the access token in the request header
        },
      });
});
