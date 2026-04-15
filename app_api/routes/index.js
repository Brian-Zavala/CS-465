const express = require('express');
const router = express.Router();
const controller = require('../controllers/trips');

// Routes for trips
router
    .route('/trips')
    .get(controller.tripsList);

router
    .route('/trips/:tripCode')
    .get(controller.tripsFindByCode);

module.exports = router;
