const statusModel = require("../models/statusModel")

exports.status = async(req,res)=>{
    try {

        // add the status coming from the body
        const status = await statusModel.create(req.body)

        res.status(201).json({
            message:"status created",
            data:status
        })

    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}

exports.getAllStatus = async(req,res)=>{
    try {

        // get all the status
        const allStatus = await statusModel.find().populate("task")
        if (!allStatus) {
            return res.status(404).json({
                error:"no status found"
            })
        }
        // return all available status
        res.status(200).json({
            message:"here are the status available",
            data: allStatus
        })

    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}

exports.getOneStatus = async(req,res)=>{
    try {

        // get the status id
        const id = req.params.id
        // get all the status
        const allStatus = await statusModel.findById(id).populate("task")
        if (!allStatus) {
            return res.status(404).json({
                error:"no status found"
            })
        }
        // return all available status
        res.status(200).json({
            message:"here are the status available",
            data:allStatus
        })

    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}