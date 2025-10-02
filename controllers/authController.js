const User = require("../models/User")
const bcrypt = require("bcrypt")

//API's

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
}
