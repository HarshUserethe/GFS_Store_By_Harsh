const mongoose = require('mongoose');

const smileGameListSchema = new mongoose.Schema({
  name: String,
  title: String,
  logoUrl: String
}, {
  collection: 'smileonegames' // Explicitly specify your collection name here
});

module.exports = mongoose.model('SmileOneGameList', smileGameListSchema);
