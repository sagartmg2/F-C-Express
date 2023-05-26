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


db.users.deleteOne({name:"hari"})
db.users.deleteMany({name:"ram"})
db.users.deleteOne


