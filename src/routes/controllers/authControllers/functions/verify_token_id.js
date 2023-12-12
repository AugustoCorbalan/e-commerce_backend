const {OAuth2Client} = require('google-auth-library');
const { config } = require('dotenv');
config();
const {CLIENT_ID} = process.env;
const client = new OAuth2Client();

const verify_token_id = async (token_id)=>{
    //La función "verifyIdToken" verifica la firma de JWT, la reclamación "aud", la reclamación "exp" y "iss".
    const ticket = await client.verifyIdToken({
        idToken: token_id,
        audience: CLIENT_ID,
    })
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    return {payload, userid};
};

module.exports = verify_token_id;