const multer = require("multer");
const path = require("path");

const Product = require("../models/product");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");


//multer config
const Storage = multer.diskStorage({
  destination: "backend/controllers/productImages",
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new ErrorHandler("file type is not supported"), false);
      return;
    }
    cb(null, Date.now() + "-" + 'productImages' + ext);
  },
});

const upload = multer({
  storage: Storage,
}).single("testImage");

// Create new product   =>   /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  try {

    upload(req, res, (err) => {

      if (err) {
        console.Console.log(err);
      }

      const {
        name,
        mainCategory,
        bowelsPrice,
        largWeight,
        mediumPrice,
        mediumWeight,
        largPrice,
        smallPrice,
        smallWeight,
        headPrice,
      } = req.body;

      const product = Product.create({
        name,
        headPrice,
        bowelsPrice,
        largWeight,
        mediumPrice,
        mediumWeight,
        largPrice,
        smallPrice,
        smallWeight,
        mainCategory,
        productImage: {
          data: req.file.filename,
        },
      });

      res.status(200).json({
        success: true,
        product,
      });
    });
  } catch (err) {
    next(err);
  }
});

// Get all products   =>   /api/v1/products?keyword=apple
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const productCount = await Product.countDocuments();

  const products = await Product.find();

  res.status(200).json({
    success: true,
    productCount,
    products,
  });
});

// Get all products (Admin)  =>   /api/v1/admin/products
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

// Get single product details   =>   /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product   =>   /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }



  product = await Product.findByIdAndUpdate(
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
    product,
  });
});

// Delete Product   =>   /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product is deleted.",
  });
});
