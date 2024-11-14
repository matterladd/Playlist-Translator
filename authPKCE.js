// https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow
// running with Node, so some things have to change slightly

const axios = require('axios');
const crypto = require('crypto');
const fs = require('fs')

const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}
  
const sha256 = (plain) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    const hash = crypto.createHash('sha256');
    hash.update(data);
    const nodeBuffer = hash.digest(); // returns a node.js buffer
    const ArrayBuffer = nodeBuffer.buffer.slice(nodeBuffer.byteOffset, nodeBuffer.byteOffset + nodeBuffer.byteLength); // convert to ArrayBuffer
    return ArrayBuffer;
}

const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}


const codeVerifier  = generateRandomString(64);
const hashed = sha256(codeVerifier);
const codeChallenge = base64encode(hashed);
console.log("codeVerifier: " + codeVerifier);
console.log("hashed: " + hashed);
console.log("codeChallenge: " + codeChallenge);

// ---------------- request user authorization ------------------
const clientId = 'c1f19dc224044c358df6ec4334d73353';
const redirectUri = 'http://localhost';

const scope = 'user-read-private user-read-email';
const authorizationUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;

console.log("Visit this URL to authorize the app:");
console.log(authorizationUrl);

/*
// generated in the previous step
const filePath = 'codeVerifier.txt';
fs.writeFileSync(filePath, codeVerifier);
const params =  {
  response_type: 'code',
  client_id: clientId,
  scope,
  code_challenge_method: 'S256',
  code_challenge: codeChallenge,
  redirect_uri: redirectUri,
}

authUrl.search = new URLSearchParams(params).toString();
console.log(authUrl.toString());
*/

