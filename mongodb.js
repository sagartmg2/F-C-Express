// CRUD

/*
    mongosh 
    
    table -> collection
    row -> document

    1. use <db_name>
    2. show collections
    3. db.createCollection("<collection_name>")
    4. db.users.insertOne({name:"ram"})
    5. db.books.insertOne({name:"sutle"})
 */

db.users.insertOne({ name: "ram" })
db.books.insertOne({ name: "sutle" })

db.users.insertOne({
    name: "hari",
    phone: 111,
    address: {
        tole: "galli",
        ward_no: 16
    }
})


db.products.insertMany([
    { name: "mobile" },
    { name: "watch" },
    { name: "keyboard" },
])

// User.find()

// db.users.find(<filter_obj>,<select_obj>)

db.users.insertOne({ name: "ram bdr" })
db.users.insertOne({ name: "RAM" })

db.users.find({ name: "ram" })

/* operators
    - query opertoars

    - update operators
*/

db.users.updateOne({ name: "hari" }, { $set: { phone: 3333 } })

db.users.updateMany({ name: "ram bdr" }, { $set: { phone: 333 } })

db.users.updateOne({ phone: 333 }, { $set: { phone: 444 } })

db.users.find({}, {})
db.users.updateOne({ name: "hari" }, { $rename: { phone: "tel" } })

db.users.updateOne({ name: "hari" }, { $unset: { address: 1 } })


db.users.deleteOne({ name: "hari" })
db.users.deleteMany({ name: "ram" })
db.users.deleteOne




db.products.insertOne({ name: "projector" })
db.products.insertMany([
    { name: "mouse" },
    { name: "tshirt" }
])

db.products.updateOne({ name: "tshirt" }, { $set: { price: 1212 } })
db.products.updateMany({ name: "mobile" }, { $set: { price: 0 } })

db.products.find({ price: { $exists: 1 } })
db.products.updateMany({ price: { $exists: 0 } }, { $set: { price: 0 } })


db.products.find({ name: RegExp("irt", "i") })
// db.products.find({name:{ $regex: '/^tshirt/gi'}})


db.products.find({ price: { $lt: 1000 } })

// mongoimport c:\data\books.json -d bookdb -c books --dropDesktop


// mongoimport "C:\Users\User\Desktop\dummy.json" -d falgun -c rolexes --drop
// C:\Users\User\Desktop\dummy.json

db.watches.countDocuments()


db.watches.updateMany({}, { $rename: { RRP: "price" } })


db.watches.find({ price: "15000" })
db.watches.find({ price: { $lte: "15000" } })

// price>10000 && price<2000
// $and


db.watches.find({
    price: { $eq: "15000" }
})

Stop
Seconds
regex = RegExp("gmt", "i")
db.watches.find({
    $and: [
        { price: { $gte: "15500" } },
        { price: { $lte: "16000" } },
        { Complication: regex },
    ]
})

// aggregate

db.watches.find({
    $or: [
        { Complication: RegExp("gmt", "i") },
        { Complication: RegExp("stop seconds", "i") },
    ],
},{price:1})
.sort({price:1})

db.watches.find({ price: "15000" })
db.watches.find({ Complication: " GMT" })

