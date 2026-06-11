const express = require('express');
const authController= require('../controllers/auth.controller')

const router=express.Router();

router.('/register',authController.registerUser)
router.('/login',authController.loginUser)

module.exports=router;