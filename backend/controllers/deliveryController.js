const Delivery = require("../models/delivery");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");

// Create new delivery   =>   /api/v1/admin/delivery/new
exports.newDelivery = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, number, user, order } = req.body;

    const delivery = await Delivery.create({
      name,
      number,
      user,
      order
    });

    res.status(200).json({
      success: true,
      delivery,
    });
  } catch (err) {
    next(err);
  }
});


// Get all deliveries (Admin)  =>   /api/v1/admin/deliveries
exports.getAdminDeliveries = catchAsyncErrors(async (req, res, next) => {
  const deliveries = await Delivery.find();

  res.status(200).json({
    success: true,
    deliveries,
  });
});

// Get single delivery details   =>   /api/v1/delivery/:id
exports.getSingleDelivery = catchAsyncErrors(async (req, res, next) => {
  const delivery = await Delivery.findById(req.params.id);

  if (!delivery) {
    return next(new ErrorHandler("Delivery not found", 404));
  }

  res.status(200).json({
    success: true,
    delivery,
  });
});

// Update Delivery   =>   /api/v1/admin/delivery/:id
exports.updateDelivery = catchAsyncErrors(async (req, res, next) => {
  let delivery = await Delivery.findById(req.params.id);

  if (!delivery) {
    return next(new ErrorHandler("Delivery not found", 404));
  }

  delivery = await Delivery.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    delivery,
  });
});

// Delete Delivery   =>   /api/v1/admin/delivery/:id
exports.deleteDelivery = catchAsyncErrors(async (req, res, next) => {
  const delivery = await Delivery.findById(req.params.id);

  if (!delivery) {
    return next(new ErrorHandler("Delivery not found", 404));
  }

  await delivery.remove();

  res.status(200).json({
    success: true,
    message: "Product is deleted.",
  });
});
