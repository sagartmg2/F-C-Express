const express = require("express");
const bcrypt = require("bcrypt")
const Joi = require('joi')

const User = require("./model/User");

const app = express();
require("./config/database")
app.use(express.json()) // global middleware

/* falsy values - alse, null, undefined , 0 , "", NaN    */

const schema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    // password_confirmation: Joi.required().ref('password'),
    email: Joi.string().email()
})

app.post("/api/signup", async (req, res) => {
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

        let hashed = await bcrypt.hash(req.body.password, 10);

        console.log({ hashed })

        let user = await User.create({ ...req.body, password: hashed })

        res.send(user)

    } catch (err) {
        if (err.name == "ValidationError") {
            let errors = Object.entries(err.errors).map(error => {
                return {
                    params: error[0],
                    msg: error[1].message
                }
            })
            res.status(400).send({
                err: err.message,
                errors,

            })
        } else {
            res.status(500).send({
                err: "SERVER error",
                error: err.message
            })
        }
    }
})


app.listen(8000, () => {
    console.log("Server Started.");
})

