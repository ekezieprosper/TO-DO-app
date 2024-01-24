const taskModel = require("../models/taskModel")
const subtaskModel = require("../models/subtaskModel")

exports.subTask = async(req,res)=>{
    try {

        // get the requirement
        const {id,subTask} = req.body
        // find the task with the id
        const task = await taskModel.findById(id)
        if (!task) {
            return res.status(404).json({
                error:"task not found"
            })
        }
        // get the requirement and create the subTask
        const newSubTask = new subtaskModel({subTask})
        // push the subtask to the task and save
        task.subTask.push(newSubTask._id)
        await task.save()
        // attach the task to the subtask and save
        newSubTask.Task = task._id
        await newSubTask.save()

        // throw a success message
        res.status(200).json({
            message:"subtask created",
            data:newSubTask
        })

    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}