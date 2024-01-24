const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    comfirmPassword:{
        type:String,
        required:true
    }, 
    task:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"task"
    }],
    blackList:{
        type:Array,
        default:[]
    }
})

const userModel = mongoose.model("user",userSchema)

module.exports = userModel