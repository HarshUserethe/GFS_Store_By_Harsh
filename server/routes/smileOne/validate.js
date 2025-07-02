const generateSign = require("../../config/generateSign");
const axios = require("axios");

const SMILE_API_URL = "https://www.smile.one/br/smilecoin/api/getrole"; // Production
const UID = "1298094"; // e.g., 1041302
const EMAIL = "sharman2727@gmail.com";
const M_KEY = "ce6984d693f78ead32aa3509be845e89"; // e.g., "1234567890"

const validate = async (req, res) => {
  const { product, productid, userid, zoneid,  } = req.body;
  try {
    const time = Math.floor(Date.now() / 1000); // current timestamp in seconds

    const params = {
      email: EMAIL,
      uid: UID,
      userid,
      zoneid,
      product,
      productid,
      time
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

    return res.json(response.data); // Send to frontend
  } catch (error) {
    console.error(
      "Error fetching products:",
      error?.response?.data || error.message
    );
    return res.status(500).json({ error: "Failed to fetch products" });
  }
};

module.exports = validate;
