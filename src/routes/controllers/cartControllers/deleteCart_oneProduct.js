const Cart = require("../../../db/models/cart.js");
const deleteCart_oneProduct = async (req, res)=>{
    try {
        const {id_user} = req.params;
        const {id_product} = req.body;
        const cart = await Cart.findOne({where:{userId: id_user}});
        let {products} = cart.dataValues;
        products = products.filter((el)=>{
            return( !(el.productId == id_product) );
        });
        await cart.update({products: products});
        res.status(200).send("Producto elminado");
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = deleteCart_oneProduct;