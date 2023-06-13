const express = require("express");
const fileUpload = require("express-fileupload")

const product_routes = require("./routes/product")
const auth_routes = require("./routes/auth");
const order_routes = require("./routes/order")
const todo_routes = require("./routes/todo")

const { handleResourceNotFoun, handleServerError } = require("./middleware/error");

require("./config/database")
require('dotenv').config()

const app = express();
app.use(express.json()) // global middleware // runs for every api routes  // sets up req.body
app.use(fileUpload()); //  when data sent in form-data -> sets up req.files

app.use((req, res, next) => {

    function  changeRequest(field){

        let temp = {};
    
        if(req[field]){
            let temp_arr = Object.entries(req[field])
        
            temp_arr.forEach(el => {
                if (el[0].endsWith("[]")) {
                    temp[el[0].slice(0, -2)] = Array.isArray(el[1]) ? el[1] : [ el[1] ]
                } else {
                    temp[el[0]] = el[1]
                }
            })
        }

        req[field] = temp
    }

    changeRequest("body")
    changeRequest("files")

    next()

})


app.use(express.static('uploads'))

app.use("/api/products", product_routes)
app.use("/api", auth_routes)
app.use("/api/orders", order_routes)

app.use("/api/todos", todo_routes)


app.use(handleResourceNotFoun)
app.use(handleServerError)

app.listen(8000, () => {
    console.log("Server Started.");
})

