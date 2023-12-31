const { Router } = require('express');
const getUsers = require('./controllers/userControllers/getUsers.js');
const getUser = require('./controllers/userControllers/getUser.js');
const postUser = require('./controllers/userControllers/postUser.js');
const putUser = require('./controllers/userControllers/putUser.js');

const router = Router();

router.get("/", async (req,res)=> await getUsers(req,res));
router.get("/:id", async (req,res)=> await getUser(req,res));

router.post("/", async (req,res)=> await postUser(req,res));

router.put("/:id", async (req, res)=> await putUser(req, res));
module.exports = router;