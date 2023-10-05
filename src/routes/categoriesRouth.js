const { Router } = require('express');
const router = Router();
const getCategories = require('./controllers/getCategories.js');

router.get('/', async (req, res)=> await getCategories(req, res));

module.exports = router;