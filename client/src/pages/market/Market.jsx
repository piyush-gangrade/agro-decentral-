import React from "react";
import { Link } from "react-router-dom";
import "./market.css";
import OrderBoard from "./OrderBoard";

export default function Market() {
    
    return (

        <section className="market">
            <div className="market-header">
                <h2>Market</h2>
                <Link to="newoffer">New Offer</Link>
            </div>
            <OrderBoard />
        </section>
    )
}