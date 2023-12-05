const Cart = require('../../../db/models/cart.js');
const Product = require('../../../db/models/product.js');

const getCart = async (req, res)=>{
    const {id_user} = req.params;
    console.log("id_user", id_user);
    try {
        const cart = await Cart.findOne({
            where:{
                userId: id_user
            }
        })
        console.log(cart)
        //Una vez que tenemos el carro de compras con el id de cada producto, busco los datos de este producto.
        if(cart){
            const response = await Promise.all(cart.products.map(async (product)=>{
                const dataProduct = await Product.findOne({where: {productId: product.productId}});
                return({
                    product: dataProduct.dataValues,
                    quantity_buy: product.quantity
                })
            }));
            res.send(response);
        } else{
            res.send([]);
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}

module.exports = getCart;