//setting up the environment of the review route
const express = require ("express")
const Review = require("../models/models.review")
const Movie = review("../models/models.movie")
const { isLoggedIn } = require("../midlewares/guard")

const router = express.Router()


module.exports = router