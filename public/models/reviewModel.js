const mongoose = require("mongoose");
const User = require("./userModel");
const Order = require("./orderModel");
const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Review can not be empty!"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    order: {
      type: mongoose.Schema.ObjectId,
      ref: "Order",
      required: [true, "Review must belong to a tour."],
      unique: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user"],
    },
  },
  { timestamps: true }
);

reviewSchema.post("save", async (doc) => {
  let thisOrder = await Order.findById(doc.order);
  let delivery = await Delivery.findById(thisOrder.delivery);
  delivery.ratingsQuantity++;
  delivery.ratingsAverage =
    (delivery.ratingsAverage * (delivery.ratingsQuantity - 1) + doc.rating) /
    delivery.ratingsQuantity;
  await delivery.save();
});
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
