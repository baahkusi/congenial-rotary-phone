const express = require('express');
const ctrl = require('../controllers/api');

const router = express.Router();

router.post('/getir', ctrl.getir);

module.exports = router;
