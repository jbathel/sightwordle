const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
  word: {
    type: String,
  },
  wordLength: {
    type: String,
  },
  wordGroup: {
    type: String,
  },
});

module.exports = mongoose.model('Word', WordSchema);
