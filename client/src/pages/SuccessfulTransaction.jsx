import React from "react";
import { Link } from "react-router-dom";
import "./successfulTransaction.css"

export default function SucessfulTransaction() {
    return (
        <div className="transaction">
            <div>
                <h2>Transaction is Sucessful.</h2>
                <Link to="/">Go to the Home Page</Link>
            </div>
        </div>
    )
}