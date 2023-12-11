const Cart = require("../../../db/models/cart.js");
const deleteCart_all = async (req, res)=>{
    try {
        const {id_user} = req.params;
        const response = await Cart.destroy({where:{userId: id_user}});
        console.log("response", response)
        res.status(200).send("Se borró el carrito")
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message);
    }
}

module.exports = deleteCart_all;