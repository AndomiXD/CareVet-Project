const express = require("express")
const router = express.Router()

const userCtrl = require("../controllers/vetController")
const isSignedIn = require("../middleware/is-sign-in")

router.get("/viewAppointment", userCtrl.get_view_appointment)

module.exports = router
