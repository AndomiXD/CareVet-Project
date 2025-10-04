const express = require("express")
require("dotenv").config()
const app = express()
const logger = require("morgan")
const session = require("express-session")
const db = require("./db")

app.use(logger("dev"))
const methodOverride = require("method-override")
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)
//Require Routes
const authRouter = require("./routes/authRouter")
const petRouter= require('./routes/petRouter')

app.use("/auth", authRouter)
app.use('/pets',petRouter)

app.get("/", (request, respond) => {
  respond.render("index.ejs")
})

const PORT = process.env.PORT ? process.env.PORT : 3000

app.listen(PORT, () => {
  console.log("Listening to port 3000...")
})
