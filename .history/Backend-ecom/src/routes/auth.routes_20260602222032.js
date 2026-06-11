const express = require('express');
const authcontroller= require('../controllers/auth.controller')

const router=express.Router();

router.use('/register',authController.registerUser)