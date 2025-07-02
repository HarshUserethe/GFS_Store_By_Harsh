 const SmileMlbbProducts = require('../../models/SmileMlbbProducts.js');

async function fetchProducts(req, res) {
  try {
    const products = await SmileMlbbProducts.find({}); // fetch all products
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error fetching products' });
  }
}

module.exports = fetchProducts;
