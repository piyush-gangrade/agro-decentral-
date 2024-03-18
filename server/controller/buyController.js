import BuyModel from "../models/Buy.js";
import OfferModel from "../models/Offer.js"

export const buy = async (req, res) => {
    try{
        const buyerData = req.body.buyerData;
        const offerData = req.body.offerData;
        const buyerId = req.body.buyerId;
        const buyData = await new BuyModel({
            state: buyerData.state,
            city: buyerData.city,
            address: buyerData.address,
            buyer_payment_address: buyerData.paymentAddress,
            seller_payment_address: offerData.payment_address,
            buyer_id: buyerId,
            offer_id: offerData._id,
            amount: (offerData.price*offerData.quantity)
        })

        const buyDetail = await buyData.save();
        const offer = await OfferModel.updateOne({_id: offerData._id}, { fulfilled : true});
        return res.status(200).json({buyDetail, offer});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({Error: err.message});
    }
}