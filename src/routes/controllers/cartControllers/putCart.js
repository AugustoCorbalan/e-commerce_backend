const Cart = require('../../../db/models/cart');
const putCart = async (req, res)=>{
    try {
        const { id_user } = req.params;
        const data = req.body;
        //Busco el carrito que corresponde al usuario. En caso de que no exista ningún carrito, creo uno.
        const cart = await Cart.findOne({
            where:{
                userId : id_user
            }
        });
        const {dataValues} = cart;
        if(dataValues.products.length == 0){
            //Entonces creo un nuevo carrito
            await Cart.create({products: data});
        }else if (dataValues.products.length > 0){
            // Entonces actualizo el carrito existente
            const newProducts = dataValues.products.concat(data);
            await cart.update({products: newProducts});
        }
        res.send("Carrito actualizado");
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = putCart;