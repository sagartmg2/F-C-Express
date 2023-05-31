const express = require("express")
const Todo = require("./model/Todo")
require("./config/database")
const app = express()

app.use(express.json()) // global middleware - access to req,res,next-middleware


app.get("/api/todos", async (req, res) => {
    let todos = await Todo.find()
    res.send({
        data: todos
    })
})

app.post("/api/todos", async (req, res) => {

    /* 1. get request body data */
    let todo = await Todo.create({
        title: req.body.title,
        status: req.body.status
    })
    res.send({
        data: todo
    })

})


app.listen(8000, () => {
    console.log("server started");
})