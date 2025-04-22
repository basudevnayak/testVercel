const express= require("express")
const MainController = require("../controllers")
const router = express.Router()


router.route("/add")
.post(MainController.addController)

router.route("/get-all")
.get(MainController.getAllController)


router.route("/get/:id")
.get(MainController.getByIdController)


module.exports = router