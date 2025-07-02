// controllers/savePaypalTransaction.js

const Order = require("../models/Order");

const savePayPalTransactionToDatabase = async (req, res) => {
  const {
    userId,
    payment_mode,
    status,
    client_txn_id,
    txnAt,
    createdAt,
    amount,
    email,
    name,
    productName,
    mobile,
  } = req.body;

  if (!client_txn_id || !userId || !status || !amount) {
    return res.status(400).json({
      success: false,
      message: "Missing required transaction fields",
    });
  }

  try {
    const existingOrder = await Order.findOne({ client_txn_id });

    if (existingOrder) {
      return res.status(409).json({
        success: false,
        message: "Transaction already exists",
        data: existingOrder,
      });
    }

    const newOrder = await Order.create({
      client_txn_id,
      customer_name: name,
      customer_email: email,
      customer_mobile: mobile, // or provide if available
      amount,
      p_info: productName,
      status,
      remark: "PayPal Transaction",
      txnAt,
      redirect_url: "NA",
      createdAt,
      clerk_userid: userId,
      merchant: {
        name: "Gosu Family Store",
        upi_id: "merchant@upi",
      },
      payment_mode: payment_mode || "PayPal",
    });

    console.log(newOrder)

    res.status(201).json({
      success: true,
      message: "Transaction saved successfully",
      data: newOrder,
    });
  } catch (err) {
    console.error("Error saving PayPal transaction:", err);

    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Transaction ID already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = savePayPalTransactionToDatabase;
