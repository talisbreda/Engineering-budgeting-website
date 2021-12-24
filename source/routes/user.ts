import express from 'express';
import controller from '../controllers/user';
import extractJWT from '../middleware/extractJWT';

http: const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res, next) => {});

router.get('/validate', extractJWT, controller.validateToken);
router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/get/all', controller.getAllUsers);
router.post('/get/projects', controller.getAllProjects);
router.post('/get/project', controller.getProject);
router.delete('/delete/user', controller.deleteUser);
router.put('/update/user', controller.updateUser);
router.post('/create/project', controller.createProject);
router.delete('/delete/project', controller.deleteProject);
router.put('/update/project', controller.updateProject);

export = router;
