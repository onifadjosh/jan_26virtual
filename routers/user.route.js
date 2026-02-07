const express= require('express')
const { createUser, getUsers } = require('../controllers/user.controller')

const router = express.Router()

router.post('/signUp', createUser )
router.get('/getUsers', getUsers)

module.exports= router