const express = require('express');
const router = express.Router();

const imageMiddleware = require('./middlewares/imageMiddleware');
const userMiddleware = require('./middlewares/userMiddleware');

const homeController = require('./controllers/homeController');
const postController = require('./controllers/postController');
const userController = require('./controllers/userController');

router.get('/', homeController.index);

router.get('/users/login', userController.login);
router.post('/users/login', userController.loginAction);
router.get('/users/register', userController.register);
router.post('/users/register', userController.registerAction);
router.get('/users/logout', userController.logout);

router.get('/post/add', userMiddleware.isLogged, postController.add);
router.post('/post/add',
    userMiddleware.isLogged,
    imageMiddleware.upload, 
    imageMiddleware.resize,
    postController.addAction
);
router.get('/post/:slug', userMiddleware.isLogged, postController.view);
router.get('/post/:slug/edit', userMiddleware.isLogged, postController.edit);
router.post('/post/:slug/edit', 
    userMiddleware.isLogged,
    imageMiddleware.upload, 
    imageMiddleware.resize,
    postController.editAction
);




module.exports = router;