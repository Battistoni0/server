const express = require('express');
const router = express.Router();

const uploadalloRoutes = require('./uploadallo');

router.use('/uploadallo', uploadalloRoutes);

module.exports = router;
