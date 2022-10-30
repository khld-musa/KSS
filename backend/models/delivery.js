const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({

    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    orderid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Order",
    },
});

module.exports = mongoose.model("delivery", deliverySchema);
