const Album = require("../models/Album")
const ErrorResponse = require("../util/Errorresponse")
const path = require("path")
const { v4: uuidv4 } = require("uuid")

exports.getAlbums = async function (req, res, next) {
  let albums
  let count
  const { page = 1, limit = 10, q } = req.query
  try {
    if (req.query.sort === "trending") {
      albums = await Album.find({ rating: { $gte: 2 } })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .populate("reviews")
      count = await Album.countDocuments({ rating: { $gte: 2 } })
    } else {
      albums = await Album.find({ Title: { $regex: q, $options: "i" } })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .populate("reviews")
      count = await Album.countDocuments({
        Title: { $regex: q, $options: "i" },
      })
    }

    res.status(200).json({
      message: "Success",
      data: albums,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    })
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
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.")
  }
  if (!req.files.image.mimetype.startsWith("image")) {
    return next(new ErrorResponse("Please upload an image file", 400))
  }
  const image = req.files.image

  image.name =
    "photo_" + uuidv4().replace(/-/gi, "") + path.parse(image.name).ext
  const uploadPath = path.join(__dirname, "..", "public", "uploads", image.name)
  image.mv(uploadPath, async function (err) {
    if (err) {
      console.log(err)
      return next(new ErrorResponse("Image upload failed", 500))
    }
    try {
      const album = await Album.create({ ...req.body, image: image.name })
      res.status(201).json({ message: "Success", data: album })
    } catch (error) {
      next(error)
    }
  })
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
