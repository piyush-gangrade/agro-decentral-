import mongoose from "mongoose"

const offerSchema = mongoose.Schema(
    {
        type: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        expire_date: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        payment_address: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
)

const OfferModel = mongoose.model("Offer",offerSchema)
export default OfferModel;