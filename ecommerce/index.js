const express = require("express");
const User = require("./model/User");
const app = express();
require("./config/database")
app.use(express.json()) // global middleware

/* falsy values - alse, null, undefined , 0 , "", NaN    */

app.post("/api/signup", async (req, res) => {
    try {
        // let exists = await User.findOne({email: req.body.email})
        // let exists = await User.countDocuments({email: req.body.email})
        // console.log(exists)
        // if(exists){  
        //     return res.status(400).send({msg:"email already used."})
        // }
        // hashPassword();
        let user = await User.create(req.body)
        res.send(user)
    } catch (err) {
        console.log(err.errors);
        if (err.name == "ValidationError") {
            res.status(400).send({
                err: err.message,
                errors: err.errors,
                // errors: [
                //     {
                //         params: "password",
                //         msg: "required"
                //     },
                //     {
                //         params: "role",
                //         msg: "invalid"
                //     }
                // ]
            })
        } else {
            res.status(500).send({
                err: "SERVER error"
            })
        }
    }
})


app.listen(8000, () => {
    console.log("Server Started.");
})

