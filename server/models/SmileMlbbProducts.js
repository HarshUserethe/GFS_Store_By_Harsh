const mongoose = require('mongoose');

const smileMlbbProductsSchema = new mongoose.Schema({
  spu: String,
  title: String,
  price: String,
  dis_price: String,
  category: String,
  logoUrl: String
}, {
  collection: 'smileoneproductlist' // Explicitly specify your collection name here
});

module.exports = mongoose.model('Product', smileMlbbProductsSchema);
