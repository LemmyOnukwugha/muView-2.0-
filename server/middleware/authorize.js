const ErrorResponse = require("../util/Errorresponse")

const authorize = (role) => (req, res, next) => {
  if (role !== req.user.role) {
    return next(new ErrorResponse("User Not Allowed", 401))
  }
  next()
}

module.exports = authorize
