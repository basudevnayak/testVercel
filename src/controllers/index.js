const MainService = require("../services")
const CatchAsync = require("../utils/CatchAsync")

class MainController {

    static addController= CatchAsync(async(req,res)=>{
        const res_obj = await MainService.addService(req.body)
        res.status(201).json(res_obj)
    })

    static getAllController= CatchAsync(async(req,res)=>{
        const res_obj = await MainService.getAllService()
        res.status(200).json(res_obj)
    })

    static getByIdController= CatchAsync(async(req,res)=>{
        const res_obj = await MainService.getByIdService(req.params.id)
        res.status(200).json(res_obj)
    })
    
}
module.exports = MainController