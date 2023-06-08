
const express = require("express")
const { fetchOrders, fetchSingleOrder, createOrder, } = require("../controller/order")
const { checkAuthentication } = require("../middleware/auth")
const router = express.Router()

router.get("", checkAuthentication, fetchOrders)
router.get("/order-id", fetchSingleOrder)
router.post("", createOrder)

module.exports = router;

