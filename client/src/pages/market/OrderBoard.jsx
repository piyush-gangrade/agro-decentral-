import React from "react";
import "./orderBoard.css";
import axios from "axios";
import Order from "./Order";

export default function OrderBoard() {

    const [orders, setOrders] = React.useState([])

    React.useEffect(()=>{
        async function ordersData() {
            const order = await axios.get("http://localhost:8080/offer/");
            setOrders(order.data);
        }
        ordersData();
    },[])
    console.log(orders)

    const orderEl = orders
                        .filter(order => order.fulfilled === false)
                        .map(order => <Order key={order._id} order={order} />)

    return (
        <>
            <div className="order-section">
                <h2>Order Board</h2>
                <div className="order-board">
                    {/* <div className="filter">
                        <button>Wheat</button>
                        <button>Rice</button>
                        <button>Corn</button>
                        <button>Berley</button>
                        <button>Clear Filter</button>
                    </div> */}
                    
                        {orderEl}
                    
                </div>
            </div>
        </>
    )
}