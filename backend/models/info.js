const mongoose = require("mongoose");
const validator = require("validator");

const infoSchema = new mongoose.Schema({
  prepay: {
    type: Number,
    required: false,
  },
  kssPhone: {
    type: Number,
    required: false,
  },
  kssEmail: {
    type: String,
    required: false,
    validate: [validator.isEmail, "Please enter valid email address"],
  },
  bokNumber: {
    type: Number,
  },
});

module.exports = mongoose.model("Info", infoSchema);
