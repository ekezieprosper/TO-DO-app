const mongoose = require("mongoose")

const subTaskSchema = new mongoose.Schema({
    subTask:{
        type:String,
        required:true
    },
    Task:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"task"
    }],
})

const taskModel = mongoose.model("sub_task",subTaskSchema)

module.exports = taskModel