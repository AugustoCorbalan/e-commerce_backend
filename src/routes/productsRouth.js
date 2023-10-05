const { Router } = require('express');
const router = Router();
const getProducts = require("./controllers/getProducts.js");
const postProducts = require("./controllers/postProducts.js");

router.get("/", async (req, res)=> await getProducts(req, res));
router.post("/", async (req, res)=> await postProducts(req, res));

module.exports = router;