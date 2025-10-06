const router = require("express").Router()
const Pet = require("../models/Pet.js")
//to import controller
const petCtrl = require("../controllers/petController")

router.get("/:id/edit", async (req, res) => {
  const pet = await Pet.findById(req.params.id)
  res.render("pets/editPet.ejs", { pet })
})

router.get("/addPet", petCtrl.get_add_pet)
router.post("/addPet", petCtrl.post_add_pet)
router.get("/all", petCtrl.getAllPets)

router.get("/:id", petCtrl.getPetById)
router.put("/:id", petCtrl.updatePetById)

router.delete("/:id", petCtrl.deletePetById)

module.exports = router
