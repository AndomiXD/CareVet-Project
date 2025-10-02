const User = require("../models/User")
const bcrypt = require("bcrypt")

//API's

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


exports.auth_signin_get = async (req, res) => {
  res.render("auth/sign-in.ejs")
}

exports.auth_siginin_post = async (req, res) => {
  const userInDatabase = await User.findOne({
    username: req.body.username,
  })
  if (!userInDatabase) {
    return res.send("Login Failed, Please try again later !")
  }
  const validPassword = bcrypt.compareSync(
    req.body.password,
    userInDatabase.password
  )
  if (!validPassword) {
    return res.send("Login failed, please try again later !")
  }

  req.session.user = {
    username: userInDatabase.username,
    _id: userInDatabase._id,
  }
  res.redirect("/")


module.exports = {
  registerUser,
}
