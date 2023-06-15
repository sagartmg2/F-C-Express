// const { emit } = require("./model/User");

let errors = {
    "name": {
        "name": "ValidatorError",
        "message": "Path `name` is required.",
        "properties": {
            "message": "Path `name` is required.",
            "type": "required",
            "path": "name",
            "value": ""
        },
        "kind": "required",
        "path": "name",
        "value": ""
    },
    "email": {
        "name": "ValidatorError",
        "message": "email alredy used..",
        "properties": {
            "message": "email alredy used..",
            "type": "user defined",
            "path": "email",
            "value": "s@b.com"
        },
        "kind": "user defined",
        "path": "email",
        "value": "s@b.com"
    }
}

// console.log(Object.entries(errors));  // [  []   , [] ]

let converted = Object.entries(errors).map(error => {
    return {
        params: error[0],
        msg: error[1].message
    }
})

console.log(converted)



/*  */

db.products.updateMany({}, {
    $set: { stock: 10 }
})


db.products.find({

}, { price: 1,name:1 })