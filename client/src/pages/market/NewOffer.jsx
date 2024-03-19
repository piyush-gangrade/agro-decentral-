import{Web3} from "web3";
import React, { useEffect, useState } from "react";
// import React from "react";
import Input from "../../components/Input";
import "./newOffer.css"
import { userContext } from "../../App.jsx"
import axios from "axios";

export default function NewOfferSeller() {


    const[state,setState]=useState({
        web3:null,
        contract:null
    });
    const provider=new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
    console.log("provider: " + provider);
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
        console.log(state)
        async function write_contract(){
            const {contract}=state;
            const paymentAddr = Web3.utils.toChecksumAddress(formData.paymentAddress);
            await contract.methods.create_offer(0,formData.cropType,formData.quantity,unixTS,formData.price,paymentAddr).send({
                from:"0x98472261ed8FB50033bB282d5bB92FBbc94Ea4Eb",
                gas:'1000000'
            });
            console.log("successfully insetrted");
            alert("Suceesfully inserted in blockchain");
        }  

        


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
    const [unixTS, setUnixTS] = React.useState(null);

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        if(name === "expireDate"){
            const date = new Date(value);
            setUnixTS( Math.floor(date.getTime() / 1000));
            console.log(unixTS)
        }
    }

    return (
        <>
            <div className="newOffer" >
                <h2>New Offer</h2>
                {isSubmitted?<h3>Your Offer is Submitted</h3>: ""}
            <form className="offerForm" onSubmit={handleSubmit}>
                <div className="form-input">
                <div>
                    <label htmlFor="crop">Crop type: </label>
                    <select id="crop" name="cropType" value={formData.cropType} onChange={handleChange}>
                        <option>--type--</option>
                        <option value="rice">Rice</option>
                        <option value="wheat">Wheat</option>
                        <option value="corn">Corn</option>
                        <option value="berley">Berley</option>
                    </select>
                </div>

                <Input 
                    type="number" 
                    id="quantity" 
                    name="quantity" 
                    text="Quantity(in Tons):" 
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
                    text="Price(per Ton):" 
                    value={formData.price} 
                    change={handleChange} 
                />
            
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

                <Input 
                    type="text" 
                    id="sellerPaymentAddress"
                    name="paymentAddress" 
                    text="Payment Address:" 
                    value={formData.paymentAddress} 
                    change={handleChange} 
                />
                </div>
                <button className="offer-form-submit" onClick={()=>write_contract()} >Submit</button>
            </form>
            </div>
        </>
    )
}