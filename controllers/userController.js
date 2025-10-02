const bcrypt = require("bcrypt")
const User = require("../models/User.js")

const registerUser = async (req, res) => {
try {
const userInDatabase = await User.exists({ userName: req.body.userName})
if (userInDatabase) {
  return res.send("Username already taken")
}
if ()
} catch (error) {


}
}

