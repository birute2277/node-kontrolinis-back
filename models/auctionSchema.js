const mongoose = require('mongoose')
const Schema = mongoose.Schema

const auctionSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    photo: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    timeCreated: {
        type: Date,
        required: false
    },
    startPrice: {
        type: Number,
        required: true
    },
    currentPrice: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    bids: {
        type: [
            {
                "userName": String,
                "bid": Number,
                "time": Number
            }
       ],

    },

})

module.exports = mongoose.model("auctionDb", auctionSchema)