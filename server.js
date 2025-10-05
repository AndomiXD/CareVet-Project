//dependencies
const express = require("express")
require("dotenv").config()

const app = express()

//database configuration
const mongoose = require("./db/index")

//port configuration
const PORT = process.env.PORT ? process.env.PORT : 3000
const path = require("path")
//require middlewares
const methodOverride = require("method-override")
const morgan = require("morgan")
const session = require("express-session")

//use middlewares
app.use(express.urlencoded())
app.use(methodOverride("_method"))
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "public")))
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
const userRouter= require('./routes/userRouter')

app.use("/auth", authRouter)
app.use('/pets',petRouter)
app.use("/user", userRouter)

app.get("/", (request, respond) => {
  respond.render("index.ejs")
})

app.listen(PORT, () => {
  console.log("Listening to port 3000...")
})
