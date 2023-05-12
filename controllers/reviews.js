const Album = require("../models/Album")
const Review = require("../models/Review")
const ErrorResponse = require("../util/Errorresponse")

exports.getReviews = async function (req, res, next) {
  try {
    const reviews = await Review.find()
    res.status(200).json({ message: "Success", data: reviews })
  } catch (error) {
    next(error)
  }
}
exports.getSingleReview = async function (req, res, next) {
  try {
    const review = await Review.findById(req.params.id)
    if (!review) {
      return next(new ErrorResponse("Review Not Found", 404))
    }
    res.status(200).json({ message: "Success", data: review })
  } catch (error) {
    next(error)
  }
}
exports.addReview = async function (req, res, next) {
  try {
    const album = await Album.findById(req.params.id)
    if (!album) {
      return next(new ErrorResponse("Album Not Found", 404))
    }
    // check if a review has already been added before
    let review = await Review.findOne({
      user: req.user.id,
      album: req.params.id,
    })
    if (review) {
      return next(new ErrorResponse("User already submitted a review", 404))
    }

    review = await Review.create({
      description: req.body.description,
      rating: req.body.rating,
      album: req.params.id,
      user: req.user.id,
    })
    res.status(201).json({ message: "Success", data: review })
  } catch (error) {
    next(error)
  }
}
exports.updateReview = async function (req, res, next) {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!review) {
      return next(new ErrorResponse("Review Not Found", 404))
    }
    res.status(200).json({ message: "Success", data: review })
  } catch (error) {
    next(error)
  }
}
exports.deleteReview = async function (req, res, next) {
  try {
    const review = await Review.findById(req.params.id)
    if (!review) {
      return next(new ErrorResponse("Review Not Found", 404))
    }
    await review.deleteOne()
    res.status(200).json({ message: "Success", data: review })
  } catch (error) {
    next(error)
  }
}
