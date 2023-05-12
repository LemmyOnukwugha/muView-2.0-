const express = require("express")
const {
  getReviews,
  addReview,
  updateReview,
  deleteReview,
  getSingleReview,
} = require("../controllers/reviews")
const { protect } = require("../middleware/auth")

const router = express.Router()

router.get("/", protect, getReviews)
router.get("/:id", protect, getSingleReview)
router.put("/:id", protect, updateReview)
router.delete("/:id", protect, deleteReview)

module.exports = router
