const {Router} = require('express');
const postAuth = require('./controllers/authControllers/postAuth.js');
const router = Router();

router.post('/', (req, res)=> postAuth(req, res));

module.exports = router;