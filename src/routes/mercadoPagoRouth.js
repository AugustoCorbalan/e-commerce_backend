const { Router } = require('express');
const { createOrder } = require("./controllers/payment.controller.js");
const router = Router();

router.post('/create-order', (req,res)=>{createOrder(req, res)});
router.use('/success', (req,res)=>{res.send('success')});
router.use('/webhook', (req,res)=>{res.send('webhook')});

module.exports = router;