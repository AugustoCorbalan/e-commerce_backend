const { Router } = require('express');
const router = Router();
const getCategories = require('./controllers/getCategories.js');
const postCategories = require('./controllers/postCategories.js');

router.get('/', async (req, res)=> await getCategories(req, res));
router.post('/', async (req, res)=> await postCategories(req, res));

module.exports = router;