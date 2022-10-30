const Info = require("../models/info");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// Create new info   =>   /api/v1/admin/info/new
exports.newInfo = catchAsyncErrors(async (req, res, next) => {
  try {
    const {
      prepay,
      kssPhone,
      kssEmail,
      bokNumber,
    } = req.body;

    const info = await Info.create({
      kssPhone,
      prepay,
      kssEmail,
      bokNumber,
    });

    res.status(200).json({
      success: true,
      info,
    });
  } catch (err) {
    next(err);
  }
});

// Get all infos   =>   /api/v1/infos
exports.getInfos = catchAsyncErrors(async (req, res, next) => {
  const infos = await Info.find();

  res.status(200).json({
    success: true,
    infos,
  });
});

// Get single offer details   =>   /api/v1/offer/:id
exports.getSingleInfo = catchAsyncErrors(async (req, res, next) => {
  const info = await Info.findById(req.params.id);

  if (!info) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    info,
  });
});


exports.updateInfo = catchAsyncErrors(async (req, res, next) => {
  let info = await Info.findById(req.params.id);

  if (!info) {
    return next(new ErrorHandler("Product not found", 404));
  }

  

  info = await Info.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    info,
  });
});

// Delete info   =>   /api/v1/admin/info/:id
exports.deleteInfo = catchAsyncErrors(async (req, res, next) => {
  const info = await Info.findById(req.params.id);

  if (!info) {
    return next(new ErrorHandler("info not found", 404));
  }

  await info.remove();

  res.status(200).json({
    success: true,
    message: "info is deleted.",
  });
});
