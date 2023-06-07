const fetchOrders = (req, res) => {
    /*  link Order model & fetch from Order Model */
    res.send("list  all orders")
}

const fetchSingleOrder = (req, res) => {
    res.send("fetch single orders")
}
const createOrder = (req, res) => {
    res.send("fetch single orders")
}

module.exports = {
    fetchOrders,
    fetchSingleOrder,
    createOrder
}