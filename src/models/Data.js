const mongoose = require("mongoose")
const Schema = new mongoose.Schema({
        title:String,
        desc:String,
        image:String
},{
    timestamps:true,
    versionKey:false
})

exports.DataModel = mongoose.model("Task",Schema)