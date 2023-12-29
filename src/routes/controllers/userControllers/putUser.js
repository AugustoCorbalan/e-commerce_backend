const User = require('../../../db/models/user.js');
const putUser = (req, res)=>{
    const { id } = req.params;
    const data = req.body;
    try {
        User.update(data,{
            where: {
                userId: id
            }
        })
        res.send("Actualizado correctamente");
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = putUser;