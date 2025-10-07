const express = require("express")
const router = express.Router()

const userCtrl = require("../controllers/userController")
const isSignedIn = require("../middleware/is-sign-in")

router.get("/bookAppointment", isSignedIn, userCtrl.get_book_appointment)
router.post("/bookAppointment", isSignedIn, userCtrl.post_book_appointment)
router.get("/viewAppointment", userCtrl.get_view_appointment)

// Routes
router.get("/bookAppointment", isSignedIn, userCtrl.get_book_appointment)
router.post("/bookAppointment", isSignedIn, userCtrl.post_book_appointment)
router.get("/viewAppointment", userCtrl.get_view_appointment)
//edit route
router.get("/:id", userCtrl.edit_appointments)
router.put("/:id/editAppointments", userCtrl.edit_appointments)

router.get("/:id/update-profile", userCtrl.update_profile_get)
router.put("/:id", userCtrl.update_profile_put)
router.get("/:id", userCtrl.getProfile)

module.exports = router
