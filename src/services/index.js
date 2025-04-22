const { DataModel } = require("../models/Data")
const ApiError = require("../utils/ApiError")

class MainService{

    static async  addService(body){

        if(!body.title){
            throw new ApiError(400,'Title is required')
        }
        if(!body.desc){
            throw new ApiError(400,'Description is required')
        }
        if(!body.image){
            throw new ApiError(400,'Image is required')
        }
        await DataModel.create({
            title: body.title,
            desc: body.desc,
            image: body.image
        })

        // Implement logic to add service
        return {message: 'Card added successfully'}
    }

    static async  getAllService(){

        const card = await DataModel.find({})
        // Implement logic to add service
        return card
    }
    static async  getByIdService(id){

        const card = await DataModel.findById(id)
        if(!card){
            throw new ApiError(404,'Card not found')
        }
        // Implement logic to add service
        return card
    }
}

module.exports = MainService