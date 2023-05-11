const { Schema, model, models } = require("mongoose")

const albumSchema = new Schema(
  {
    Title: {
      type: String,
      required: [true, "Please enter a name for this album"],
      maxlength: [50, "Maximum length of characters is 20"],
    },
    Artist: {
      type: String,
      required: [true, "Please enter a name of artist"],
      maxlength: [30, "Maximum length of characters is 20"],
    },
    Release: {
      type: Number,
      required: [true, "Please enter year of release"],
    },
    Genre: {
      type: String,
      required: [true, "Please select a genre"],
    },
    rating: { type: Number, default: 0 },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
)

albumSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "album",
  justOne: false,
})

module.exports = model("Album", albumSchema)
