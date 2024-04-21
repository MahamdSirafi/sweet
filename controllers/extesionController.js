const Extesion = require("../models/extesionModel");
const Order = require("../models/orderModel");
const handlerFactory = require("../utils/handlerFactory");
const catchAsync = require("../utils/catchAsync");


exports.getextesion = handlerFactory.getOne(Extesion);
exports.createextesion = handlerFactory.createOne(Extesion);
exports.updateextesion = handlerFactory.updateOne(Extesion);
exports.deleteextesion = handlerFactory.deleteOne(Extesion);
exports.getAllextesion = handlerFactory.getAll(Extesion);

exports.chekExtesion = catchAsync(async (req, res, next) => {
  const doc = await Order.findById(req.params.orderId);
  if (doc.paid == true || Date.now() - doc.createdAt > 10 * 60 * 1000)
    return next(new AppError("لقد تجاوزت الوقت المسموح لتعديل الطلب", 400));
  next();
});
