const User = require("../models/User")
// const Pet = require("../models/Pet")

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    // const pets = await Pet.find({ owner: user._id })
    const data = {
      _id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      phone: user.phone,
      image: user.image,
      role: user.role,
      // pets: pets,
    }
    res.render("./user/profile.ejs", { user: data })
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

module.exports = { getProfile, update_profile_get, update_profile_put }
