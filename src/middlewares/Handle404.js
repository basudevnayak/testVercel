const ApiError = require("../utils/ApiError")

exports.HandleNotFound = async(err,req,res,next)=>{
    let error_obj = {
        status: err.status || 500,
        message: err.message || "Internal Server Error",
        stack: err.stack
    }
    if (err instanceof ApiError){
        error_obj['status'] =err.statusCode
        error_obj['message'] =err.message
        error_obj['stack'] =err.stack
    }
    res.status(error_obj.status).json(error_obj)
}