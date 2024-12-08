import { useContext } from "react";
import { Link } from "react-router-dom";
import "./market.css";
import OrderBoard from "./OrderBoard";
import { userContext } from "../../App";
export default function Market() {
    const {user} = useContext(userContext);
    // console.log(user)
    return (

        <section className="market">
            <div className="market-header">
                <h2>Market</h2>
                <Link to={user.login?"newOffer":"/login"}>New Offer</Link>
            </div>
            <OrderBoard />
        </section>
    )
}