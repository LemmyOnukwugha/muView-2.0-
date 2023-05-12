const Album = require("../models/Album")
const ErrorResponse = require("../util/Errorresponse")

exports.getAlbums = async function (req, res, next) {
  try {
    const albums = await Album.find().populate("reviews")
    res.status(200).json({ message: "Success", data: albums })
  } catch (error) {
    next(error)
  }
}
exports.getSingleAlbum = async function (req, res, next) {
  try {
    const album = await Album.findById(req.params.id).populate({
      path: "reviews",
      populate: { path: "user" },
    })

    if (!album) {
      return next(new ErrorResponse("Album Not Found", 404))
    }
    res.status(200).json({ message: "Success", data: album })
  } catch (error) {
    next(error)
  }
}
exports.addAlbum = async function (req, res, next) {
  try {
    console.log("in the body", req.body)
    const album = await Album.create(req.body)
    res.status(201).json({ message: "Success", data: album })
  } catch (error) {
    next(error)
  }
}
exports.updateAlbum = async function (req, res, next) {
  try {
    const album = await Album.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!album) {
      return next(new ErrorResponse("Album Not Found", 404))
    }
    res.status(200).json({ message: "Success", data: album })
  } catch (error) {
    next(error)
  }
}
exports.deleteAlbum = async function (req, res, next) {
  try {
    const album = await Album.findByIdAndDelete(req.params.id)
    if (!album) {
      return next(new ErrorResponse("Album Not Found", 404))
    }
    res.status(200).json({ message: "Success", data: album })
  } catch (error) {
    next(error)
  }
}