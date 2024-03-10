const express = require("express")
const router= express.Router()
const profileController= require("../controller/profileController")
const authMid= require("../middleware/userVarify")
const TodoController= require('../controller/TodoListController')

router.post("/createProfile",profileController.createProfile)

router.post("/userLogin",profileController.userLogin)
router.get("/readProfile",authMid,profileController.readProfile)
router.post("/updateProfile",authMid,profileController.updateProfile)

//todo
router.post("/createTodo",authMid,TodoController.createTodo)
router.get("/readTodo",authMid,TodoController.readTodo)
router.post("/updateTodo",authMid,TodoController.updateTodo)
router.post("/deleteTodo",authMid,TodoController.deleteTodo)








module.exports=router
