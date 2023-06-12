const express = require("express")
const { checkAuthentication, isSeller, isBuyer } = require("../middleware/auth")

const { get, create, fetchSingleProduct, updateReview, updateProduct } = require("../controller/product")

const router = express.Router()


router.get("", get) // GET: /api/products
router.get("/:id", fetchSingleProduct)  // GET: /api/products/product-id
router.post("", checkAuthentication, isSeller, create)  // POST: /api/products
router.put("/:id", checkAuthentication, isSeller, updateProduct)  // PUT: /api/products
router.put("/:id/reviews", checkAuthentication, isBuyer, updateReview)  // PUT: /api/products/product-id/reviews

module.exports = router