const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: Number, required: true },
    role: { type: String, required: true, default: "User" },
    image: {
      type: String,
      default:
        "https://i.pinimg.com/736x/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg",
    },
  },
  { timestamps: true }
)

const User = mongoose.model("User", userSchema)

module.exports = User
