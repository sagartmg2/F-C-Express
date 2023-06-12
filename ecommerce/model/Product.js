const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const ProductSchema = new Schema({
    name: {
        type: String,
        // minlength: 3,
        maxlength: 255
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    images: {
        type: [String],
    },
    description: {
        type: String
    },
    categories: [String],
    created_by: {
        required: true,
        type: ObjectId,
        ref: "User"
    },
    reviews: [
        {
            rating: {
                type: Number,
                min: 1,
                max: 5,
                required: true,
            },
            created_by: {
                type: ObjectId,
                ref: "User",
                required: true,
            },
            comment: {
                type: String,
            }
        }
    ]

});

module.exports = mongoose.model('Product', ProductSchema);