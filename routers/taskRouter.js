const router = require("express").Router()
const { addTask, allTask, getOneTask, updateTask, deleteTask } = require("../controllers/taskController")
const authenticate = require("../helper/authentication")

router.post("/add_task",authenticate,addTask)
router.get("/getalltask",authenticate,allTask)
router.get("/getonetask/:id",authenticate,getOneTask)
router.put("/updatetask/:id",authenticate,updateTask)
router.delete("/deletetask/:id",authenticate,deleteTask)

module.exports = router