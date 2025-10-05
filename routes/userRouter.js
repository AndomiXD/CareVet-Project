const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

// Routes
router.get("/:id", userController.getProfile)

module.exports = router
