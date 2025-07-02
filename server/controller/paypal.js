const axios = require("axios");
const Order = require("../models/Order");
require("dotenv").config();

// Access token generator
const getAccessToken = async () => {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENTID}:${process.env.PAYPAL_SECRET}`
  ).toString("base64");

  const response = await axios.post(
    `${process.env.PAYPAL_BASEURL}/v1/oauth2/token`,
    new URLSearchParams({ grant_type: "client_credentials" }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${auth}`,
      },
    }
  );

  return response.data.access_token;
};

const getINRtoUSDRate = async () => {
  try {
    const res = await axios.get("https://api.exchangerate.host/convert", {
      params: {
        from: "INR",
        to: "USD",
      },
    });
    return res.data.result || 0.012; // fallback to static if failed
  } catch (error) {
    console.error("Exchange rate fetch failed:", error.message);
    return 0.012; // fallback rate
  }
};

// Create PayPal Order
const createPayPalPayment = async (req, res) => {
  const {
    amount,
    productName,
    receiverEmail, // Not used here but kept for structure
    user: { _id, fullName, email, location, mobile },
  } = req.body;

  try {
    const accessToken = await getAccessToken();
        const inrToUsdRate = await getINRtoUSDRate();

    const usdAmount = (parseFloat(amount) * inrToUsdRate).toFixed(2);

    const response = await axios.post(
      `${process.env.PAYPAL_BASEURL}/v2/checkout/orders`,
      {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: usdAmount
            },
            description: productName,
          },
        ],
        application_context: {
          brand_name: "Gosu Family Store",
          landing_page: "NO_PREFERENCE",
          user_action: "PAY_NOW",
          return_url: `${
            process.env.CLIENT_BASEURL
          }/api/paypal/capture?clerk_userid=${_id}&redirect_url=${
            process.env.CLIENT_BASEURL
          }/status/${_id}&productName=${encodeURIComponent(
            productName
          )}&customer_name=${encodeURIComponent(
            fullName
          )}&customer_email=${email}&customer_mobile=${mobile}&amount=${amount}`,
          cancel_url: `${process.env.CLIENT_BASEURL}/`,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const approvalLink = response.data.links.find(
      (link) => link.rel === "approve"
    )?.href;
    res.status(200).json({ approvalLink });
  } catch (error) {
    console.error("Create PayPal Payment Error:", {
      message: error.message,
      response: error?.response?.data,
      status: error?.response?.status,
    });

    res.status(500).json({
      error: "Failed to create PayPal payment.",
      debug: error?.response?.data || error.message,
    });
  }
};

// Capture PayPal Payment
const capturePayPalPayment = async (req, res) => {
  const {
    token,
    clerk_userid,
    redirect_url,
    productName,
    customer_name,
    customer_email,
    customer_mobile,
    amount,
  } = req.query;

  try {
    const accessToken = await getAccessToken();

    const captureRes = await axios.post(
      `${process.env.PAYPAL_BASEURL}/v2/checkout/orders/${token}/capture`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const captureDetails = captureRes.data;

    if (captureDetails.status === "COMPLETED") {
      await Order.create({
        client_txn_id: captureDetails.id,
        customer_name,
        customer_email,
        customer_mobile,
        amount,
        p_info: productName,
        status: "success",
        remark: "PayPal payment successful",
        txnAt: new Date().toISOString(),
        redirect_url,
        createdAt: new Date(),
        clerk_userid,
        merchant: {
          name: "PayPal User",
          upi_id: "paypal",
        },
        payment_mode: "PayPal",
      });
    }

    return res.redirect(redirect_url);
  } catch (error) {
    console.error(
      "Capture PayPal Payment Error:",
      error?.response?.data || error.message
    );
    return res.redirect("/");
  }
};

module.exports = {
  createPayPalPayment,
  capturePayPalPayment,
};
