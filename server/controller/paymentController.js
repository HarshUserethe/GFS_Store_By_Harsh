// server/controllers/paymentController.js
const Razorpay = require('razorpay');
const shortid = require('shortid');
const Payment = require('../models/PaymentModel');
require('dotenv').config();

// Initialize Razorpay client
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

exports.createOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR' } = req.body;

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt: shortid.generate(),
      payment_capture: 1
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      id: order.id,
      currency: order.currency,
      amount: order.amount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      productName,
      productPrice,
      user // This should come from authenticated user
    } = req.body;

    // Verify payment signature
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ error: 'Payment verification failed' });
    }

    // Save payment history
    const paymentHistory = new Payment({
      user: user._id,
      fullName: user.fullName,
      email: user.email,
      location: user.location || '',
      productName,
      productPrice,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      paymentStatus: 'success'
    });

    await paymentHistory.save();

    res.status(200).json({
      message: 'Payment successful',
      paymentId: razorpay_payment_id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};