const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    required: true,
    type: Boolean,
    // default: false,
  },
},
{
  timestamps:true, 
});

module.exports = mongoose.model("Todo", TodoSchema)

