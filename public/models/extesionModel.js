const mongoose = require("mongoose");
const Order= require("./orderModel");
const extesionSchema = new mongoose.Schema(
  {
    photo: {
      required: [true, "must enter photo"],
      type: String,
    },
    description: {
      required: [true, "must enter description"],
      type: String,
    },
    order: {
      required: [true, "must enter order"],
      type: mongoose.Schema.ObjectId,
      ref: "Order",
    },
    quantity: {
      required: [true, "must enter quantity"],
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
extesionSchema.post("save", async (doc) => {
  let thisOrder = await Order.findById(doc.order);
  thisOrder.total += doc.quantity * 2000; //اضافة الكلفة الاضافية الى المجموع
  thisOrder.priceExtesion += doc.quantity * 2000; //اضافة 2000كلفة اضافية لتحضير كل صورة على الحلوة او الكيك
  thisOrder.duration += doc.quantity * 60; //اضافة ساعة لتحضير كل صورة على الحلوة او الكيك
  thisOrder.save();
});
const Extesion = mongoose.model("Extesion", extesionSchema);
module.exports = Extesion;
