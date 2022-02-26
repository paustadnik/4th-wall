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
const window = require('window')


router.post('/search', async (req, res) => {
    const expression = req.body.searchMovie
    const searchResults = await searchMovie(expression)
    // console.log(searchResults)
    // console.log(expression)
    res.render('movie/searchResults', {searchResults})
})

router.get('/details/:id', async (req, res) => {
    const movie = new Movie()
    const movieId = req.params.id
    const search = await axios.get(`https://imdb-api.com/en/API/Title/${process.env.API_KEY}/${movieId}`)
    const movieInfo = search.data
    const lists = await List.find({ author: req.session.currentUser._id })

    movie.imdbId = movieInfo.id
    movie.title = movieInfo.title
    movie.genre = movieInfo.genres
    movie.studio = movieInfo.companies
    movie.director = movieInfo.directors
    movie.screenplay = movieInfo.writers
    movie.cast = movieInfo.stars
    movie.synopsis = movieInfo.plot
    movie.img = movieInfo.image


    try {
        const movieCheck = await Movie.findOne({ imdbId: movieInfo.id})
        if (!movieCheck) {
            movie.save()
        } 

    } catch (error) {
        console.log(error)
    }

    //console.log(search.data)
    res.render('movie/details', { movieInfo, lists })
})

// router.get('/addToList/:id', async (req, res) => {
//     res.
// })

router.post('/addToList/:id', async (req, res) => {
    const list = await List.findById(req.params.id)
    const movieId = req.body.imdbID
/*     const movie = await Movie.findOne({imdbId : movieId})
    console.log(movieId)
    console.log(req.params.id) */ 
    list.movies.push(movieId)
    //list in witch we want to add the movie id
    //console.log(req.params) // have to find a way to acces the movie info on the web page to put it in our database, req.body doesn't work
    
    try {
        await list.save()
        res.redirect(`/movie/details/${movieId}`)
    } catch (error) {
        console.log(error)
    }
    


})


module.exports = router