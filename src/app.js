const express  = require("express")

const app = express()

const cors = require("cors")
const morgan = require("morgan")
const ApiError = require("./utils/ApiError")
const { HandleNotFound } = require("./middlewares/Handle404")

app.use(cors())
app.use(morgan("dev"));
app.use(express.json())
app.use(express.urlencoded({extended:false}))




// Routes

app.use("/api/v1",require("./routes"))

app.use("*",(req,res)=>{
    throw new ApiError(404,"Not Found")
})

app.use(HandleNotFound)
module.exports = app