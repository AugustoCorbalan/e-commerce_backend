const { Router } = require('express');
const { createOrder, succesOrder, receiveWebhook } = require("./controllers/paymentControllers/payment.controllers.js");
const router = Router();

router.post('/create-order', (req,res)=>{createOrder(req, res)});

router.get('/success', (req,res)=>{res.send('success')});
router.get('/failure', (req,res)=>{res.send('failure')});
router.get('/pending', (req,res)=>{res.send('pending')});

router.post('/webhook', (req,res)=>{receiveWebhook(req, res)});

module.exports = router;