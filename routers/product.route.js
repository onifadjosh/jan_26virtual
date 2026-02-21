const express= require('express')
const { addProduct, fetchProducts } = require('../controllers/product.controller')
const { verifyUser } = require('../controllers/user.controller')

const router= express.Router()

router.post("/addProduct",verifyUser ,addProduct)
router.get("/getProducts", verifyUser, fetchProducts)

module.exports= router