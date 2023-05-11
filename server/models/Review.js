const { Schema, model, models } = require("mongoose")

const reviewSchema = new Schema(
  {
    description: {
      type: String,
      required: [true, "Please enter a review"],
      maxlength: [200, "Maximum length of characters is 200"],
    },
    album: {
      type: Schema.Types.ObjectId,
      ref: "Album",
      required: true,
    },
    rating: {
      type: Number,
      required: [true, "Please enter a rating for this album"],
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
)

reviewSchema.statics.getAverageRating = async function (albumId) {
  const agg = await this.aggregate([
    {
      $match: { album: albumId },
    },
    {
      $group: {
        _id: "$rating",
        averageRating: { $avg: "$rating" },
      },
    },
  ])

  try {
    await this.model("Album").findByIdAndUpdate(albumId, {
      rating: Math.ceil(agg[0].averageRating),
    })
  } catch (error) {
    console.log(error)
  }
}

reviewSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function () {
    await this.constructor.getAverageRating(this.album)
  }
)
reviewSchema.post("save", async function () {
  await this.constructor.getAverageRating(this.album)
})

module.exports = model("Review", reviewSchema)
