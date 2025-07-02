const Order = require("../models/Order"); // Adjust path if needed

exports.getOrderHistory = async (req, res) => {
  try {
    const {userId} = req.body; // assuming user is authenticated via middleware
    
    const orders = await Order.find({ clerk_userid: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching order history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve order history",
    });
  }
};
