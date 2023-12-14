const verify_token_id = require('./functions/verify_token_id.js');
const handleUser = require('./functions/handleUser.js');

const postAuth = async (req, res)=>{
    try {
        const {token_id} = req.body;
        //Verifico la integridad del token recibido:
        const data = await verify_token_id(token_id).catch(console.error);
        //Busco los datos del usuario (En caso que no exista en la bd, creo el nuevo usuario):
        let user = (await handleUser(data));
        //Devuelvo como respuesta los datos del usuario.
        console.log(user);
        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

module.exports = postAuth;