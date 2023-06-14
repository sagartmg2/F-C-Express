const Order = require("../model/Order")
const Product = require("../model/Product")

const fetchOrders = (req, res) => {
    /*  link Order model & fetch from Order Model */
    res.send("list  all orders")
}

const fetchSingleOrder = (req, res) => {
    res.send("fetch single orders")
}
const createOrder = async (req, res, next) => {
    try {


        /* 

         "products":[
                    {
                        "product_id":"647f0761b4c153eb412edc70",
                        "quanity":2
                    },
                    {
                        "product_id":"647f0761b4c153eb412edc56",
                        "quanity":2
                    }
                ]


            preoducts : [
                {
                    name:"product-1",
                    price: 1000
                    quanity:2
                },
                {
                    name:"product-2",
                    price: 1000
                    quanity:2
                }

            ]

        */



        // let mapped_products = req.body.products.map(async (product) => {
        //     let dbProduct = await Product.findById(product.product_id)
        //     // console.log(dbProduct)
        //     return {
        //         name: dbProduct.name,
        //         price: dbProduct.price,
        //     }
        // })
        let mapped_products = [];

        for (product of req.body.products) {
            let dbProduct = await Product.findById(product.product_id)
            mapped_products.push(
                {
                    product_id:dbProduct._id,
                    name: dbProduct.name,
                    price: dbProduct.price,
                    quantity: product.quantity
                }
            )
        }

        // console.log(mapped_products)

        // return;


        let order = await Order.create({ products: mapped_products, created_by: req.user._id })

        res.send(order)

    } catch (err) {
        next(err)
    }
}

module.exports = {
    fetchOrders,
    fetchSingleOrder,
    createOrder
}