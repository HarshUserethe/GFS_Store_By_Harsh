const axios = require("axios");

const CHECK_ORDER_STATUS_URL = "https://api.ekqr.in/api/check_order_status";
const KEY = process.env.UPI_GATEWAY_KEY;

// Helper function to format date as DD-MM-YYYY
const formatTodayDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};

exports.checkOrderStatusAndSave = async (req, res) => {
  const { client_txn_id, txn_date } = req.body;

  if (!client_txn_id) {
    return res.status(400).json({
      success: false,
      message: "Missing client_txn_id",
    });
  }

  const formattedTxnDate = txn_date || formatTodayDate();

  try {
    const requestPayload = {
      key: KEY,
      client_txn_id,
      txn_date: formattedTxnDate
    };
    
    console.log("Checking order status:", client_txn_id);

    const response = await axios.post(CHECK_ORDER_STATUS_URL, requestPayload, {
      headers: { 'Content-Type': 'application/json' }
    });
    
    const result = response.data;
    console.log("API Response:", result.status ? "Success" : "Failed");

    if (result.status && result.data) {
      const orderData = result.data;
      
      // Log transaction status
      if (orderData.status === "success") {
        console.log(`Payment successful for order: ${client_txn_id}`);
      } else if (orderData.status === "failure") {
        console.log(`Payment failed for order: ${client_txn_id}, reason: ${orderData.remark}`);
      }
      
      // TODO: Implement database save logic here
      // const savedOrder = await saveOrderToDatabase(orderData);
      
      return res.status(200).json({
        success: result.status,
        message: result.msg,
        data: orderData
      });
    } else {
      // Transaction not found
      console.log(`Transaction not found: ${client_txn_id}`);
      
      return res.status(200).json({
        success: false,
        message: result.msg || "Transaction not found",
        data: result
      });
    }
  } catch (error) {
    console.error("Order status check error:", error.message);
    
    // Handle different error types
    if (error.response) {
      return res.status(error.response.status).json({
        success: false,
        message: "Error checking transaction status",
        error: error.response.data
      });
    }
    
    if (error.request) {
      return res.status(502).json({
        success: false,
        message: "Payment gateway timeout",
        error: "No response from gateway"
      });
    }
    
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};