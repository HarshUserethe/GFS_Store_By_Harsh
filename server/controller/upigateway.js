const axios = require("axios");
const shortid = require("shortid");
require("dotenv").config();

const UPI_GATEWAY_URL = "https://api.ekqr.in/api/create_order";
const KEY = process.env.UPI_GATEWAY_KEY;

exports.createOrderUPI = async (req, res) => {
  // Log the incoming request body
  console.log("Received request body:", req.body);

  const { amount, productName, fullName, email, mobile, redirect_url, clerk_userid } = req.body;

  // Validate required fields
  if (!amount || !productName || !fullName || !email || !mobile || !redirect_url) {
    console.error("Missing required fields");
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const txnId = `${Date.now()}${Math.floor(100 + Math.random() * 900)}`;

    const formData = {
      key: KEY,
      client_txn_id: txnId,
      amount: amount, // Ensure amount is a number
      p_info: productName,
      customer_name: fullName,
      customer_email: email,
      customer_mobile: mobile,
      redirect_url: redirect_url,
      clerk_user: clerk_userid, // Replace with actual values if needed
      udf2: "udf2_value",
      udf3: "udf3_value",
    };

    console.log("Sending data to UPI gateway:", formData);

    const response = await axios.post(UPI_GATEWAY_URL, formData);

    if (response.data && response.data.data && response.data.data.payment_url) {
      res.status(200).json({
        success: true,
        txnId,
        payment_url: response.data.data.payment_url,
      });
    } else {
      console.error("Unexpected response from UPI gateway:", response.data);
      res.status(400).json({ success: false, message: "Payment URL not received" });
    }
  } catch (error) {
    console.error("UPI order creation error:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      message: "Gateway error",
      details: error.response?.data || error.message,
    });
  }
};
