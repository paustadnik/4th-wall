const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const store = require("connect-mongo");
const dotenv = require("dotenv");
const { isLoggedIn } = require("./middlewares/guard")
const axios = require("axios").default;


require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL);

const app = express();

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.urlencoded( { extended: false }))
app.use(express.static('public'))
app.set('trust proxy', 1)

app.use(
    session({
      secret: process.env.SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 1200000,
      },
      store: store.create({
        mongoUrl: process.env.MONGODB_URL,
      }),
    })
  );

app.use((req, res, next) => {
    res.locals.currentUser = req.session.currentUser
    next()
  })
  

// root route
app.get('/', (req, res) => {
    res.render('home')
})

// route for user
const routeUser = require("./routes/routes.user");
app.use("/user", routeUser);

// route for movie
const routeMovie = require("./routes/routes.movie");
app.use("/movie", routeMovie);

// route for review
const routeReview = require("./routes/routes.review");
const { estimatedDocumentCount } = require("./models/models.user");
app.use("/review", routeReview);




app.listen(process.env.PORT)