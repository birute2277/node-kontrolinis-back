const express = require('express')
const router = express.Router()
const middle = require("../middle/validator")


const {
    register,
    login,
    createAuction,
    allAuctions,
    singleAuction,
    userAuctions,
    mySingleAuction,
    // setMoney,
} = require("../controllers/main")


router.post("/register", middle.validateRegister, register)
router.post("/login", login)

router.post("/createAuction", createAuction)
router.get("/allAuctions", allAuctions)
router.get("/singleAuction/:id", singleAuction)
router.get("/userAuctions", userAuctions)
// router.post("/bidHistory", setMoney)


module.exports = router