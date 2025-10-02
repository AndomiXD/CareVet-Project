const router = require("express").Router()

//to import controller
const authCtrl = require("../controllers/authController")

//Routes
router.get("/sign-in", authCtrl.auth_signin_get)

router.post("/sign-in", authCtrl.auth_siginin_post)
module.exports = router
