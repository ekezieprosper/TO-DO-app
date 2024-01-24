const userModel = require("../models/userModel")
require("dotenv").config()
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const validation = require("../Utils/validation")

exports.registerUser = async(req,res)=>{
    try {

        // get the requirement for the registration
        const {firstName, lastName, email, phoneNumber, password, comfirmPassword}  = req.body
        // check if theemai already exist
        const emailExist = await userModel.findOne({email})
        if (emailExist) {
            return res.status(400).json({
                error: "email already in use by another user"
            })
        }
        // comfirm if the password corresponds
        if(comfirmPassword !== password){
            return res.status(400).json({
                error:"password does not match"
            })
        }
        // hash both password
        const saltPass = bcrypt.genSaltSync(10)
        const hashPass = bcrypt.hashSync(password&&comfirmPassword,saltPass)
        // register the user
        const register = await userModel.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            password:hashPass,
            comfirmPassword:hashPass
        })
        // throw a failure message
        if(!register){
            return res.status(400).json({
                error:"error creating your account"
            })
        }
        // success message
        res.status(200).json({
            message:"successfully created an account",
            data: register 
        })

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}

exports.signIn = async(req,res)=>{
    try {

        // get the requirement
        const {email,password} = req.body
        // check if the user is existing on the platform
        const userExist = await userModel.findOne({email})
        if(!userExist){
            return res.status(404).json({
                error:"email does not exist"
            })
        }
        // check for password
        const checkPassword = bcrypt.compareSync(password,userExist.password)
        if(!checkPassword){
            return res.status(400).json({
                error:"incorrect password"
            })
        }
        // generate a token for the user 
        const token = jwt.sign({
            userId:userExist._id,
            email:userExist.email,
        },process.env.JWT_KEY,{expiresIn:"1d"})

        // throw a success message
        res.status(200).json({
            message:'successfully logged in',
            data:token
        })

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}

exports.signOut = async(req,res)=>{
    try {

        // get the users token
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(400).json({
                error:"Authorization failed: token not found"
            })
        }
        // terminate the token
        const terminateToken = jwt.verify(token,process.env.JWT_KEY)
        terminateToken.exp = 1
        // show a success response
        res.status(200).json({
            message:"successfully logged out"
        })

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}

exports.allUsers= async(req,res)=>{
    try {

        // get all the user
        const allUsers = await userModel.find().populate("task")
        if (!allUsers) {
            return res.status(404).json({
                error:"no user found"
            })
        }
        // return all available user
        res.status(200).json({
            message:"here are the user available",
            data:allUsers
        })

    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}