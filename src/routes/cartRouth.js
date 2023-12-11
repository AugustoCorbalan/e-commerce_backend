const { Router } = require('express');
const getCart = require('./controllers/cartControllers/getCart.js');
const postCart = require('./controllers/cartControllers/postCart.js');
const putCart_add = require('./controllers/cartControllers/putCart_add.js');
const putCart_updateAll = require('./controllers/cartControllers/putCart_updateAll.js');
const router = Router();

router.get("/:id_user", (req, res)=> getCart(req, res));
router.post("/:id_user", (req, res)=> postCart(req, res));
router.put("/:id_user", (req, res)=> putCart_add(req, res));
router.put("/all/:id_user", (req, res)=> putCart_updateAll(req, res));

module.exports = router;