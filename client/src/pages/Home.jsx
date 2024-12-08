import React from "react";
import trust from "../assists/trust.png"
import transprancy from "../assists/transprancy.png"
import security from "../assists/security.png"
import immutability from "../assists/immutability.png"
import futureGoal from "../assists/future-goals.jpg"
import Footer from "../components/Footer";
import "./home.css"

export default function Home() {
    return (
        <div className="home-section">
            <div className="into-section">
                    <h2>"Welcome to AgroDecentral"</h2>
                    <h3>We Believe in...</h3>
                    <div className="feature-box">
                        <div className="feature" >
                            <h4>TRUST</h4>
                            <img className="into-logos" src={trust} alt="trust symbol" />
                        </div>
                        <div className="feature" >
                            <h4>TRANSPRANCY</h4>
                            <img className="into-logos" src={transprancy} alt="transprancy symbol" />
                        </div>
                        <div className="feature" >
                            <h4>SECURITY</h4>
                            <img className="into-logos" src={security} alt="security symbol" />
                        </div>
                        <div className="feature" >
                            <h4>IMMUTABILITY</h4>
                            <img className="into-logos" src={immutability} alt="immutability symbol" />
                        </div>
                    </div>
            </div>
            <div className="works">
                <h2>HOW IT WORKS?</h2>
                <ul>
                    <li>Users Login or Signup to access the platform.</li>
                    <li>Farmers create listings with crop details.</li>
                    <li>Buyers browse, view listings, and purchase securely.</li>
                    <li>Smart contracts execute transactions securely.</li>
                    <li>Farmers prepare and deliver crops to buyers.</li>
                </ul>
            </div>
            <div className="goals">
                <div>
                    <h2>FUTURE GOALS</h2>
                        <ul>
                            <li>Diversify product range to meet varied consumer needs.</li>
                            <li>Utilize blockchain technology to enhance transparency and traceability in crop transportation, ensuring both efficiency and ease of transport for farmers and buyers.</li>
                            <li>Ensure adherence to laws on data privacy, food safety, trade, and taxation to maintain trust and mitigate legal risks.</li>
                            <li>Resolve disputes using blockchain-based arbitration for fair outcomes.</li>
                            <li>Use locked smart contracts for secure transactions, preventing disputes.</li>
                        </ul>
                </div>
                <img src={futureGoal} alt="Showing future goal" />
            </div>
            <Footer />
        </div>
    )
}