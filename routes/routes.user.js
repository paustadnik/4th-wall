//setting up the environment of the user route
const express = require("express");
const bcrypt = require("bcrypt")
const User = require("../models/models.user")
const List = require("../models/models.list")
const { isLoggedIn } = require("../midlewares/guard")

const router = express.Router()


module.exports = router