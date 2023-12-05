const { Router } = require('express');
const getCart = require('./controllers/cartControllers/getCart.js');
const postCart = require('./controllers/cartControllers/postCart.js');
const putCart = require('./controllers/cartControllers/putCart.js');
const router = Router();

router.get("/:id_user", (req, res)=> getCart(req, res));
router.post("/:id_user", (req, res)=> postCart(req, res));
router.put("/:id_user", (req, res)=> putCart(req, res));

module.exports = router;