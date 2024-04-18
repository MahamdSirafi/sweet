const branchController = require("../controllers/branchController");
const productRouter = require("./productRouter");
const branch = require("../models/branchModel");
const authMiddlewers = require("../middlewares/authMiddlewers");
const checkMiddleware = require("../middlewares/checkMiddleware");
const dynamicMiddleware = require("../middlewares/dynamicMiddleware");
const imgbranchsMiddlewar = require("../middlewares/imgbranchsMiddlewar");
const express = require("express");
const router = express.Router();
router
  .route("/mybranch")
  .get(
    authMiddlewers.protect,
    dynamicMiddleware.addQuery("manger", "userId"),
    branchController.getAllbranch
  );
router
  .route("/")
  .get(authMiddlewers.protect, branchController.getAllbranch)
  .post(
    authMiddlewers.protect,
    authMiddlewers.restrictTo("admin"),
    branchController.createbranch
  );
router
  .route("/:id/mybranch")
  .patch(
    authMiddlewers.protect,
    authMiddlewers.restrictTo("mgr"),
    checkMiddleware.checkOwner(branch, "manger", "id"),
    branchController.updatebranch
  );
router
  .route("/:id")
  .get(authMiddlewers.protect, branchController.getbranch)
  .patch(
    authMiddlewers.protect,
    authMiddlewers.restrictTo("admin"),
    branchController.updatebranch
  )
  .delete(
    authMiddlewers.protect,
    authMiddlewers.restrictTo("admin"),
    branchController.deletebranch
  );
router
  .route("/:id/uplode")
  .patch(
    authMiddlewers.protect,
    authMiddlewers.restrictTo("mgr"),
    checkMiddleware.checkOwner(branch, "manger", "id"),
    imgbranchsMiddlewar.uploadBranchPhoto,
    dynamicMiddleware.filteredBody("imageCover"),
    dynamicMiddleware.setPathImginBody("branchs", "imageCover"),
    branchController.updatebranch
  );
router.use("/:branchId/products", productRouter);
module.exports = router;
