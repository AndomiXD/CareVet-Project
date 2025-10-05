const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

// Routes

router.get("/profile", userController.getProfile)

router.get("/bookAppointment", userController.get_book_appointment)
router.post("/bookAppointment", userController.post_book_appointment)

router.get("/:id", userController.getProfile)


module.exports = router
