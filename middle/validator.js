
const auctionSchema = require("../models/auctionSchema")
const userSchema = require("../models/userSchema")

module.exports = {
    validateRegister: (req, res, next) => {
        const {name, password, passwordTwo} = req.body
        console.log(req.body)
        if(name.length >10) return res.send({success: false, message: "name too short "})
        if(password !== passwordTwo) return res.send({success: false, message: "bad password"})
        if(password.length < 3) return res.send({success: false, message: "password too short"})
        // if(!validate(email)) return res.send({success: false, message: "bad email"})

        next()
    },

    // validateAuction: async (req, res, next) => {
    //     const {photo, title, }
    // }
}