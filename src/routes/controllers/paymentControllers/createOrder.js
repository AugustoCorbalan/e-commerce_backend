const mercadopago = require('mercadopago');
const { Op } = require('sequelize');
const Product = require('../../../db/models/product.js');
const {config} = require('dotenv');
config();
const createOrder = async(req,res)=>{
    try {
       //Agrego credenciales
       mercadopago.configure({
       access_token: process.env.MP_ACCESSTOKEN //Token de Cuenta de prueba (Vendedor)
       })
   
        // Ahora configuro las características del producto (prferencias)
        const  productsQuery = req.body.products; // Recibo un arreglo con todos los productos a comprar y la cantidad de cada uno.
        // Creo un array con los IDs para luego pasarlo como condición en la consulta.
        const productsIDs = productsQuery.map((product)=> product.id);
        // Creo un "diccionario" que relaciona ID con cantidad 
        let ID_quantity = {}; 
        productsQuery.map((product)=> ID_quantity[product.id] = product.quantity);
        // Busco los productos en la base de datos
        const productsDB = await Product.findAll({
            where:{
                id: {
                    [Op.or] : productsIDs
                }
            }
        });
    
        const items = productsDB.length? productsDB.map((el)=>{
            const {id, name, price} = el.dataValues;
            return {
                id: id,
                title: name,
                unit_price: Number.parseFloat(price),
                currency_id: "ARS",
                quantity: ID_quantity[id] 
            }
        }) : [];
        const result = await mercadopago.preferences.create({
            items: items,
            back_urls:{
                success: process.env.MP_SUCCESS_URL,
                failure: process.env.MP_FAILURE_URL,
                pending: process.env.MP_PENDING_URL
            },
            notification_url: process.env.MP_NOTIFICATION_URL
        })
        res.send(result);
   } catch (error) {
        console.error(error);
        res.send(error);
   }

}
module.exports = createOrder;
