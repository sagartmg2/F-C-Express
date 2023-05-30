const express = require("express")
const app = express()
const fs = require("fs")
const path = require("path")
const mongoose = require('mongoose');
const Watch = require("./model/Watch");

mongoose.connect('mongodb://127.0.0.1:27017/falgun')
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(err)
    })

/* middleware  - a function wich has access to request and response and also next valid middleware
    - global middleware
    - route level middleware
*/



/* status
    200 201 202 203 204
    3 
    4
        400
        401  unauthenated.
        403  forbidden
        404
    5
        500
*/



function checkAuthentication(req, res, next) {

    let is_logged_in = true;
    if (is_logged_in) {
        console.log("check authentication");
        next()
        return;
    }

    res.status(401).send({
        msg: "Unauthencated."
    })

}

function checkIsBuyer(req, res, next) {
    console.log("check is buyer");
    let is_buyer = false;
    if (is_buyer) {
        next()
    } else {
        res.status(403).send({
            msg: "Access Denied . only for buyers."
        })
    }

}

// app.use(checkAuthentication)
// app.use(checkIsBuyer)


// app.get("/api/watches", (req, res) => {
//     let watches = Watch.find({}).limit(25)
//     .then(db_data =>{
//         res.send({
//             data: db_data
//         })
//     })

// })

app.get("/api/watches", async (req, res) => {
    let watches = await Watch.find({}).limit(25).sort({ price: 1 })

    res.send({
        data: watches
    })

})

app.get("/api/orders", checkAuthentication, checkIsBuyer, (req, res) => {
    res.send("send orders");
})

app.get("/api/products", (req, res) => {
    console.log("send products");
    res.send({
        data: [
            {
                "name": "compouter", price: 10000
            }
        ]
    })
})


app.use((req, res) => {
    // res.sendFile(path.join(path.resolve(),"index-1.js"))
    // return;
    res.status(404).send({
        msg: "Resource Not Found"
    })
})


app.listen(8000, () => {
    console.log("server started");
})