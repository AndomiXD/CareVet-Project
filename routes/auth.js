const router = require("express").Router()

//to import controller
const authCtrl = requier("../controllers/auth.js")

//Routes

router.get("/sign-in", authCtrl.auth_signin_get)

module.exports = router
