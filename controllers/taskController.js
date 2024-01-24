const taskModel = require('../models/taskModel')
const userModel = require("../models/userModel")
const statusModel = require('../models/statusModel')
const subtaskModel = require("../models/subtaskModel")

exports.addTask = async(req,res)=>{
    try {

        // get the requirement
        const {statusId,title,description} = req.body
        // get the users id
        const id = req.user.userId
        // find the user
        const user = await userModel.findById(id)
        // get the status id
        const status = await statusModel.findById(statusId)
        // add the task
        const newTask = new taskModel({
            title,
            desc:description
        })
        // push the task to the user and save
        user.task.push(newTask._id)
        await user.save()
        // attach the user to the task
        newTask.user = user._id
        await newTask.save()
        // push the task to it's status
        status.task.push(newTask._id)
        await status.save()
        // attach the status to the task and save
        newTask.status = status._id
        await newTask.save()

        res.status(200).json({
            message:"task created",
            data: newTask
        })

    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
} 
// extract relevant information for each task
// const extractedTasks = allTask.map(task => ({
//     title: task.title,
//     description: task.desc,
//     Name: task.user.firstName,
//     subTask: task.subTask.length > 0 ? task.subTask[0].subTask : null,
//     status: task.status.status
// }))

exports.allTask= async(req,res)=>{
    try {

        // get all the task
        const allTask = await taskModel.find().populate("user").populate("status").populate("subTask")
        if (!allTask) {
            return res.status(404).json({
                error:"no task found"
            })
        }

        // extract relevant information for each task
        const extractedTasks = allTask.map(task => ({
            title: task.title,
            description: task.desc,
            Name: task.user.firstName,
            subTask: task.subTask.map(sub => sub.subTask),
            status: task.status.status
        }))

        // return all available task
        res.status(200).json({
            message:"here are the task available",
            data:extractedTasks
        })

    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}

exports.getOneTask = async(req,res)=>{
    try {

        // get the status id
        const id = req.params.id
        // get all the status
        const task = await taskModel.findById(id).populate("user").populate("status").populate("subTask")
        if (!task) {
            return res.status(404).json({
                error:"no task found"
            })
        }
         // extract relevant information for the task
        const extractedTasks = {
            title: task.title,
            description: task.desc,
            Name: `${task.user.firstName} ${task.user.lastName}`,
            subTask: task.subTask.map(sub => sub.subTask),
            status: task.status.status
        }
        // return all available status
        res.status(200).json({
            message:"here are the task available",
            data:extractedTasks
        })

    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}

exports.updateTask = async(req,res)=>{
    try {

        // get the post id
        const id = req.params.id
        if(!id){
            return res.status(400).json({
                error:'you need to pass an id in the params'
            })
        }

        // get the new update from the body
        const {title,description} = req.body

        const data = {
            title:title,
            desc:description
        }

        // find the task with the id and update
        const updates = await taskModel.findByIdAndUpdate(id,data,{new:true})
        if (!updates) {
            return res.status(404).json({
                error:"task not found"
            })
        }

        res.status(200).json({
            message: "task updated successfuly",
            data: updates
        })

    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}

exports.deleteTask = async(req,res)=>{
    try {

        // get the post id
        const id = req.params.id
        if(!id){
            return res.status(400).json({
                error:'you need to pass an id in the params'
            })
        }

        // find the post with the id and delete
        const deleteTask = await taskModel.findByIdAndDelete(id)
        if (!deleteTask) {
            return res.status(400).json({
                error:"could not delete this task"
            })
        }

        // delete the post comment
        await subtaskModel.deleteMany({Task:id})

        // throw a success message
        res.status(200).json({
            message: "task deleted successfuly"
        })


    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}