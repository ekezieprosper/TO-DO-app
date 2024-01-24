const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    subTask:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"sub_task"
    }],
    status:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"status"
    }
})

const taskModel = mongoose.model("task",taskSchema)

module.exports = taskModel