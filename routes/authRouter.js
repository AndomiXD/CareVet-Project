const router = require("express").Router()
//to import controller
const authCtrl = require("../controllers/authController")

//Routes
router.get("/home", authCtrl.auth_home_get)

router.get("/sign-up", (request, respond) => {
  respond.render("./auth/sign-up.ejs")
})
router.post("/sign-up", authCtrl.registerUser)

router.get("/sign-out", authCtrl.auth_signout_get)

router.get("/sign-in", authCtrl.auth_signin_get)
router.post("/sign-in", authCtrl.auth_signin_post)

router.put("/:id", authCtrl.updatePassword)

module.exports = router
