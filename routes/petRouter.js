const router = require("express").Router()
//to import controller
const petCtrl = require("../controllers/petController")

router.get("/addPet", petCtrl.get_add_pet)
router.post("/addPet", petCtrl.post_add_pet)
module.exports = router
