const express = require("express")
const { protect } = require("../middleware/auth")

const { signin, register, getMe } = require("../controllers/auth")

const router = express.Router()

router.post("/signup", register)
router.post("/signin", signin)
router.get("/me", protect, getMe)

module.exports = router
