
const express = require("express")
const { fetchOrders, fetchSingleOrder, createOrder, } = require("../controller/order")
const { checkAuthentication, isBuyer } = require("../middleware/auth")
const router = express.Router()

router.get("", checkAuthentication, fetchOrders)
router.get("/order-id", fetchSingleOrder)
router.post("", checkAuthentication, isBuyer, createOrder)
router.post("", checkAuthentication, isBuyer, createOrder)

module.exports = router;

