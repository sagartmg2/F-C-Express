const express = require("express");
const bcrypt = require("bcrypt")
const Joi = require('joi')

const User = require("./model/User");
const Product = require("./model/Product");
const { SELLER } = require("./constants/role");
const { checkAuthentication } = require("./middleware/auth");

const app = express();
require("./config/database")
app.use(express.json()) // global middleware

/* falsy values - alse, null, undefined , 0 , "", NaN    */

app.get("/api/products", async (req, res, next) => {

    try {
        let products = await Product.find()
        res.send(products)
    } catch (err) {
        next(err)
    }
})



const productCreateSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.required(),
})

app.post("/api/products", checkAuthentication, async (req, res, next) => {

    try {

        let { error } = productCreateSchema.validate(req.body,
            {
                abortEarly: false,
                allowUnknown: true,
            })

        console.log("errors", error?.details)

        if (error?.details) {
            res.status(400).send({
                errors: error?.details
            })
            return;
        }

        let product = await Product.create({ ...req.body, created_by: req.user_id })
        res.send(product)
    } catch (err) {
        next(err)
    }
})


const schema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required().min(8)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    // password_confirmation: bJoi.required().ref('password'),
    email: Joi.string().email().required()
})

app.post("/api/signup", async (req, res, next) => {
    try {
        let { error } = schema.validate(req.body,
            {
                abortEarly: false,
                stripUnknown: false,
                allowUnknown: true,
            })

        console.log("errors", error?.details)

        if (error?.details) {
            res.status(400).send({
                errors: error?.details
            })
            return;
        }

        /* 10 is salt round - complexity  */
        let hashed = await bcrypt.hash(req.body.password, 10);

        let user = await User.create({ ...req.body, password: hashed })

        res.send(user)

    } catch (err) {
        next(err)
    }
})


const loginSchemaValidation = Joi.object({
    password: Joi.string().required()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: Joi.string().email().required()
})

app.post("/api/login", async (req, res, next) => {

    try {

        let { error } = loginSchemaValidation.validate(req.body,
            {
                abortEarly: false,
                stripUnknown: false,
                allowUnknown: true,
            })


        if (error?.details) {
            res.status(400).send({
                errors: error?.details
            })
            return;
        }

        /* 1. take password and email from req.body */
        /* 2. check if user exists  */
        /* 3. check password */

        let user = await User.findOne({ email: req.body.email }).select("+password")


        if (user) {

            let matched = await bcrypt.compare(req.body.password, user.password);
            if (matched) {
                res.send({
                    msg: "login successful"
                })
                return;
            }

        }

        res.status(401).send({
            msg: "Invalid Credentaions"
        })



    }
    catch (err) {
        next(err)
    }


})


app.use((req, res) => {
    res.status(404).send({
        msg: "Resource Not found"
    })
})

/*  */
app.use((err, req, res, next) => {

    let statuscode = 500
    let message = "Server Error"
    let errors = []

    if (err.name == "ValidationError") {
        statuscode = 400;
        message = "Bad Request";
        errors = Object.entries(err.errors).map(error => {
            return {
                params: error[0],
                msg: error[1].message
            }
        })

    }

    res.status(statuscode).send({
        msg: message + " " + err.message,
        errors
    })

})


app.listen(8000, () => {
    console.log("Server Started.");
})

