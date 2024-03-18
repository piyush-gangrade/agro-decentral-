import React from "react";
import { Link } from "react-router-dom";
import "./orderBoard.css";

export default function Order({order}) {
    return (
    
        <div className="offer">
            <div>
                <h1>{order.price * order.quantity}</h1>
                <h2>Type: {order.type}</h2>
                <h3>Exprires in: {order.expire_date}</h3>
            </div>
            <div>
                <p>Origin: {order.state}, {order.city}</p>
                <Link to={order._id} >Show More</Link>
            </div>
        </div>
        
    )
}