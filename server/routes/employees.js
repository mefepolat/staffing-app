const express = require('express');
const { getEmployees } = require('../controllers/employees');
const router = express.Router();
const CatchAsync = require('../utils/CatchAsync');

router.get('/employees/get', CatchAsync(getEmployees))

module.exports = router;