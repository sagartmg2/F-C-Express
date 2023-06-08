const express = require("express");

const product_routes = require("./routes/product")
const auth_routes = require("./routes/auth");
const order_routes = require("./routes/order")
const todo_routes = require("./routes/todo")

const { handleResourceNotFoun, handleServerError } = require("./middleware/error");

require("./config/database")
require('dotenv').config()

const app = express();
app.use(express.json()) // global middleware

app.use("/api/products", product_routes)
app.use("/api",auth_routes)
app.use("/api/orders", order_routes)

app.use ("/api/todos",todo_routes)


app.use(handleResourceNotFoun)
app.use(handleServerError)

app.listen(8000, () => {
    console.log("Server Started.");
})

