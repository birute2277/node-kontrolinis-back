const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    money: {
        type: Number,
        required: true
    },
    moneyLeft: {
        type: Number,
        required: true
    },
    bidHistory: {
        type: Array,
        required: true
    }

})

module.exports = mongoose.model("userDB", userSchema)