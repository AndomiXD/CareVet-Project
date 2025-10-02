const mongoose = require("mongoose")

const appointmentSchema = new mongoose.Schema(
  {
    petId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
      required: true,
    },
    dateTime: Date,
    reason: String,
  },
  { timestamps: true }
)

const Appointment = mongoose.model("Appointment", appointmentSchema)

module.exports = Appointment
