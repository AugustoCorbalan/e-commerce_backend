const { Router } = require('express');
const productsRouth = require('./productsRouth.js');
const categoriesRouth = require('./categoriesRouth.js');
const mercadoPagoRouth = require('./mercadoPagoRouth.js');
const userRouth = require('./usersRouth.js');
const cartRouth = require('./cartRouth.js');
const authRouth = require('./authRouth.js');
const router = Router();

router.use('/user', userRouth);
router.use('/cart', cartRouth);
router.use('/products', productsRouth);
router.use('/categories', categoriesRouth);
router.use('/mercadopago', mercadoPagoRouth);
router.use('/auth', authRouth);

module.exports = router;