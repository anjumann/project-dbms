const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    ppid: {
        type: String,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
    },
    userusn: {
        type: String,
        required: true,
    },
    likes: {
        type: Array,
        default: []
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("Post", PostSchema)