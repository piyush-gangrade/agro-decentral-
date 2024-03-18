import OfferModel from "../models/Offer.js";

export const submit = async (req, res) =>{
    try{
        const offerData = req.body.offerData;
        const userData = req.body.user;
        console.log(userData)
        const newOffer = new OfferModel({
            type: offerData.cropType,
            quantity: offerData.quantity,
            expire_date: offerData.expireDate,
            price: offerData.price,
            state: offerData.state,
            city: offerData.city,
            payment_address: offerData.paymentAddress,
            email: userData.email,
            userId: userData.id,
            fulfilled: false,
        })
        const offer = await newOffer.save();
        return res.status(200).json(offer);
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({Error: err.message});
    }
}

export const getAllOffers = async(req,res)=>{
    try{
        const offers = await OfferModel.find(); 
        return res.status(200).json(offers)
    }
    catch(error){
        console.log(error)
        return res.status(500).json({Error: error.message});
    }
}

export const getOfferById = async(req,res)=>{
    try{
        const offer = await OfferModel.findById(req.params.id);
        return res.status(200).json(offer);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({Error: err.message});
    }
}