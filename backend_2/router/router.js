const Router = require('express').Router;
const router= new Router();
const userController = require('../controllers/user-controller');


router.post('/registrtion',userController.registration)
router.post('/login', userController.loin)
router.post('/logout', userController.logout)
router.get('/activate/:link',userController.activate);
router.get('/refresh', userController.refresh)
router.get('/users',userController.getUsers)

module.exports = router

