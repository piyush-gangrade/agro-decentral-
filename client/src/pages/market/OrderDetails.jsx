import React from "react";
import { useParams } from "react-router-dom"
import cropImg from "../../assists/main-logo.png"
import Input from "../../components/Input";
import axios from "axios";
import { userContext } from "../../App";

export default function SellerOffer() {
    const { user } = React.useContext(userContext);
    const { id } = useParams();
    const [buyerDetails, setBuyerDetails] = React.useState({
        state: "",
        city: "",
        address: "",
        paymentAddress: "",
        number: ""
    })
    const [offerData, setOfferData] = React.useState({})
    // console.log(user)
    console.log(offerData)
    React.useEffect(()=>{
       async function offer() {
            const offer = await axios.get(`http://localhost:8080/offer/${id}`); 
            setOfferData(offer.data)
        }
        offer()
    },[id]);

     const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log(buyerDetails);
        try{
            const buy = await axios.post("http://localhost:8080/buy/", {
                buyerData : buyerDetails,
                buyerId : user.user.id,
                offerData :  offerData,
            })
            console.log(buy);
        }
        catch(error){
            console.log(error);
        }

        setBuyerDetails({
            state: "",
            city: "",
            address: "",
            paymentAddress: "",
            number: ""
        })
    }

    function handleChange(e) {
        const {name, value} = e.target;
        setBuyerDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }))
    }
    
    return (
        <div className="offer-detail">
            <div className="offer-crop-section">
                <img src={cropImg} alt="crop" />
                <div className="crop-details">
                    <h2>Crop Details</h2>
                    <ul>
                        <li>Type: {offerData.type}</li>
                        <li>Origin: {offerData.state}, {offerData.city}</li>
                        <li>Quantity: {offerData.quantity} Tons</li>
                        <li>Expires Date: {offerData.expire_date}</li>
                    </ul>
                </div>
            </div>
            <div className="offer-buyer-section">
                <h2>Buyers Details:</h2>
                <form onSubmit={handleSubmit} id="buyerDetail" className="buyer-details">
                    <Input 
                        type="text"
                        id="buyerState"
                        text = "State: "
                        name="state"
                        value={buyerDetails.state}
                        change={handleChange}
                    />
                    <Input 
                        type="text"
                        id="buyerCity"
                        text = "City: "
                        name="city"
                        value={buyerDetails.city}
                        change={handleChange}
                    />
                    <Input 
                        type="text"
                        id="address"
                        text = "Address 1: "
                        name="address"
                        value={buyerDetails.address}
                        change={handleChange}
                    />
                    <Input 
                        type="number"
                        id="buyerNumber"
                        text = "Enter Your Number: "
                        name="number"
                        value={buyerDetails.number}
                        change={handleChange}
                    />
                    <Input 
                        type="text"
                        id="buyerPaymentAddress"
                        text = "Payment Address: "
                        name="paymentAddress"
                        value={buyerDetails.paymentAddress}
                        change={handleChange}
                    />
            <div className="offer-payment">
                <h2>Payment Details:</h2>
                <h3>Total Price: {offerData.price*offerData.quantity}</h3>
                <p>Payment Address of Seller: 08xhdfoijsdfo8378</p>
                <button >Purchase</button>
            </div>
                </form>
                </div>
                </div>
    )
}