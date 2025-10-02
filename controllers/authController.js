const bcrypt = require("bcrypt")
const User = require("../models/User.js")

const registerUser = async (req, res) => {
try {
const userInDatabase = await User.exists({ userName: req.body.username})
if (userInDatabase) {
  return res.send("Username already taken")
}

if (req.body.password !== req.body.confirmPassword) {
  return res.send("Password and confirm password do not match")}

  const hashedPassword = bcrypt.hashSync(req.body.password, 10)

await User.create({
username: req.body.username,
password: hashedPassword,
firstName: req.body.firstName,
lastName: req.body.lastName,
address: req.body.address,
phone: req.body.phone,
})
res.send("Thanks for signing up!")
} catch (error) {
  console.error("Unable to register user.", error.message)
}
}


module.exports = {
  registerUser,
}
