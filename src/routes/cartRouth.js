const { Router } = require('express');
const getCart = require('./controllers/cartControllers/getCart.js');
const postCart = require('./controllers/cartControllers/postCart.js');
const putCart_add = require('./controllers/cartControllers/putCart_add.js');
const putCart_updateAll = require('./controllers/cartControllers/putCart_updateAll.js');
const deleteCart_oneProduct = require('./controllers/cartControllers/deleteCart_oneProduct.js');
const deleteCart_all = require('./controllers/cartControllers/deleteCart_all.js');
const router = Router();

router.get("/:id_user", (req, res)=> getCart(req, res));
router.post("/:id_user", (req, res)=> postCart(req, res));
router.put("/:id_user", (req, res)=> putCart_add(req, res));
router.put("/all/:id_user", (req, res)=> putCart_updateAll(req, res));
router.put("/deleteProduct/:id_user", (req, res)=> deleteCart_oneProduct(req, res));
router.delete("/:id_user", (req, res)=>deleteCart_all(req, res));
module.exports = router;