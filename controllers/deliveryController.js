const Delivery = require("../models/deliveryModel");
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const factory = require("../utils/handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");
exports.getAllDelivery = factory.getAll(Delivery);
exports.getDelivery = factory.getOne(Delivery);
exports.updateDelivery = factory.updateOne(Delivery);
exports.deleteDelivery = factory.deleteOne(Delivery);
console.log("siba");
exports.createDelivery = catchAsync(async (req, res, next) => {
  const doc = await Delivery.create({
    name: req.body.name,
    branch: req.body.branch,
    phone: req.body.phone,
  });
  const newuser = await User.create({
    _id: doc._id,
    name: req.body.name,
    email: req.body.email,
    password: "123454321",
    role: "delivery",
    phone: req.body.phone,
  });
  if (!newuser) {
    return next(new AppError("حصل خطء في انشاء حساب لعامل التوصيل", 400));
  }
  res.status(201).json({
    status: "success",
    doc,
  });
});
exports.statisticsWithLinkDelivery = factory.statisticsWithLink(
  Order,
  "priceDelivery",
  "deliveries",
  "delivery",
  "delivery.name"
);
