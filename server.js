const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const store = require("connect-mongo");
const dotenv = require("dotenv");

mongoose.connect("mongodb://localhost/4h-wall");

const app = express();

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.urlencoded( { extended: false }))
app.use(express.static('public'))

app.use(
    session({
      secret: "helloworld",
      resave: true,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 1200000,
      },
      store: store.create({
        mongoUrl: "mongodb://localhost/4th-wall",
      }),
    })
  );

// root route
app.get('/', (req, res) => {
    res.send('hello')
})

// route for user
const routeUser = require("./routes/routes.user");
app.use("/user", routeUser);

// route for movie
const routeMovie = require("./routes/routes.movie");
app.use("/movie", routeMovie);

// route for review
const routeReview = require("./routes/routes.review");
app.use("/review", routeReview);


app.listen(4000)