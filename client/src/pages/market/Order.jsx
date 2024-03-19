import React from "react";
import { Link } from "react-router-dom";
import "./orderBoard.css";
import { userContext } from "../../App";

export default function Order({order}) {
    const { user } = React.useContext(userContext)
    return (
        <div className="offer">
            <div>
                <h1>{order.price * order.quantity} INR</h1>
                <h2>Type: {order.type}</h2>
                <h3>Exprires in: {order.expire_date}</h3>
            </div>
            <div>
                <p>Origin: {order.state}, {order.city}</p>
                <Link to={user.login? order._id: "/login"} >Show More</Link>
            </div>
        </div>
        
    )
}