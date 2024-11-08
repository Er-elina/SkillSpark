
const express = require("express");
const { userRegister, userLogin } = require("../controllers/userController");
const router = express.Router();
// routes for user registrations

router.post('/register', userRegister);

// routes for user login

router.post('/login',userLogin)

module.exports = router;