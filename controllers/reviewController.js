const Review = require("./../models/reviewModel");
const ReviewProduct = require("./../models/reviewProductModel");
const Branch = require("../models/branchModel");
const factory = require("../utils/handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");
exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);

exports.getAllReviewProduct = factory.getAllpop1(
  ReviewProduct,
  { path: "product" },
  { path: "user", select: "name phone" }
);
exports.getReviewProduct = factory.getOne(
  ReviewProduct,
  { path: "prodect" },
  { path: "user", select: "name phone" }
);
exports.createReviewProduct = factory.createOne(ReviewProduct);
exports.updateReviewProduct = factory.updateOne(ReviewProduct);
exports.deleteReviewProduct = factory.deleteOne(ReviewProduct);
