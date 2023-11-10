const mercadopago = require('mercadopago');
const {config} = require('dotenv');
config();
const createOrder = async(req,res)=>{
    try {
       //Agrego credenciales
       mercadopago.configure({
       access_token: process.env.MP_ACCESSTOKEN //Token de Cuenta de prueba (Vendedor)
       })
   
      //Ahora configuro las características del producto (prferencias)
       const result = await mercadopago.preferences.create({
            items:[
                {
                    id:"heladera_001",
                    title: "Heladera",
                    unit_price: 50000,
                    currency_id: "ARS",
                    quantity: 1
                }
            ],
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
