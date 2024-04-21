const Branch = require("../models/branchModel");
const Order = require("../models/orderModel");
const AppError = require("../utils/appError");
const handlerFactory = require("../utils/handlerFactory");
const catchAsync = require("../utils/catchAsync");
exports.getbranch = handlerFactory.getOne(
  Branch,
  { path: "manger", select: "name photo" },
  { path: "location", select: "-_id -__v" }
);
exports.createbranch = handlerFactory.createOne(Branch);
exports.updatebranch = handlerFactory.updateOne(Branch);
exports.deletebranch = handlerFactory.deleteOne(Branch);
exports.getAllbranch = handlerFactory.getAllpop1(
  Branch,
  { path: "manger", select: "name photo" },
  { path: "location", select: "-_id -__v" }
);
exports.statisticsWithLinkBranch = handlerFactory.statisticsWithLink(
  Order,
  "total",
  "branches",
  "branch",
  "branch.name",
  "branch.phone"
);
