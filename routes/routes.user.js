//setting up the environment of the user route
const express = require("express");
const bcrypt = require("bcrypt")
const User = require("../models/models.user")
const List = require("../models/models.list")
const { isLoggedIn } = require("../middlewares/guard");
const { response } = require("express");
const { Console } = require("console");

const router = express.Router()

router.get("/signup", (req, res) => {
    res.render("user/signup")
})

router.post("/signup", async (req, res) => {
    const user = new User()
    
    /* console.log(req.body.password)
    console.log(req.body.passwordVerification) */
    if(req.body.password !== req.body.passwordVerification) {
        /* console.log('password dont match') */
    } else {
        user.username = req.body.username
        user.email = req.body.email
        const hash = await bcrypt.hash(req.body.password, 10)
        user.password = hash
        user.dateOfBirth = req.body.dob

        try {
            await user.save()
            const watched = new List()
            const watchlist = new List()
            watched.name = 'Watched'
            watched.author = await user.id

            watchlist.name = 'Watchlist'
            watchlist.author = await user.id

            try {
                await watched.save()
                await watchlist.save()
                res.redirect('/user/login')
            } catch (error) {
                console.log(error)
                res.redirect('/user/login')
            }
            
        } catch (error) {
            console.log(error)
            res.redirect("/user/signup")
        }
    }
})

router.get("/login", (req, res) => {
    res.render("user/login")
})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({email : req.body.email})
        const pwCorrect = await bcrypt.compare(req.body.password, user.password)
        if(pwCorrect) {
            req.session.currentUser = user
            res.redirect("/user/profile")
        } else res.redirect("/user/login")
    } catch (error) {
        console.log(error)
        res.redirect("/user/login")
    }
})

router.get('/profile', isLoggedIn, async (req, res) => {
    const user = req.session.currentUser
    const lists = await List.find({ author: req.session.currentUser._id })
    const list = await List.findById(req.params.id);
    const recentlyWatched = await List.find({name: 'Watched'})  //PARKED HERE

    res.render('user/profile', { user, lists, list })
})

router.get('/profile/addList', isLoggedIn, (req, res) => {
    res.render('/user/profile', {user})
})

router.post('/profile/addList', isLoggedIn, async (req, res) => {
    const list = new List()
    list.name = req.body.listName
    list.author = req.session.currentUser._id

    try {
        await list.save()
        res.redirect('/user/lists')
    } catch (error) {
        console.log(error)
        res.redirect('/user/profile')
    }
})

router.get('/lists', isLoggedIn, async (req, res) => {
    const lists = await List.find({ author: req.session.currentUser._id })
    res.render('user/lists', {lists})
})

router.get('/list/:id', isLoggedIn, async (req, res) => {
    const list = await List.findById(req.params.id);
    res.render('user/viewList', {list})
})

router.get('/logout', isLoggedIn, (req, res) => {
    req.session.destroy()
    res.redirect('/user/login')
})



module.exports = router