const mercadopago = require('mercadopago');
const createOrder = async(req,res)=>{
    try {
       //Agrego credenciales
       mercadopago.configure({
       access_token: 'TEST-7361752998185703-110316-79268be81f0e78946180a19709bacfd9-1535520144' //Token de Cuenta de prueba (Vendedor)
       })
   
      //Ahora configuro las características del producto (prferencias)
       const result = await mercadopago.preferences.create({
            items:[
                {
                    title: "Heladera",
                    unit_price: 50000,
                    currency_id: "ARS",
                    quantity: 1
                }
            ],
            back_urls:{
                success: "http://localhost:3002/payment_success",
                failure: "http://localhost:3002/payment_failure",
                pending: "http://localhost:3002/payment_pending"
            }
       })
       res.send(result);
   } catch (error) {
        console.error(error);
        res.send(error);
   }

}
module.exports = {
    createOrder
}