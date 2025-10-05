const User = require("../models/User")
const Pet = require("../models/Pet")
const Appointment = require("../models/Appointment")
const getProfile = async (req, res) => {
  try {
    const userId = req.session.user._id // it is to get userId from session
    const user = await User.findById(req.params.id)
    const pets = await Pet.find({ owner: user._id })
    if (userId) {
      const data = {
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        phone: user.phone,
        image: user.image,
        role: user.role,
        pets: pets,
      }
      res.render("./user/profile.ejs", { user: data })
    }
  } catch (err) {
    console.error("cannot get profile" + err)
  }
}

const get_book_appointment = async (req, res) => {
  try {
    const pets = await Pet.find({
      owner: req.session.user._id,
    })
    res.render("user/bookAppointment.ejs", { pets })
  } catch (err) {
    console.error("Error loading the appointmrnt form !", err)
    res.send("Error loading appointment form" + err.message)
  }
}

const post_book_appointment = async (req, res) => {
  try {
    const { petId, date, time, reason } = req.body
    const appointment = new Appointment({
      petId,
      date,
      time,
      reason,
    })
    await appointment.save()
    res.redirect("/user/viewAppointment")
  } catch (err) {
    console.log("Error while booking an appointment", err)
    res.send("Error booking appointment" + err.message)
  }
}

const get_view_appointment = async (req, res) => {
  try {
    const pets = await Pet.find({ owner: req.session.user._id })
    const petIds = pets.map((pet) => pet._id)
    const appointments = await Appointment.find({ petId: { $in: petIds } })
      .populate("petId", "petName species breed")
      .sort({ dateTime: 1 })
    res.render("user/viewAppointment", { appointments })
  } catch (err) {
    console.error("Error showing appointments", +err)
    res.send("Error loading appointments" + err.message)
  }
}

module.exports = {
  getProfile,
  get_book_appointment,
  post_book_appointment,
  get_view_appointment,
}
