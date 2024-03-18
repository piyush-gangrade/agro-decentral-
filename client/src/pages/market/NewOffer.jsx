import React from "react";
import Input from "../../components/Input";
import "./newOffer.css"
import { userContext } from "../../App.jsx"
import axios from "axios";

export default function NewOfferSeller() {
    const {user} = React.useContext(userContext);
    const [isSubmitted, setIsSumitted] = React.useState(false)


    const [formData, setFormData] = React.useState({
        cropType: "",
        quantity: "",
        expireDate: "",
        price: "",
        state: "",
        city: "",
        paymentAddress: ""
    })

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(formData);
        console.log(user)
        try{
            const offer = await axios.post("http://localhost:8080/offer/submit",{
                offerData: formData,
                user: user.user
            })
            if(offer.status === 200){
                setIsSumitted(true);
            }
        }
        catch(error){
            console.log(error);
        }


        setFormData({
            cropType: "",
            quantity: "",
            expireDate: "",
            price: "",
            state: "",
            city: "",
            paymentAddress: ""
        })
    }

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name] : value
        }))
    }

    return (
        <>
            <div className="form-header" >
                <h2>New Offer</h2>
                {isSubmitted?<h3>Your Offer is Submitted</h3>: ""}
            </div>
            <form className="offerForm" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="crop">Crop type: </label>
                    <select id="crop" name="cropType" value={formData.cropType} onChange={handleChange}>
                        <option>--type--</option>
                        <option value="rice">Rice</option>
                        <option value="wheat">Wheat</option>
                        <option value="corn">Corn</option>
                        <option value="baeley">Berley</option>
                    </select>
                </div>

                <Input 
                    type="number" 
                    id="quantity" 
                    name="quantity" 
                    text="Quantity:" 
                    value={formData.quantity} 
                    change={handleChange} 
                />

                <Input 
                    type="date" 
                    id="expireDate" 
                    name="expireDate" 
                    text="Expiration Date:" 
                    value={formData.expireDate} 
                    change={handleChange} 
                />

                <Input 
                    type="number" 
                    id="price" 
                    name="price" 
                    text="Price:" 
                    value={formData.price} 
                    change={handleChange} 
                />
            
                <div>
                    <h3>Address Details</h3>
                    <Input 
                        type="text" 
                        id="sellerState" 
                        name="state" 
                        text="State:" 
                        value={formData.state} 
                        change={handleChange} 
                    />

                    <Input 
                        type="text" 
                        id="sellerCity" 
                        name="city" 
                        text="City:" 
                        value={formData.city} 
                        change={handleChange} 
                    />

                </div>
                <Input 
                    type="text" 
                    id="sellerPaymentAddress"
                    name="paymentAddress" 
                    text="Payment Address:" 
                    value={formData.paymentAddress} 
                    change={handleChange} 
                />
                <button className="offer-form-submit" >Submit</button>
            </form>
        </>
    )
}