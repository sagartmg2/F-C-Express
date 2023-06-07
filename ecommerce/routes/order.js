
const express = require("express")
const { fetchOrders, fetchSingleOrder, createOrder, } = require("../controller/order")
const router = express.Router()

router.get("", fetchOrders)
router.get("/order-id", fetchSingleOrder)
router.post("", createOrder)

module.exports = router;

