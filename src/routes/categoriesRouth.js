const { Router } = require('express');
const router = Router();
const getCategories = require('./controllers/categoriesControllers/getCategories.js');
const postCategories = require('./controllers/categoriesControllers/postCategories.js');

router.get('/', async (req, res)=> await getCategories(req, res));
router.post('/', async (req, res)=> await postCategories(req, res));

module.exports = router;