const Cart = require('../../../db/models/cart.js');
const putCart_updateAll = async (req, res)=>{
    try {
        const {id_user} = req.params;
        const data = req.body;
        //Busco el carrito que corresponde al usuario. En caso de que no exista ningún carrito, creo uno.
        const searchCart = async ()=>{
            const cart = await Cart.findOne({
                where:{
                    userId : id_user
                }
            });
            if(cart){
                return cart;
            }else{
                return new Error("Error! Carrito no encontrado en la base de datos.");
            }
        }
        const cart = await searchCart();
        //Actualizo el carrito.
        cart.update({products: data});
        res.send("Carrito actualizado");
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = putCart_updateAll;