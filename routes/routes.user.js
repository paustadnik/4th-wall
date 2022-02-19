//setting up the environment of the user route
const express = require("express");
const bcrypt = require("bcrypt")
const User = require("../models/models.user")
const List = require("../models/models.list")
const { isLoggedIn } = require("../middlewares/guard");
const { response } = require("express");

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
            res.redirect("/user/login")
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

router.get('/profile', isLoggedIn, (req, res) => {
    const user = req.session.currentUser
    res.render('user/profile', { user })
})

router.get('/profile/addList', isLoggedIn, (req, res) => {
    
    res.render

})

module.exports = router