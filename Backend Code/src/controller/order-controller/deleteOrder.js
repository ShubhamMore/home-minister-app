const Order = require('../../models/order.model');
const PaymentReceipt = require('../../models/payment-receipt.model');
const errorHandler = require('../../handler/error.handler');

const deleteOrder = async (req, res) => {
  try {
    const paymentReceipt = await PaymentReceipt.findByIdAndDelete(req.body.id);

    if (!paymentReceipt) {
      throw new Error('Payment Receipt Not Found');
    }

    await Order.findByIdAndDelete(paymentReceipt.orderId);

    res.status(200).send({ success: true });
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = deleteOrder;
