const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    otp:{
        type:String,
        default:null
    },
    otpExpiry:{
        type:Date,
        default:null
    }

})
const userModel = mongoose.model('user', userSchema)
module.exports = userModel;