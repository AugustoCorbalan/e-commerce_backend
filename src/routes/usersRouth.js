const { Router } = require('express');
const router = Router();

const getUsers = require('./controllers/userControllers/getUsers.js');
const getUser = require('./controllers/userControllers/getUser.js');
const getShoppingCart = require('./controllers/userControllers/getShoppingCart.js');
const postUser = require('./controllers/userControllers/postUser.js');

router.get("/", async (req,res)=> await getUsers(req,res));
router.get("/:id", async (req,res)=> await getUser(req,res));
router.get("/shoppingCart", async (req, res)=> await getShoppingCart(req, res));

router.post("/", async (req,res)=> await postUser(req,res));
module.exports = router;