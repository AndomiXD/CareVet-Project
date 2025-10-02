const express = require("express")
require("dotenv").config()
const app = express()
const logger = require("morgan")
const methodOverride = require("method-override")
const session = require("express-session")
const db = require("./db")
require("dotenv").config()

const PORT = process.env.PORT ? process.env.PORT : 3000

app.use(logger("dev"))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)

app.use("/", (request, respond) => {
  respond.send("Root Route Working")
})

app.listen(PORT, () => {
  console.log("Listening to port 3000...")
})
