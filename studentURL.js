const express= require("express")
const router= express.Router()
const studentController=require("../controllers/studentLogic")


//To save new records
router.get("/addUser",studentController.addUser)
router.post("/addUser",studentController.save)

//edit record
router.get("/editUser/:Id",studentController.editUser)
router.post("/editUser/:Id",studentController.edit)

//delete record
router.get("/deleteUser/:Id",studentController.deleteUser)


//To view curreny records
router.use("/",studentController.view)


module.exports=router
