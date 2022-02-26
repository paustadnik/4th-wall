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
const axios = require('axios')


router.post('/search', async (req, res) => {
    const expression = req.body.searchMovie
    const searchResults = await searchMovie(expression)
    // console.log(searchResults)
    // console.log(expression)
    res.render('movie/searchResults', {searchResults})
})

router.get('/details/:id', async (req, res) => {
    const movieId = req.params.id
    const search = await axios.get(`https://imdb-api.com/en/API/Title/${process.env.API_KEY}/${movieId}`)
    const movieInfo = search.data
    const lists = await List.find({ author: req.session.currentUser._id })

    console.log(search.data)
    res.render('movie/details', { movieInfo, lists })
})

router.get('/addToList/:id', async (req, res) => {
    console.log(req.params.id) //list in witch we want to add the movie id
    console.log(req.body) // have to find a way to acces the movie info on the web page to put it in our database, req.body doesn't work

})


module.exports = router