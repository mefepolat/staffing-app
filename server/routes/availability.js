const express = require('express');
const { addAvailability } = require('../controllers/availability');
const router = express.Router();
const CatchAsync = require('../utils/CatchAsync');


router.post('/availability/add', CatchAsync(addAvailability));

module.exports = router;