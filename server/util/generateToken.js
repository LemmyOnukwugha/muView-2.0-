const jwt = require("jsonwebtoken")

module.exports = function (userId) {
  return jwt.sign({ id: userId }, process.env.SECRET_JWT, {
    expiresIn: process.env.JWT_EXPIRATION,
  })
}
