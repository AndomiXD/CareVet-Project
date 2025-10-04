const Pet = require("../models/Pet")

exports.get_add_pet = (req, res) => {
  res.render("pets/addPet.ejs")
}
exports.post_add_pet = async (req, res) => {
  try {
    const { petName, species, breed, petPhoto } = req.body
    const ownerId = req.session.user._id

    const newPet = new Pet({
      petName,
      species,
      breed,
      petPhoto,
      owner: ownerId,
    })
    await newPet.save()
    res.redirect("/auth/home")
  } catch (error) {
    console.error(error)
    res.status(500).send("Error adding pet")
  }
}
