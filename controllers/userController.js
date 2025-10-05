const User = require("../models/User")
const Pet = require("../models/Pet")

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const pets = await Pet.find({ owner: user._id })
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
  } catch (err) {
    console.error("cannot get profile" + err)
  }
}

module.exports = { getProfile }
