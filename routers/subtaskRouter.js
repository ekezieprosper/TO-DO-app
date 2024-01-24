const router = require("express").Router()
const { subTask } = require("../controllers/subtaskController")
const authenticate = require("../helper/authentication")

router.post("/add_subtask",authenticate,subTask)

module.exports = router