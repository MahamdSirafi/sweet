const express = require("express");
const reviewController = require("../controllers/reviewController");
const authMiddlewers = require("../middlewares/authMiddlewers");
const dynamicMiddleware = require("../middlewares/dynamicMiddleware");
const router = express.Router();
router.use(authMiddlewers.protect);
router
  .route("/")
  .get(
    authMiddlewers.restrictTo("mgr", "admin"),
    reviewController.getAllReviews
  )
  .post(
    authMiddlewers.restrictTo("user"),
    dynamicMiddleware.addVarBody("user", "userId"),
    reviewController.createReview
  );
router
  .route("/me")
  .get(
    dynamicMiddleware.addQuery("user", "userId"),
    reviewController.getAllReviews
  );
// router
//   .route("/mybranch")
//   .get(
//     authMiddlewers.restrictTo("mgrRestaurant"),
//     reviewController.getAllReviewsRes
//   );
router
  .route("/:id")
  .get(reviewController.getReview)
  .patch(authMiddlewers.restrictTo("user"), reviewController.updateReview)
  .delete(
    authMiddlewers.restrictTo("user", "admin"),
    reviewController.deleteReview
  );

router
  .route("/product")
  .get(
    authMiddlewers.restrictTo("mgr", "admin"),
    reviewController.getAllReviewProduct
  )
  .post(
    authMiddlewers.restrictTo("user"),
    dynamicMiddleware.addVarBody("user", "userId"),
    reviewController.createReviewProduct
  );
router
  .route("/product/me")
  .get(
    dynamicMiddleware.addQuery("user", "userId"),
    reviewController.getAllReviewProduct
  );
// router
//   .route("/mybranch")
//   .get(
//     authMiddlewers.restrictTo("mgrRestaurant"),
//     reviewController.getAllReviewsRes
//   );
router
  .route("/product/:id")
  .get(reviewController.getReviewProduct)
  .patch(
    authMiddlewers.restrictTo("user"),
    reviewController.updateReviewProduct
  )
  .delete(
    authMiddlewers.restrictTo("user", "admin"),
    reviewController.deleteReviewProduct
  );

module.exports = router;
