import mongoose from "mongoose";

const buySchema = mongoose.Schema({
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    buyer_payment_address: {
        type: String,
        required: true
    },
    seller_payment_address: {
        type: String,
        required: true
    },
    buyer_id: {
        type: String,
        required: true
    },
    offer_id: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
})

const BuyModel = mongoose.model("buy", buySchema);

export default BuyModel;