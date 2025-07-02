  const mongoose = require("mongoose");

  const orderSchema = new mongoose.Schema({
    client_txn_id: { type: String, required: true },
    customer_name: String,
    customer_email: String,
    customer_mobile: String,
    amount: Number,
    p_info: String,
    status: String,
    remark: String,
    txnAt: String,
    redirect_url: String,
    createdAt: Date,
    clerk_userid:String,
    merchant: {
      name: String,
      upi_id: String
    },
    payment_mode: String,
  }, { timestamps: true });

  module.exports = mongoose.model("Order", orderSchema);
