const { default: mongoose } = require("mongoose");
const { BUYER, SELLER } = require("../constants/role");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const OrderSchema = new Schema({
    products: {
        type: [
            {
                product_id: {
                    type: ObjectId,
                    ref: "Product",
                    required: true,
                },
                name: String,
                price: Number,
                quantity: Number,
            }
        ]
    },
    created_by: {
        type: ObjectId,
        ref: "User",
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Order", OrderSchema)

