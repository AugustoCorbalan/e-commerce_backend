const Cart = require('../../../db/models/cart.js');

const getCart = async (req, res)=>{
    const {id_user} = req.params;
    try {
        const data = await Cart.findOne({
            where:{
                userId: id_user
            }
        })
        console.log(data);
        res.send(data)
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}

module.exports = getCart;