const mercadopago = require("mercadopago");

const receiveWebhook = async (req, res)=>{
    const payment = req.query;
    try {
        if( payment.type == 'payment'){
            const data = await mercadopago.payment.findById(payment["data.id"])
            console.log(data)
        }
        res.status(204);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

module.exports = receiveWebhook;