const express = require('express');
const { handler } = require('../Controllers/PaymentController');

// Rest of your code...

const router = express.Router()

router.post('/checkout', handler)

module.exports = router;