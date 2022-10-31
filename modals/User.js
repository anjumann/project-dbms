const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    uuid: {
        type: String,
        unique: true,
        required: true
    },
    name: {
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
    usn: {
        type: String,
        required: true,
        unique: true
    },
    isTeacher: {
        type: Boolean,
        default: false
    },
    branch:{
        type:String,
    },
    semester: {
        type: String
    },
    section: {
        type: String
    },
    profilepic:{
        type:String,
        default:""
    },
    instagram: {
        type: String
    },
    github: {
        type: String
    },
    linkedin: {
        type: String
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("Student", UserSchema)