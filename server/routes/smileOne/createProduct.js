

const generateSign = require("../../config/generateSign");
const axios = require("axios");

const SMILE_API_URL = "https://www.smile.one/br/smilecoin/api/createorder";
const UID = "1298094";
const EMAIL = "sharman2727@gmail.com";
const M_KEY = "ce6984d693f78ead32aa3509be845e89";

const getProductList = async (req, res) => {
  const {
    gameName,
    email,
    productId,
    zoneId,
    userId,
    customerName,
    type,
    items, // This should be present in request body for combo
  } = req.body;

  try {
    const createOrder = async (pid) => {
      const time = Math.floor(Date.now() / 1000);
      const params = {
        uid: UID,
        email: EMAIL,
        product: gameName,
        time,
        productid: pid,
        userid: userId,
        zoneid: zoneId,
      };

      const sign = generateSign(params, M_KEY);

      const formData = new URLSearchParams();
      Object.entries({ ...params, sign }).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post(SMILE_API_URL, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      return response.data;
    };

    if (type === "combo" && Array.isArray(productId)) {
      const comboResults = [];

      for (const pid of productId) {
        const result = await createOrder(pid);
        comboResults.push(result);
      }

      return res.json({
        status: "success",
        type: "combo",
        results: comboResults,
      });
    } else {
      // Single product
      const result = await createOrder(productId);
      return res.json({
        status: "success",
        type: "single",
        result,
      });
    }
  } catch (error) {
    console.error(
      "Error creating order:",
      error?.response?.data || error.message
    );
    return res.status(500).json({ error: "Failed to create order" });
  }
};

module.exports = getProductList;
