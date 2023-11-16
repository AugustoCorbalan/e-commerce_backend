const User = require('../../../db/models/user.js');

const getShoppingCart = async (req, res)=>{
    try {
        const {data} = await User.findOne({
            where:{
                id: id,
            },
            attributes:{
                cart
            }
        })
        console.log(data);
        res.send("exito")
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}

module.exports = getShoppingCart;