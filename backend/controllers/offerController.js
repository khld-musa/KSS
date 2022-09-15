const Offer = require("../models/offer");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// Create new info   =>   /api/v1/admin/info/new
exports.newOffer = catchAsyncErrors(async (req, res, next) => {
    try {
        const {
            off
        } = req.body;

        const offer = await Offer.create({
            off
        });

        res.status(200).json({
            success: true,
            offer,
        });
    } catch (err) {
        next(err);
    }
});

// Get all infos   =>   /api/v1/infos
exports.getOffers = catchAsyncErrors(async (req, res, next) => {
    const offers = await Offer.find();

    res.status(200).json({
        success: true,
        offers,
    });
});


exports.updateOffer = catchAsyncErrors(async (req, res, next) => {
    let offer = await Offer.findById(req.params.id);

    if (!offer) {
        return next(new ErrorHandler("offer not found", 404));
    }



    offer = await Offer.findByIdAndUpdate(
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
        offer,
    });
});

// Delete info   =>   /api/v1/admin/info/:id
exports.deleteOffer = catchAsyncErrors(async (req, res, next) => {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
        return next(new ErrorHandler("offer not found", 404));
    }

    await offer.remove();

    res.status(200).json({
        success: true,
        message: "offer is deleted.",
    });
});
