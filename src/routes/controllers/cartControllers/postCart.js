const Cart = require('../../../db/models/cart.js');
const User = require('../../../db/models/user.js');

const postCart = async (req, res)=>{
    try {
        const { id_user } = req.params;
        const data = req.body;
        //Valido los datos que llegaron por body
        const validationData = (data)=>{
            let approved = true;
            req.body.map((el)=>{
                //Verifico que cada producto tenga unicamente 2 propiedades (productId y quantity)
                const productKeys = Object.keys(el);
                if(approved){
                    if( productKeys.length != 2){
                        approved = false;
                        return;
                    }
                    if(!(productKeys[0] == "productId" && productKeys[1] == "quantity")){
                        approved = false;
                        return;
                    }
                    if(!(typeof el.productId == 'string' && Number.isInteger(el.quantity))){
                        approved = false;
                        return;
                    }
                };
            })
            return approved;
        }
        if(validationData()){
            //Creo el carrito de compras
            const newCart = await Cart.create({products: data});
            //Busco el usuario a quien pertenece el carrito.
            const user = await User.findOne({ where:{ userId: id_user }})
            // Relaciono su respectivo usuario con el carrito creado
            await newCart.setUser(user);
            res.status(202).send("Carrito cargado")
        }
        else{
            new Error("Error en los datos recibidos");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
};

module.exports = postCart;