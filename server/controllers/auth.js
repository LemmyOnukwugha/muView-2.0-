const User = require("../models/User")
const ErrorResponse = require("../util/Errorresponse")
const generateToken = require("../util/generateToken")
const bcrypt = require("bcrypt")

exports.register = async function (req, res, next) {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    this.password = hashedPassword
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    })
    const token = generateToken(user._id)
    res.status(201).json({ message: "Success", token: token })
  } catch (error) {
    next(error)
  }
}
exports.signin = async function (req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    )
    if (!user) throw new ErrorResponse("Invalid credentials", 401)
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isMatch) throw new ErrorResponse("Invalid credentials", 401)
    const token = generateToken(user._id)
    res.status(200).json({ message: "Success", token: token })
  } catch (error) {
    next(error)
  }
}
exports.getMe = async function (req, res, next) {
  try {
    const user = await User.findById(req.user.id).populate("reviews")
    res.status(200).json({ success: true, user })
  } catch (error) {
    next(error)
  }
}
