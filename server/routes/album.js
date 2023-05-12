const express = require("express")
const {
  getAlbums,
  getSingleAlbum,
  addAlbum,
  updateAlbum,
  deleteAlbum,
} = require("../controllers/album")
const { addReview } = require("../controllers/reviews")
const { protect } = require("../middleware/auth")
const authorize = require("../middleware/authorize")

const router = express.Router()
router.get("/", protect, getAlbums)
router.get("/:id", protect, getSingleAlbum)
router.post("/", protect, authorize("admin"), addAlbum)
router.put("/:id", protect, authorize("admin"), updateAlbum)
router.delete("/:id", protect, authorize("admin"), deleteAlbum)
router.post("/:id/reviews", protect, addReview)

module.exports = router
