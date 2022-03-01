//setting up the environment of the movie route
const express = require("express")
const Movie = require('../models/models.movie')
const bcrypt = require("bcrypt")
const User = require("../models/models.user")
const List = require("../models/models.list")
const Review = require("../models/models.review")
const { isLoggedIn } = require("../middlewares/guard");
const { response } = require("express");
const { Console } = require("console");
const { ConnectionClosedEvent } = require("mongodb")
const exp = require("constants")
const { searchMovie } = require("../middlewares/search");
const router = express.Router()
const axios = require('axios')
const Window = require('window')

const window = new Window();


router.post('/search', isLoggedIn, async (req, res) => {
    const expression = req.body.searchMovie
    const searchResults = await searchMovie(expression)
    // console.log(searchResults)
    // console.log(expression)
    res.render('movie/searchResults', {searchResults})
})

router.get('/details/:id', isLoggedIn, async (req, res) => {
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

router.post('/details/:id', isLoggedIn, async (req, res) => {
    const review = new Review()
    const user = await User.findById(req.session.currentUser._id)
    const lists = await List.find({ author: req.session.currentUser._id })
    console.log(`Movie ID is ${req.body.imdbID}`)
    review.review = req.body.reviewBody
    review.author = req.session.currentUser._id
    review.movieId = req.params.id    

    try {
        await review.save()
        res.render('')
    } catch (error) {
        console.log(error)
    }
    res.render(`movie/details`, {user, lists})
})



router.post('/addToList/:id', isLoggedIn, async (req, res) => {
    const list = await List.findById(req.params.id)
    const movieId = req.body.imdbID

    list.movies.push(movieId)
    
    try {
        await list.save()
        res.redirect(`/movie/details/${movieId}`)
    } catch (error) {
        console.log(error)
    }
})


module.exports = router