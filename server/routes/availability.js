const express = require('express');
const { addAvailability, getAvailability } = require('../controllers/availability');
const router = express.Router();
const CatchAsync = require('../utils/CatchAsync');


router.post('/availability/add', CatchAsync(addAvailability));
router.post('/availability/get', CatchAsync(getAvailability));

module.exports = router;