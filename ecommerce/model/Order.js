const { default: mongoose } = require("mongoose");
const { BUYER, SELLER } = require("../constants/role");
const { PENDING, COMPLETED, REJECTED } = require("../constants/orderStatus");
const Product = require("./Product");

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
                name: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                    min: 0,
                    required: true,
                },
                quantity: {
                    type: Number,
                    min: 0,
                    require: true,
                },
                status: {
                    type: String,
                    enum: [PENDING, COMPLETED, REJECTED],
                    required: true,
                    default: PENDING
                }
            }
        ],
        required: true,
        validate: {
            validator: function (value) {
                if (value.length == 0) return false
            },
            message: "atleast one product...needed"

        }
    },
    created_by: {
        type: ObjectId,
        ref: "User",
        required: true,
    }
}, {
    timestamps: true,
});

OrderSchema.post("save", async function (order) {
    for (product of order.products) {
        await Product.findByIdAndUpdate(product.product_id, {
            $inc: { stock: -(product.quantity) }
        })
    }
})

module.exports = mongoose.model("Order", OrderSchema)

