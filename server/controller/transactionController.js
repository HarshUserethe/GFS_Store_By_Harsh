// controllers/transactionController.js
const axios = require("axios");
const Order = require("../models/Order");

const UPIKEY = process.env.UPI_GATEWAY_KEY;

exports.saveTransactionToDatabase = async (req, res) => {
  const { client_txn_id, date, paymode, clerk_userid } = req.body;
 
   if (!client_txn_id || !date ) {
     return res.status(400).json({ success: false, message: "Missing required fields" });
   }
  
  try {
    // Check if transaction already exists in database
    const existingOrder = await Order.findOne({ client_txn_id });
    
    if (existingOrder) {
      return res.status(409).json({ 
        success: false, 
        message: "Transaction already exists",
        data: existingOrder 
      });
    }

    const response = await axios.post("https://merchant.upigateway.com/api/check_order_status", {
      key: process.env.UPI_GATEWAY_KEY,
      client_txn_id,
      txn_date: "20-05-2025", // Use the date parameter or fallback
    });

    const data = response.data;

    if (!data.status || !data.data) {
      return res.status(400).json({ success: false, message: "Transaction not found" });
    }

    const tx = data.data;

    const order = await Order.create({
      client_txn_id: tx.client_txn_id,
      customer_name: tx.customer_name,
      customer_email: tx.customer_email,
      customer_mobile: tx.customer_mobile,
      amount: tx.amount,
      p_info: tx.p_info,
      status: tx.status,
      remark: tx.remark,
      txnAt: tx.txnAt,
      redirect_url: tx.redirect_url,
      createdAt: tx.createdAt,
      clerk_userid: clerk_userid,
      merchant: {
        name: tx.Merchant?.name,
        upi_id: tx.Merchant?.upi_id,
      },
      payment_mode: paymode?.paymentMode || "Not Defined",
    });

    res.json({ success: true, data: order });
  } catch (err) {
    console.error("Transaction fetch failed:", err);
    
    // Handle MongoDB duplicate key error (if you have unique index on client_txn_id)
    if (err.code === 11000) {
      return res.status(409).json({ 
        success: false, 
        message: "Transaction ID already exists" 
      });
    }
    
    // Better error handling for API response errors
    if (err.response) {
      console.error("API Error Response:", err.response.data);
      return res.status(400).json({ 
        success: false, 
        message: "API Error: " + (err.response.data?.msg || err.response.data?.message || "Unknown API error")
      });
    }
    
    res.status(500).json({ success: false, message: "Server error" });
  }
};