const User = require("../models/User")
const Pet = require("../models/Pet")

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

module.exports = { getProfile }
