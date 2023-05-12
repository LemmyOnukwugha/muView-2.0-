const jwt = require("jsonwebtoken")
const User = require("../models/User")
const ErrorResponse = require("../util/Errorresponse")

exports.protect = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1]
    if (!token) {
      return next(new ErrorResponse("User not authenticated", 401))
    }
    let decode
    try {
      decode = jwt.verify(token, process.env.SECRET_JWT)
    } catch (error) {
      console.log(error)
    }

    const user = await User.findById(decode.id)
    req.user = user

    next()
  } catch (error) {
    next(error)
  }
}
