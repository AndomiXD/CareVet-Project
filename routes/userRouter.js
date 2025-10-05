const express = require("express")
const router = express.Router()

const userCtrl = require("../controllers/userController")
const isSignedIn = require("../middleware/is-sign-in")

// Routes
router.get("/:id", userCtrl.getProfile)
router.get("/:id/update-profile", userCtrl.update_profile_get)
router.put("/:id", userCtrl.update_profile_put)

router.get("/bookAppointment", isSignedIn, userCtrl.get_book_appointment)
router.post(
  "/bookAppointment",
  isSignedIn,
  userCtrl.post_book_appointment
)


module.exports = router
