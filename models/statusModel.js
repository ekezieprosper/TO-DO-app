const mongoose = require("mongoose")

const statusSchema = new mongoose.Schema({
    status:{
        type:String,
        required:true
    },
    task:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"task"
    }]
})

const statusModel = mongoose.model("status",statusSchema)

module.exports = statusModel