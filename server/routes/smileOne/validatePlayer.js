const axios = require("axios");
const generateSign = require("../../config/generateSign");

const SMILE_GETROLE_URL = "https://www.smile.one/br/smilecoin/api/getrole";
const UID = "1298094";
const EMAIL = "sharman2727@gmail.com";
const M_KEY = "ce6984d693f78ead32aa3509be845e89";

const getRoleController = async (req, res) => {
  const { gameName, productId, userId, zoneId } = req.body;

  console.log(productId)
  try {
    const time = Math.floor(Date.now() / 1000);

    const params = {
      uid: UID,
      email: EMAIL,
      product: gameName,
      productid: Array.isArray(productId) ? productId[0] : productId,
      userid: userId,
      zoneid: zoneId,
      time,
    };

    const sign = generateSign(params, M_KEY);

    const formData = new URLSearchParams();
    Object.entries({ ...params, sign }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await axios.post(SMILE_GETROLE_URL, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Error in getrole:", error?.response?.data || error.message);
    return res.status(500).json({
      status: 500,
      message: "Failed to fetch role data",
    });
  }
};

module.exports = getRoleController;
