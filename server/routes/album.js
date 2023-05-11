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

const router = express.Router()
router.get("/", protect, getAlbums)
router.get("/:id", protect, getSingleAlbum)
router.post("/", protect, addAlbum)
router.put("/:id", protect, updateAlbum)
router.delete("/:id", protect, deleteAlbum)
router.post("/:id/reviews", protect, addReview)

module.exports = router
