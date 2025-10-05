const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const isSignedIn = require("../middleware/is-sign-in")

// Routes

router.get("/profile", userController.getProfile)

router.get("/bookAppointment", isSignedIn, userController.get_book_appointment)
router.post(
  "/bookAppointment",
  isSignedIn,
  userController.post_book_appointment
)

router.get("/viewAppointment", userController.get_view_appointment)

router.get("/:id", userController.getProfile)

module.exports = router
