
const express = require("express")
const { fetchOrders, fetchSingleOrder, createOrder, } = require("../controller/order")
const { checkAuthentication, isBuyer } = require("../middleware/auth")
const router = express.Router()

router.get("", checkAuthentication, isBuyer, fetchOrders)
router.get("/order-id",checkAuthentication, isBuyer, fetchSingleOrder)
router.post("", checkAuthentication, isBuyer, createOrder)

module.exports = router;

