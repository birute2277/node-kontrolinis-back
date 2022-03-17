const express = require('express')
const router = express.Router()
const middle = require("../middle/validator")


const {
    register,
    login,
    createAuction,
    allAuctions,
    singleAuction,
    // userAuctions,
    // setMoney,
} = require("../controllers/main")


router.post("/register", middle.validateRegister, register)
router.post("/login", login)

router.post("/createAuction", createAuction)
router.get("/allAuctions", allAuctions)
router.get("/singleAuction/:id", singleAuction)
// router.post("/userAuctions", userAuctions)
// router.post("/bitsHistory", setMoney)


module.exports = router