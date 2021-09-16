const express = require('express');
const usersController = require('../controllers/userController');
const validateTokenMid = require('../middlewares/validateTokenMid');

const router = express.Router();

router.post('/users', usersController.userCreate);
router.post('/users/admin', validateTokenMid, usersController.adminCreate);

module.exports = router;