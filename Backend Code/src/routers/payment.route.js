const express = require('express');

const auth = require('../middleware/auth');

const verifyPayment = require('../controller/payment-controller/verifyPayment');
const router = new express.Router();

router.post('/verifyPayment', auth, async (req, res) => {
  await verifyPayment(req, res);
});

module.exports = router;
