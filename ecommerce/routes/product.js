const express = require("express")
const { checkAuthentication, isSeller } = require("../middleware/auth")

const { get, create, fetchSingleProduct } = require("../controller/product")

const router = express.Router()


router.get("", get) // GET: /api/products
router.get("/:id", fetchSingleProduct)  // GET: /api/products/product-id
router.post("", checkAuthentication, isSeller, create)  // POST: /api/products

module.exports = router