const express = require("express")
const router = express.Router()
const userCtrl = require("../controllers/userController")

// Routes
router.get("/:id", userCtrl.getProfile)
router.get("/:id/update-profile", userCtrl.update_profile_get)
router.put("/:id", userCtrl.update_profile_put)

module.exports = router
