const extesionController = require("../controllers/extesionController");
const { checkOwner } = require("../middlewares/checkMiddleware");
const Order = require("../models/orderModel");
const authMiddlewers = require("../middlewares/authMiddlewers");
const imgExtentionMiddlewers = require("../middlewares/imgExtentionMiddlewers");
const dynamicMiddleware = require("../middlewares/dynamicMiddleware");
const express = require("express");
const router = express.Router({ mergeParams: true });
router
  .route("/uplode")
  .post(
    authMiddlewers.protect,
    authMiddlewers.restrictTo("user"),
    checkOwner(Order, "user", "orderId"),
    dynamicMiddleware.addVarBody("order", "orderId"),
    imgExtentionMiddlewers.uploadUserPhoto,
    dynamicMiddleware.setPathImginBody("extensions", "photo"),
    extesionController.createextesion
  );
router
  .route("/") //استعلام عن اضفات طلب محدد
  .get(
    authMiddlewers.protect,
    dynamicMiddleware.addQuery("order", "orderId"),
    extesionController.getAllextesion
  )
  .post(
    authMiddlewers.protect,
    checkOwner(Order, "user", "orderId"),
    authMiddlewers.restrictTo("user"),
    dynamicMiddleware.addVarBody("order", "orderId"),
    extesionController.chekExtesion,
    extesionController.createextesion
  );
router
  .route("/:id")
  .get(authMiddlewers.protect, extesionController.getextesion)
  .patch(
    authMiddlewers.protect,
    extesionController.chekExtesion,
    checkOwner(Order, "user", "orderId"),
    authMiddlewers.restrictTo("user"),
    extesionController.updateextesion
  )
  .delete(
    authMiddlewers.protect,
    extesionController.chekExtesion,
    checkOwner(Order, "user", "orderId"),
    authMiddlewers.restrictTo("user"),
    extesionController.deleteextesion
  );
router
  .route("/:id/uplode")
  .patch(
    authMiddlewers.protect,
    extesionController.chekExtesion,
    authMiddlewers.restrictTo("user"),
    checkOwner(Order, "user", "orderId"),
    imgExtentionMiddlewers.uploadUserPhoto,
    dynamicMiddleware.filteredBody("photo"),
    dynamicMiddleware.setPathImginBody("extensions", "photo"),
    extesionController.updateextesion
  );

module.exports = router;
