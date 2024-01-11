const { Router } = require('express');
const router = Router();
const getProducts = require("./controllers/productsControllers/getProducts.js");
const getProductById = require("./controllers/productsControllers/getProductById.js");
const postProducts = require("./controllers/productsControllers/postProducts.js");

router.get("/", async (req, res)=> await getProducts(req, res));
router.get("/productById/:productId", async (req, res)=> await getProductById(req, res));
router.post("/", async (req, res)=> await postProducts(req, res));

module.exports = router;