const mongoose = require("mongoose");
const branchSchema = new mongoose.Schema(
  {
    manger: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "يجب ادخال مدير الفرع"],
    },
    name: {
      type: String,
      required: [true, "يجب ادخال اسم الفرع"],
    },
    imageCover: {
      type: String,
      required: [true, "يجب ادخال صورة واجهة الفرع"],
    },
    phone: {
      type: String,
      required: [true, "يجب ادخال رقم اتصال الفرع"],
    },
    location: {
      type: mongoose.Schema.ObjectId,
      ref: "Location",
      required: [true, "يجب ادخال موقع الفرع "],
    },
  },
  {
    timestamps: true,
  }
);
const Branch = mongoose.model("Branch", branchSchema);
module.exports = Branch;
