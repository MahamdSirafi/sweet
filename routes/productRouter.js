const express = require("express");
const router = express.Router({ mergeParams: true });
const Branch = require("../models/branchModel");
const authMiddlewers = require("../middlewares/authMiddlewers");
const dynamicMiddleware = require("../middlewares/dynamicMiddleware");
const imgproductMiddlewers = require("../middlewares/imgprodectMiddlewar");
const productController = require("../controllers/productController");
const { checkOwner } = require("../middlewares/checkMiddleware");
router
  .route("/category")
  .get(authMiddlewers.protect, productController.getAllProductCategory);
// router
// .route("/category/:category")
// .delete(productController.deleteCategory)
// .put(productController.updateCategory);
router
  .route("/")
  .get(
    authMiddlewers.protect,
    dynamicMiddleware.addQuery("branch", "branchId"),
    productController.getAllProduct
  )
  .post(
    authMiddlewers.protect,
    authMiddlewers.restrictTo("mgr"),
    checkOwner(Branch, "manger", "branchId"),
    productController.createProduct
  );
router
  .route("/:id")
  .get(authMiddlewers.protect, productController.getProduct)
  .patch(
    authMiddlewers.protect,
    authMiddlewers.restrictTo("mgr"),
    checkOwner(Branch, "manger", "branchId"),
    productController.updateProduct
  )
  .delete(
    authMiddlewers.protect,
    authMiddlewers.restrictTo("mgr"),
    checkOwner(Branch, "manger", "branchId"),
    productController.deleteProduct
  );
router
  .route("/:id/uplode")
  .patch(
    authMiddlewers.protect,
    authMiddlewers.restrictTo("mgr"),
    checkOwner(Branch, "manger", "branchId"),
    imgproductMiddlewers.uploadProdectPhoto,
    dynamicMiddleware.filteredBody("image"),
    dynamicMiddleware.setPathImginBody("prodects", "image"),
    productController.updateProduct
  );
module.exports = router;
