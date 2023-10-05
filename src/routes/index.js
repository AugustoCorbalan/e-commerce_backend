const { Router } = require('express');
const productsRouth = require('./productsRouth.js')
const categoriesRouth = require('./categoriesRouth.js')
const router = Router();

router.use('/products', productsRouth);
router.use('/categories', categoriesRouth);

module.exports = router;