const axios = require("axios");
const Order = require("../models/Order");
require("dotenv").config();

/**
 * Get PayPal Access Token
 */
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

/**
 * Get INR → USD Conversion Rate
 */
const getINRtoUSDRate = async () => {
  try {
    const response = await axios.get("https://open.er-api.com/v6/latest/INR");
    if (
      response.data &&
      response.data.result === "success" &&
      response.data.rates &&
      response.data.rates.USD
    ) {
      return response.data.rates.USD;
    } else {
      console.error("Unexpected INR to USD response:", response.data);
      return 0.012; // fallback static rate
    }
  } catch (error) {
    console.error("Failed to fetch INR to USD rate:", error.message);
    return 0.012; // fallback static rate
  }
};

/**
 * Get Client Country Code via IP
 */
const getCountryByIP = async (req) => {
  try {
    let clientIp =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket?.remoteAddress ||
      req.connection?.remoteAddress;

    // Remove "::ffff:" for IPv4-mapped addresses
    if (clientIp?.startsWith("::ffff:")) {
      clientIp = clientIp.split(":").pop();
    }

    // If localhost, fallback to India (for local testing)
    if (
      clientIp === "127.0.0.1" ||
      clientIp === "::1" ||
      clientIp.startsWith("192.168") ||
      clientIp.startsWith("10.")
    ) {
      return "IN";
    }

    const res = await axios.get(`https://ipapi.co/${clientIp}/json/`);
    return res.data.country_code || "US";
  } catch (error) {
    console.error("IP lookup failed:", error.message);
    return "US"; // fallback to USD for safety
  }
};


/**
 * Create PayPal Payment
 */
const createPayPalPayment = async (req, res) => {
  const {
    amount,
    productName,
    user: { _id, fullName, email, mobile },
  } = req.body;

  try {
    // Detect client country from IP
    const countryCode = await getCountryByIP(req);

    // Always send USD to PayPal API
    const inrToUsdRate = await getINRtoUSDRate();
    let finalAmount;

    if (countryCode === "IN") {
      // Indian customer → convert INR to USD
      finalAmount = (Number(amount) * inrToUsdRate).toFixed(2);
    } else {
      // Outside India → assume amount is already in USD
      finalAmount = Number(amount).toFixed(2);
    }

    const accessToken = await getAccessToken();

    const response = await axios.post(
      `${process.env.PAYPAL_BASEURL}/v2/checkout/orders`,
      {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD", // ✅ Always USD
              value: finalAmount,
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


/**
 * Capture PayPal Payment
 */
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

    // Save order in DB
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
