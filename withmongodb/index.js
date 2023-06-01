const express = require("express")
const Todo = require("./model/Todo")
require("./config/database")
const app = express()
const Joi = require('joi');

app.use(express.json()) // global middleware - access to req,res,next-middleware
/* we will get data in req.body */


app.get("/api/todos", async (req, res, next) => {
    try {
        let todos = await Todos.find()
        res.send({
            data: todos
        })
    } catch (err) {
        return next(err)
    }
})

app.post("/api/todos", async (req, res, next) => {
    try {

        const schema = Joi.object({
            // title: Joi.string().required(),
            status: Joi.required()
        });

        let checkValidation = schema.validate(req.body, { abortEarly: false });

        // console.log(checkValidation.error.name);
        // console.log(checkValidation.name);

        

        if (checkValidation.error) {
            return next(checkValidation.error)
        }

        // console.log(status);
        // console.log(status.error);
        // console.log(status.details);


        console.log("do other tasks");


        let todo = await Todo.create({
            title: req.body.title,
            status: req.body.status
        })

        res.send({
            data: todo
        })
    } catch (err) {
        return next(err)

    }

})

app.use((req, res) => {
    res.status(404).send({
        msg: "Resource Not Found"
    })
})

app.use((err, req, res, next) => {

    console.log(err.name);

    let statuscode = 500;
    let msg = "Server Error";

    if (err.name === "ValidationError") {
        statuscode = 400
        msg = "Bad Request "
    }
    
    let errors = []

    res.status(statuscode).send({
        msg,
        errors : err.details
    })
})


app.listen(8000, () => {
    console.log("server started");
})