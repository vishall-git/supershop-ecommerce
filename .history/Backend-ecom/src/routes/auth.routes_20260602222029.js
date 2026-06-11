const express = require('express');
const authcontrol= require('../controllers/auth.controller')

const router=express.Router();

router.use('/register',authController.registerUser)