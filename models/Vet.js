const mongoose = require("mongoose")

const vetSchema = new mongoose.Schema({
  specialty: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
})

const Vet = mongoose.model("Vet", vetSchema)

module.exports = Vet
