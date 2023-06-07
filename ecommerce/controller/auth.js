const Joi = require("joi")
const User = require("../model/User")

const bcrypt = require("bcrypt")


const schema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required().min(8)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    // password_confirmation: bJoi.required().ref('password'),
    email: Joi.string().email().required()
})


const signup = async (req, res, next) => {
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
}

const loginSchemaValidation = Joi.object({
    password: Joi.string().required()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: Joi.string().email().required()
})

const login = async (req, res, next) => {

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


}

module.exports = {
    signup,
    login
}