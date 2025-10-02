const User = require("../models/User")
const bcrypt = require("bcrypt")

//API's

exports.auth_signin_get = async = (req, res) => {
  res.render("auth/sign-in.ejs")


}

