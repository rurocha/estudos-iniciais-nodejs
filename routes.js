const express = require('express');
const router = express.Router();

const homeController = require('./controllers/homeController');
const notFoundController = require('./controllers/notFoundController');

router.get('/', homeController.index);
// router('*', notFoundController.index);



module.exports = router;