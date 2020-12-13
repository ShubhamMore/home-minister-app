const express = require('express');

const auth = require('../middleware/auth');

const generateOrder = require('../controller/order-controller/generateOrder');
const deleteOrder = require('../controller/order-controller/deleteOrder');

const router = new express.Router();

router.post('/generateOrder', auth, async (req, res) => {
  await generateOrder(req, res);
});

router.post('/deleteOrder', auth, async (req, res) => {
  await deleteOrder(req, res);
});

module.exports = router;
