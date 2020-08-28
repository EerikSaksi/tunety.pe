const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_AUTHENTICATOR_CLIENT);
async function verifyUser(tokenID) {
  const ticket = await client.verifyIdToken({
      idToken: tokenID,
      audience: process.env.GOOGLE_AUTHENTICATOR_CLIENT,    
  })
  const payload = ticket.getPayload();
  const userID = payload['sub'];
  return userID
}
module.exports = verifyUser
