const {OAuth2Client} = require('google-auth-library');
const {google_authenticator_client} = require('./auth')
const client = new OAuth2Client(google_authenticator_client);
async function verifyUser(tokenID) {
  const ticket = await client.verifyIdToken({
      idToken: tokenID,
      audience: google_authenticator_client,    
  })
  const payload = ticket.getPayload();
  const userID = payload['sub'];
  console.log(payload)
  console.log(userID)
  return userID
}
module.exports = verifyUser
