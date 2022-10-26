const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  shippingInfo: [
    {
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },

      phoneNo1: {
        type: String,
        required: true,
      },
      phoneNo2: {
        type: String,
        required: true,
      },

      location: {
        latitude: {
          type: Number,
          required: true,
        },
        longitude: {
          type: Number,
          required: true,
        },
      },
    },
  ],

  bokImage: {
    data: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      head: {
        type: String,
        required: [true, "Please select category for this product"],
        // enum: {
        //   values: ["with head", "without head"],
        //   message: "Please select correct category for product",
        // },
      },
      bowels: {
        type: String,
        required: [true, "Please select category for this product"],
        // enum: {
        //   values: ["with bowels", "without bowels"],
        //   message: "Please select correct category for product",
        // },
      },
      weight: {
        type: String,
        required: [true, "Please select category for this product"],
        // enum: {
        //   values: ["small", "medium", "larg"],
        //   message: "Please select correct weight for product",
        // },
      },
      headPrice: {
        type: Number,
        required: true,
      },
      weightPrice: {
        type: Number,
        required: true,
      },
      bowelsPrice: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
      },

      // product: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   required: true,
      //   ref: "Product",
      // },
    },
  ],

  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  deliveredAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
