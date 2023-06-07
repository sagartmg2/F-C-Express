const express = require("express");

const product_routes = require("./routes/product")
const auth_routes = require("./routes/auth");
const order_routes = require("./routes/order")

const { handleResourceNotFoun, handleServerError } = require("./middleware/error");

require("./config/database")

const app = express();
app.use(express.json()) // global middleware

app.use("/api/products", product_routes)
app.use(auth_routes)
app.use("/api/orders",order_routes)

app.use(handleResourceNotFoun)
app.use(handleServerError)

app.listen(8000, () => {
    console.log("Server Started.");
})

