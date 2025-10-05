const User = require("../models/User")
const bcrypt = require("bcrypt")

// user registration
const registerUser = async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username })

  if (userInDatabase) {
    return res.send("Username already Taken")
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Password and Confirm password must match")
  }

  const hashedPassword = bcrypt.hashSync(req.body.password, 10)

  const user = await User.create({
    username: req.body.username,
    password: hashedPassword,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    phone: req.body.phone,
  })

  res.send(`Thanks for signing up ${user.username}`)
}
//user signin
const auth_signin_get = async (req, res) => {
  res.render("auth/sign-in.ejs")
}

const auth_signin_post = async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username })

  if (!userInDatabase) {
    return res.send("User Not Found, Please try again later !")
  }

  const validPassword = bcrypt.compareSync(
    req.body.password,
    userInDatabase.password
  )

  if (!validPassword) {
    return res.send("Wrong Password, please try again later !")
  }

  const data = (req.session.user = {
    username: userInDatabase.username,
    _id: userInDatabase._id,
  })

  res.render("auth/home.ejs", { user: data })
}

const updatePassword = async (request, respond) => {
  try {
    const user = await User.findById(request.params.id)
    if (!user) {
      return respond.send("No user with that ID exists.")
    }

    const validPassword = bcrypt.compareSync(
      request.body.oldPassword,
      user.password
    )
    if (!validPassword) {
      return respond.send(
        "Your old password was not correct! Please try again."
      )
    }

    if (request.body.newPassword !== request.body.confirmPassword) {
      return respond.send("Password and Confirm Password must match")
    }
    const hashedPassword = bcrypt.hashSync(request.body.newPassword, 12)

    user.password = hashedPassword
    await user.save()
    respond.send("Password Updated successfully.")
  } catch (error) {
    console.error("Error has occurred when updating password!", error.message)
  }
}

const auth_signout_get = async (req, res) => {
  req.session.destroy()
  res.redirect("/auth/sign-in")
}

module.exports = {
  registerUser,
  auth_signin_get,
  auth_signin_post,
  updatePassword,
  auth_signout_get,
}
