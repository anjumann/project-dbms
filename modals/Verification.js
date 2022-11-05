const mongoose = require('mongoose')

const Verfication = new mongoose.Schema({

    userusn: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    email:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Verification", Verfication)

    