const mongoose = require("mongoose");

const offSchema = new mongoose.Schema({
  num: {
    type: Number,
    
  },
  off: {
    type: String,
    required: false,
  }
});

module.exports = mongoose.model("Offers", offSchema);
