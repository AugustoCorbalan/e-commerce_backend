const Cart = require('../../../db/models/cart');
const User = require('../../../db/models/user');
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
        if(!cart){
            //Entonces creo un nuevo carrito
            const newCart = await Cart.create({products: data});
            //Busco el usuario a quien pertenece el carrito.
            const user = await User.findOne({ where:{ userId: id_user }})
            // Relaciono su respectivo usuario con el carrito creado
            await newCart.setUser(user);
        }else if (cart.dataValues.products.length >= 0){
            const {dataValues} = cart;
            // Entonces actualizo el carrito existente.
            // Verifico si ya existe el producto en el carrito.
            let exist = false;
            let newProducts = [];
            newProducts = dataValues.products.map((product)=>{
                console.log(product);
                if(product.productId == data[0].productId){
                    //Entonces sumo la cantidad de unidades nuevas a las existentes.
                    exist = true;
                    const newQuantity = product.quantity + data[0].quantity
                    return {...product, quantity: newQuantity};
                }
                return product
            })
            if(!exist){ newProducts = dataValues.products.concat(data) };
            await cart.update({products: newProducts});
        }    
        res.send("Carrito actualizado");
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = putCart;