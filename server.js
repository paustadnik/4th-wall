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

app.get('/', (req, res) => {
    res.send('hello')
})


app.listen(4000)