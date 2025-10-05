const mongoose = require("mongoose")

const petSchema = new mongoose.Schema(
  {
    petName: { type: String, required: true },
    species: { type: String, required: true },
    breed: { type: String, required: true },
    petPhoto: String,
    // owner: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
  },
  { timestamps: true }
)

const Pet = mongoose.model("Pet", petSchema)

module.exports = Pet
