const Vet = require("../models/Vet")

const vet_view_appointment = async (req, res) => {
  try {
    const pets = await Pet.find({ owner: req.session })
    const petIds = pets.map((pet) => pet._id)
    const appointments = await Appointment.find({ petId: { $in: petIds } })
      .populate("petId", "petName species breed")
      .sort({ dateTime: 1 })
    res.render("user/viewAppointment.ejs", { appointments })
  } catch (err) {
    console.error("Error showing appointments", +err)
    res.send("Error loading appointments" + err.message)
  }
}


module.exports = {
vet_view_appointment,
}
