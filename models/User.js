const { Schema, model } = require("mongoose")

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name "],
      maxlength: [15, "Maximum length of characters is 15"],
    },
    email: {
      type: String,
      required: [true, "Please your email address"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Minimum password length must be at least 6 characters"],
      select: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
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
userSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "user",
  justOne: false,
})

module.exports = model("User", userSchema)
