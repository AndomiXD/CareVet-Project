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
    res.send("Pet has been added:" + pet.petName)
  } catch (error) {
    console.error(error)
    res.status(500).send("Error adding pet" + error.message)
  }
}

exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find({})

    res.render("pets/all.ejs", { pets })
  } catch (error) {
    console.error("An error has occurred getting all pets!", error.message)
  }
}

exports.getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id)

    res.render("./pets/show.ejs", { user: req.session.user, pet })
  } catch (error) {
    console.error("An error has occurred getting a pet!", error.message)
  }
}
exports.get_add_pet = (req, res) => {
  res.render("pets/addPet.ejs")
}
