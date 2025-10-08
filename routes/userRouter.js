const express = require("express")
const router = express.Router()

const userCtrl = require("../controllers/userController")
const isSignedIn = require("../middleware/is-sign-in")
const upload = require("../middleware/upload")

// Book a new appointment routes
router.get("/bookAppointment", isSignedIn, userCtrl.get_book_appointment)
router.post("/bookAppointment", isSignedIn, userCtrl.post_book_appointment)
// View appointments
router.get("/viewAppointment", userCtrl.get_view_appointment)
// Edit appointments
router.get("/appointments/:id/edit", userCtrl.get_edit_appointment)
router.put("/appointments/:id", userCtrl.put_edit_appointment)
// Delete appointments
router.delete("/appointments/:id", userCtrl.delete_appointment)
// View Profiles
router.get("/:id", userCtrl.getProfile)
// Update Profile
router.get("/:id/update-profile", userCtrl.update_profile_get)
router.put("/:id", upload.single("image"), userCtrl.update_profile_put)




module.exports = router
