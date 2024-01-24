const router = require("express").Router()
const { getAllStatus, status, getOneStatus } = require("../controllers/statusController")
const authenticate = require("../helper/authentication")

router.post("/add_status",status)
router.get("/get_all_status",authenticate,getAllStatus)
router.get("/get_one_status/:id",authenticate,getOneStatus)

module.exports = router