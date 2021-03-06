const Order = require('../../models/order.model');
const PaymentReceipt = require('../../models/payment-receipt.model');

const crypto = require('crypto');

const verifyPayment = async (req, res) => {
  try {
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);

    const payment = req.body.payment;
    const paymentReceipt = req.body.receipt;

    hmac.update(payment.razorpay_order_id + '|' + payment.razorpay_payment_id);
    let generatedSignature = hmac.digest('hex');

    if (generatedSignature == payment.razorpay_signature) {
      await PaymentReceipt.findByIdAndUpdate(paymentReceipt._id, { status: true });

      const order = await Order.findById(paymentReceipt.orderId);
      order.amount_paid = order.amount;
      order.amount_due = '0';
      await order.save();

      res.status(200).send({ orderId: paymentReceipt.orderId, receiptId: paymentReceipt._id });
    } else {
      throw new Error('Payment Verification Failed');
    }
  } catch (e) {
    console.log(e);
    res.status(400).send(e + '');
  }
};

module.exports = verifyPayment;
