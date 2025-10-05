const User = require("../models/User")
const Pet = require("../models/Pet")


const getProfile = async (req, res) => {
  try {
    const userId = req.session.user._id // it is to get userId from session
    const user = await User.findById(req.params.id)

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

module.exports = { getProfile, update_profile_get, update_profile_put, get_book_appointment, post_book_appointment }

