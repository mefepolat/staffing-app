const express = require('express');
const router = express.Router();
const {registerUser, login, logout} = require('../controllers/user');
const CatchAsync = require('../utils/CatchAsync');


router.post('/register', CatchAsync(registerUser));
router.post('/login', login);
router.post('/logout', logout);


module.exports = router;
