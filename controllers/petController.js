const Pet = require("../models/Pet")

exports.post_add_pet = async (req, res) => {
  try {
    const petInDatabase = await Pet.findById(req.body._id)
    const ownerId = req.session.user._id

    if (petInDatabase) {
      return res.send("Pet already exists")
    }

    const pet = await Pet.create({
      petName: req.body.petName,
      species: req.body.species,
      breed: req.body.breed,
      // petPhoto: req.body.photo,
      owner: ownerId,
    })
    res.redirect("/pets/all")
  } catch (error) {
    console.error(error)
    res.send("Error adding pet" + error.message)
  }
}

exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find({ owner: req.session.user._id })

    res.render("pets/all.ejs", { pets })
  } catch (error) {
    console.error("An error has occurred getting all pets!", error.message)
  }
}

exports.getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id)

    res.render("pets/show.ejs", { user: req.session.user, pet })
  } catch (error) {
    console.error("An error has occurred getting a pet!", error.message)
  }
}

exports.updatePetById = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })

    res.redirect(`/pets/${pet._id}`)
  } catch (error) {
    console.error("An error has occurred updating a pet!", error.message)
  }
}
exports.get_add_pet = (req, res) => {
  res.render("pets/addPet.ejs")
}

exports.deletePetById = async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id)

    res.redirect("/pets/all")
  } catch (error) {
    console.error("An error has occurred deleting a pet!", error.message)
  }
}
