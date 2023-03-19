const express = require('express');
const { addAvailability, getAvailability, updateAvailability } = require('../controllers/availability');
const router = express.Router();
const CatchAsync = require('../utils/CatchAsync');


router.post('/availability/add', CatchAsync(addAvailability));
router.post('/availability/get', CatchAsync(getAvailability));
router.put('/availability/update', CatchAsync(updateAvailability));

module.exports = router;