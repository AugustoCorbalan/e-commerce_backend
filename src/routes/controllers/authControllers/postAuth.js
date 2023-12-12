const User = require('../../../db/models/user.js');
const verify_token_id = require('./functions/verify_token_id.js');

const postAuth = async (req, res)=>{
    try {
        const {token_id} = req.body;
        //Verifico la integridad del token recibido:
        const data = await verify_token_id(token_id).catch(console.error);
        //Verifico si el usuario existe en mi base de datos:
        const user = User.findOne({where:{userId: data.userid}});
        if((user!==undefined)){

        }
        console.log(data);
        res.status(200).send("hola");
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

module.exports = postAuth;