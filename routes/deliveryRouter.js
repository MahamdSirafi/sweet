const express = require("express");
const router = express.Router();
const Branch = require("../models/branchModel");
const authMiddlewers = require("../middlewares/authMiddlewers");
const dynamicMiddleware = require("../middlewares/dynamicMiddleware");
const deliveryController = require("../controllers/deliveryController");
router
  .route("/statistics/:year/:month")
  .get(
    authMiddlewers.protect,
    authMiddlewers.restrictTo("admin"),
    deliveryController.statisticsWithLinkDelivery
  );
router
  .route("/")
  .get(
    authMiddlewers.protect,
    authMiddlewers.restrictTo("admin"),
    deliveryController.getAllDelivery
  )
  .post(
    authMiddlewers.protect,
    authMiddlewers.restrictTo("admin"),
    deliveryController.createDelivery
  );

router
  .route("/mybranch")
  .get(
    authMiddlewers.protect,
    authMiddlewers.restrictTo("mgr"),
    dynamicMiddleware.setIdWhatIsMainInQuery(Branch, "manger", "branch"),
    deliveryController.getAllDelivery
  )
  .post(
    authMiddlewers.protect,
    authMiddlewers.restrictTo("mgr"),
    dynamicMiddleware.setIdWhatIsMainInBody(Branch, "manger", "branch"),
    deliveryController.createDelivery
  );
  router.route("/:id/mybranch")
  .patch(
    authMiddlewers.protect,
    authMiddlewers.restrictTo("mgr"),
    dynamicMiddleware.setIdWhatIsMainInBody(Branch, "manger", "branch"),
    deliveryController.updateDelivery
  );
  router.route("/:id/mybranch")
  .delete(
    authMiddlewers.protect,
    authMiddlewers.restrictTo("mgr"),
    dynamicMiddleware.setIdWhatIsMainInBody(Branch, "manger", "branch"),
    deliveryController.deleteDelivery
  );
router
  .route("/:id")
  .get(
    authMiddlewers.protect,
    authMiddlewers.restrictTo( "admin"),
    deliveryController.getDelivery
  )
  .patch(
    authMiddlewers.protect,
    authMiddlewers.restrictTo( "admin"),
    deliveryController.updateDelivery
  )
  .delete(
    authMiddlewers.protect,
    authMiddlewers.restrictTo( "admin"),
    deliveryController.deleteDelivery
  );
module.exports = router;
