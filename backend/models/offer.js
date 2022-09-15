const mongoose = require("mongoose");

const offSchema = new mongoose.Schema({
  off: {
    type: Number,
    required: false,
  }
});

module.exports = mongoose.model("Offers", offSchema);
