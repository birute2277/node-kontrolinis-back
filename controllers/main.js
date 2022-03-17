const userDb = require("../models/userSchema")
const auctionDb = require("../models/auctionSchema")
const crypt = require("bcrypt")

module.exports = {
    register: async (req, res) => {

        const {name, password} = req.body
        console.log(true)
        const userExists = await userDb.findOne({name})
        if (userExists) return res.send({success: false, message: "name is taken"})

        const hash = await crypt.hash(password, 10)

        const user = new userDb()
        user.name = name
        user.password = hash
        user.money = 1000
        user.moneyLeft = 0
        user.bidHistory = []
          await user.save()
        res.send({success: true, message: "user register"})

    },
    login: async (req, res) => {
        const {name, password} = req.body
    console.log(req.body)
        const userExists = await userDb.findOne({name})
        console.log("useris? ", userExists)
        if (!userExists) return res.send({success: false, message: "bad credentials"})

        const passMatch = await crypt.compare(password, userExists.password)
    console.log(passMatch)
        if (passMatch) {
            req.session.user = userExists
            return res.send({success: true, userExists})
        }

        res.send({success: false, message: "bad credentials"})
    },

    createAuction: async (req, res) => {
        // const data = req.body
        const {title, currentPrice,  photo: photo} = req.body
        const {user} = req.session
        console.log("create something ",req.body , user)
        if(user) {
            const auction = new auctionDb()
            auction.name = user.name
            auction.photo = photo
            auction.title = title
            auction.timeCreated = Date.now()
            auction.currentPrice = currentPrice
            auction.startPrice = currentPrice
            auction.active = true

            await auction.save()

            return res.send({success: true})
        }

        res.send({success: false})
    },
    allAuctions: async (req, res) => {
        const {user} = req.session
        console.log("Vartotojas ",user)
        if(user) {
            const posts = await auctionDb.find({})
            return res.send({success: true, posts})
        }

        res.send({success: false, posts: []})

    },
    singleAuction: async (req, res) => {
        const {user} = req.session
        const {id} = req.params
        console.log(user, id)

        if(user) {
            const {id: _id} = req.params

            console.log(_id)

            const auction = await auctionDb.findOne({_id})
            return res.send({success: true, auction})
        }

        res.send({success: false, message: id})

    },

    // userAuctions: async (req, res) => {
    //     const {user} = req.session
    //
    //     if (user) {
    //         const userInfo = await userDb.findOne({name: user.name})
    //         return res.send({success: true, message: "", info: userInfo})
    //     }
    //
    //     res.send({success: false, message: "you are not logged in"})
    // },
    // updatePhoto: async (req, res) => {
    //     const {link} = req.body
    //     const {user} = req.session
    //
    //     if (user) {
    //         await userDb.findOneAndUpdate({email: user.email}, {$set: {image: link}})
    //         return res.send({success: true, message: ""})
    //     }
    //
    //     res.send({success: false, message: "you are not logged in"})
    // },


    // setMoney: async (req, res) => {
    //     const {comment, postId: _id} = req.body
    //     const {user} = req.session
    //
    //     if(user) {
    //         const latestUser = await userDb.findOne({email: user.email})
    //
    //         const item = {
    //             comment,
    //             user: user.email,
    //             time: Date.now(),
    //             userPhoto: latestUser.image
    //         }
    //
    //         const newPost = await postDb.findOneAndUpdate({_id}, {$push: {comments: item}}, {new: true})
    //
    //         return res.send({success: true, post: newPost})
    //     }
    //
    //     res.send({success: false, post: null})
    // },


}

