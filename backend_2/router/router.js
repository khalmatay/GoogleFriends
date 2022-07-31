const Router = require('express').Router;

const router= new Router();
const userController = require('../controllers/user-controller');

const {body} = require('express-validator');

const authMiddleware = require('../middleware/auth-middleware');

router.post('/registration',
    body('name').isLength({min: 3, max: 32}),
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration);
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link',userController.activate);
router.get('/refresh', userController.refresh)
router.put('/status', authMiddleware,userController.getStatus)
router.get('/users', authMiddleware, userController.getUsers)
router.get('/friends', authMiddleware, userController.getFriends)

module.exports = router

