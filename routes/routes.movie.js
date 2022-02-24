//setting up the environment of the movie route
const express = require("express")
const Movie = require('../models/models.movie')
const bcrypt = require("bcrypt")
const User = require("../models/models.user")
const List = require("../models/models.list")
const { isLoggedIn } = require("../middlewares/guard");
const { response } = require("express");
const { Console } = require("console");
const { ConnectionClosedEvent } = require("mongodb")
const exp = require("constants")
const { searchMovie } = require("../middlewares/search");
const router = express.Router()


/* router.get(`/search`, async (req, res) => {
     const expression = req.body.searchMovie
    console.log('looooooool', expression) 
    res.render('movie/searchResults') 
}) */

router.post('/search', async (req, res) => {
    const expression = req.body.searchMovie
    const searchResults = await searchMovie(expression)
    console.log(searchResults)
    console.log(expression)
    res.render('movie/searchResults', {searchResults})
})


module.exports = router