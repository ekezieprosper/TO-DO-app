const router = require("express").Router()
const {registerUser, signIn, signOut, allUsers} = require("../controllers/userController")
const authenticate = require("../helper/authentication")
const myValidation = require("../Utils/validation")

router.post("/register",myValidation,registerUser)
router.post("/login",signIn)
router.post("/logout",authenticate,signOut)
router.get("/allusers",allUsers)

module.exports = router