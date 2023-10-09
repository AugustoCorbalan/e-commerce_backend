const express = require('express');
const router = require('./routes/index');
const cors = require('cors');
const app = express();

const corsOptions={
    origin: 'http://localhost:3000',
    methods: 'GET, PUT, DELETE, POST',
    credentials: true
}

app.use(cors(corsOptions));

app.use(express.json());

app.use(router);

module.exports = app;

