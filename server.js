const express = require("express")

const userRouter = require("./routers/userRouter")
const taskRouter = require("./routers/taskRouter")
const subtaskRouter = require("./routers/subtaskRouter")


const app = express()
app.use(express.json())

app.use("/api/v1",userRouter)
app.use("/api/v1",taskRouter)
app.use("/api/v1",subtaskRouter)


const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const port = process.env.port
const dblink = process.env.dblink

mongoose.connect(dblink).then(()=>{
console.log("database connected successfully")
app.listen(port,()=>{
    console.log(`server is active on port: ${port}`);
})
}).catch((error)=>{
    console.log(error.message);
})