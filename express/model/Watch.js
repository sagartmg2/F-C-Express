const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const WatchSchema = new Schema({

});

module.exports = mongoose.model("Watch", WatchSchema)