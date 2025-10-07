const User = require("../models/User")
const Pet = require("../models/Pet")
const Appointment = require("../models/Appointment")

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id)

    pets = await Pet.find({ owner: user._id })
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
    res.render("user/profile.ejs", { user: data })
  } catch (err) {
    console.error("cannot get profile" + err)
  }
}

const update_profile_get = async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    return res.send("No user with that ID exists.")
  }

  res.render("user/update-profile.ejs", { user })
}

const update_profile_put = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body)
    res.send(`Profile successfully updated`)
  } catch (error) {
    console.error("Error has occurred when updating profile!", error.message)
  }
}
//////////////////////////////////////////////////////////////////
const get_book_appointment = async (req, res) => {
  try {
    const pets = await Pet.find({
      owner: req.session.user._id,
    })
    res.render("user/bookAppointment.ejs", { pets })
  } catch (err) {
    console.error("Error loading the appointment form !", err)
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
////////////////////////////////////////////////
const get_view_appointment = async (req, res) => {
  try {
    const pets = await Pet.find({ owner: req.session.user._id })
    const petIds = pets.map((pet) => pet._id)
    const appointments = await Appointment.find({ petId: { $in: petIds } })
      .populate("petId", "petName species breed")
      .sort({ dateTime: 1 })
    // const vets = await Pet.find({})
    // const vetIds = vets.map((pet) => pet._id)
    const vetAppointments = await Appointment.find({})
    console.log({ vetAppointments })
    res.render("user/viewAppointment.ejs", { appointments, vetAppointments })
  } catch (err) {
    console.error("Error showing appointments", +err)
    res.send("Error loading appointments" + err.message)
  }
}

const edit_appointments = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.session.user._id,
      req.body,
      {
        new: true,
      }
    )
    res.redirect("../User/editAppointments")
  } catch (error) {
    console.error(
      "An error has occurred updating an appointment!",
      error.message
    )
  }
}
const get_edit_appointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate(
      "petId"
    )
    const pets = await Pet.find({ owner: req.session.user._id })

    if (!appointment) {
      return res.send("Appointment not found")
    }

    res.render("user/editAppointment.ejs", { appointment, pets })
  } catch (error) {
    console.error("Error loading edit appointment form:", error.message)
    res.send("Error loading form.")
  }
}

const put_edit_appointment = async (req, res) => {
  try {
    const { petId, date, time, reason } = req.body

    await Appointment.findByIdAndUpdate(req.params.id, {
      petId,
      date,
      time,
      reason,
    })

    res.redirect("/user/viewAppointment")
  } catch (error) {
    console.error("Error updating appointment:", error.message)
    res.send("Error updating appointment.")
  }
}

const delete_appointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id)
    if (!appointment) {
      return res.send("Appointment not found.")
    }
    res.redirect("/user/viewAppointment")
  } catch (error) {
    console.error("Error deleting appointment:", error.message)
    res.send("Error deleting appointment.")
  }
}

module.exports = {
  getProfile,
  get_book_appointment,
  post_book_appointment,
  get_view_appointment,
  update_profile_get,
  update_profile_put,

  edit_appointments,

  get_edit_appointment,
  put_edit_appointment,
  delete_appointment,
}
