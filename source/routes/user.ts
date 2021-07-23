import express from 'express';
import controller from '../controllers/user';
import extractJWT from '../middleware/extractJWT';

http: const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res, next) => {
    // try {
    //     const { data } = await axios('http://127.0.0.1:1337/source/front/login.html');
    // } catch (error) {
    //     console.error(error);
    // }
    //console.log(data);
});
router.post('/create/user', controller.createUser);
router.get('/get/users', controller.getUsers);

router.get('/validate', extractJWT, controller.validateToken);
router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/get/all', controller.getAllUsers);

export = router;
