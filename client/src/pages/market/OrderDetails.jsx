import React from "react";
import { useState,useEffect } from "react";
import {Web3} from "web3";
import { useParams } from "react-router-dom"
import cropImg from "../../assists/main-logo.png"
import Input from "../../components/Input";
import axios from "axios";
import { userContext } from "../../App";

export default function SellerOffer() {
    const { user } = React.useContext(userContext);
    const { id } = useParams();
    const[state,setState]=useState({
        web3:null,
        contract:null
    });
    const provider=new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
    useEffect(( )=>{
        async function template(){ 
            const web3= new Web3(provider);
            const ABI=  [
                {
                  "inputs": [
                    {
                      "internalType": "uint256",
                      "name": "",
                      "type": "uint256"
                    }
                  ],
                  "name": "all_offers",
                  "outputs": [
                    {
                      "internalType": "string",
                      "name": "crop_type",
                      "type": "string"
                    },
                    {
                      "internalType": "uint256",
                      "name": "quantity",
                      "type": "uint256"
                    },
                    {
                      "internalType": "uint256",
                      "name": "expire_date",
                      "type": "uint256"
                    },
                    {
                      "internalType": "uint256",
                      "name": "price_per_unit",
                      "type": "uint256"
                    },
                    {
                      "internalType": "uint256",
                      "name": "total_price",
                      "type": "uint256"
                    },
                    {
                      "internalType": "address payable",
                      "name": "payment_address",
                      "type": "address"
                    },
                    {
                      "internalType": "bool",
                      "name": "deleivered",
                      "type": "bool"
                    }
                  ],
                  "stateMutability": "view",
                  "type": "function",
                  "constant": true
                },
                {
                  "inputs": [
                    {
                      "internalType": "uint256",
                      "name": "_id_to_buy",
                      "type": "uint256"
                    },
                    {
                      "internalType": "string",
                      "name": "_crop_type",
                      "type": "string"
                    },
                    {
                      "internalType": "uint256",
                      "name": "_quantity",
                      "type": "uint256"
                    },
                    {
                      "internalType": "uint256",
                      "name": "_expiry_date",
                      "type": "uint256"
                    },
                    {
                      "internalType": "uint256",
                      "name": "_price_per_unit",
                      "type": "uint256"
                    },
                    {
                      "internalType": "address payable",
                      "name": "_payment_address",
                      "type": "address"
                    }
                  ],
                  "name": "create_offer",
                  "outputs": [],
                  "stateMutability": "payable",
                  "type": "function",
                  "payable": true
                },
                {
                  "inputs": [
                    {
                      "internalType": "uint256",
                      "name": "_id_to_buy",
                      "type": "uint256"
                    }
                  ],
                  "name": "purchase_crops",
                  "outputs": [],
                  "stateMutability": "payable",
                  "type": "function",
                  "payable": true
                }
              ]
                const contract_Address="0x07aB89A86c634D94f3FE4c56964e3Fa635C5C280";
                const contract = new web3.eth.Contract(ABI, contract_Address);
                // console.log(contract);
                setState({web3:web3,contract:contract})
            }
            provider && template();
            
        },[])
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

    async function purchaseCrops() {

        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545"); // Use your provider URL
        const addressInput = offerData.payment_address;
        const amount_input = offerData.price*offerData.quantity*(3403693410799);
        const amountWei = amount_input.toString();;

        // Check if the input is a valid Ethereum address
        if (!web3.utils.isAddress(addressInput)) {
            alert("Invalid Ethereum address");
            return;
        }

        // Send transaction using web3
        try {
            const tx = await web3.eth.sendTransaction({
                from: buyerDetails.paymentAddress,
                to: addressInput,
                value: amountWei,
                gas: 100000
            });
            console.log("Transaction hash:", tx.transactionHash);
            alert("Transaction successful!");
        } catch (error) {
            console.error("Error sending transaction:", error);
            alert("Transaction failed. See console for details.");
        }
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
                <p>Payment Address of Seller: {offerData.payment_address}</p>
                <button onClick={()=>purchaseCrops()}>Purchase</button>
            </div>
                </form>
                </div>
                </div>
    )
}