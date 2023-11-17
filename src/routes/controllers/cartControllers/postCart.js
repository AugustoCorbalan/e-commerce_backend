const Cart = require('../../../db/models/cart.js');
const User = require('../../../db/models/user.js');

const postCart = async (req, res)=>{
    try {
        const { id_user } = req.params;
        const data = req.body;
        //Creo el carrito de compras
        const newCart = await Cart.create(data);
        //Busco el usuario a quien pertenece el carrito.
        const user = await User.findOne({ where:{ userId: id_user }})
        //Relaciono su respectivo usuario con el carrito creado
        await newCart.setUser(user);
        res.status(202).send("Carrito cargado")
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
};

module.exports = postCart;