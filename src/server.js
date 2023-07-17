const express = require("express")
const cors = require("cors")
const api = require("./routes/index")
const fileUpload = require("express-fileupload")
// const helmet = require("helmet");
const rateLimit = require('express-rate-limit')
const error_handler = require("./utils/errorHandler");
const { errorMiddleware } = require("./middlewares/custom_error/error");
const path = require("path")

const app = express()

// Limiter

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000,
	max: 10000,
	standardHeaders: true,
	legacyHeaders: false,
})
app.use(limiter)

// Parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Static folders
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// upload middleware
app.use(fileUpload({
  limits: { fileSize: 8 * 30 * 1024 * 1024 },
  abortOnLimit: true,
}))
app.use(errorMiddleware)

// Cors middleware
app.use(cors({ origin: "*" }))

// Routes
app.use("/api", api)
app.use(error_handler)


module.exports = app