const express = require('express');
const { getEmployees, updateEmployee } = require('../controllers/employees');
const router = express.Router();
const CatchAsync = require('../utils/CatchAsync');

router.get('/employees/get', CatchAsync(getEmployees))
router.put('/employees/update', CatchAsync(updateEmployee));

module.exports = router;