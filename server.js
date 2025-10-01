const express = require("express")
require("dotenv").config()
const app = express()
const logger = require("morgan")
const PORT = process.env.PORT ? process.env.PORT : 3000
// const session = require("express-session")

app.use(logger("dev"))

app.use("/", (request, respond) => {
  respond.send("Root Route Working")
})

app.listen(PORT, () => {
  console.log("Listening to port 3000...")
})
