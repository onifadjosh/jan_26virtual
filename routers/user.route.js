const express= require('express')
const { createUser, getUsers, deleteUser, login, verifyUser } = require('../controllers/user.controller')

const router = express.Router()

router.post('/signUp', createUser )
router.get('/getUsers',verifyUser,  getUsers)
router.delete("/deleteUser/:id", deleteUser)
router.post("/login", login)

module.exports= router