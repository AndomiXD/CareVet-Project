const User = require("../models/User")
const Pet = require("../models/Pet")
const Appointment = require("../models/Appointment")

const getProfile = async (req, res) => {
  try {
    const userId = req.session?.userId || req.query.id
    if (!userId) {
      res.send("User not logged in")
    }
    const user = await User.findById(userId)
    if (!user) {
      res.send("User not found")
    }
    const pets = await Pet.find({ owner: userId })
    res.render("profile", { user, pets })
  } catch (err) {
    console.error("cannot get profile" + err)
  }
}

const get_book_appointment = async (req, res) => {
  try {
    const pets = await Pet.find({
      owner: req.session.user._id,
    })
    res.render("user/bookAppointment", { pets })
  } catch (err) {
    console.error("Error loading the appointmrnt form !", err)
    res.status(500).send("Error loading appointment form")
  }
}

const post_book_appointment = async (req, res) => {
  try {
    const { petId, date, time, reason } = req.body
    const appointment = new Appointment({
      petId,
      dateTime,
      reason,
    })
    await appointment.save()
    res.redirect("/auth/home")
  } catch (err) {
    console.log("Error while booking an appointment", err)
    res.status(500).send("Error booking appointment")
  }
}

module.exports = { getProfile, get_book_appointment, post_book_appointment }
