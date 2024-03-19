import React from "react";
import leader_name_ka from "../assists/avnish.jpeg"
import member_kaam_ka from "../assists/piyush.jpeg"
import "./about.css";

export default function AboutUs() {
    return (
        <div className="about-section" >
            <div className="profile-cart">
                <img src={leader_name_ka} alt="Picture of Solidity Developer" />
                <h2>Avnish Chaprot</h2>
                <p>Solidity Developer</p>
                <a  href="https://www.linkedin.com/in/avnish-chaprot-0214b3250/" target="_blank">LinkedIn</a>
            </div>
            <div className="profile-cart">
                <img src={member_kaam_ka} alt="Picture of MERN stack Developer" />
                <h2>Piyush Gangrade</h2>
                <p>MERN Stack Developer</p>
                <a  href="https://www.linkedin.com/in/piyush-gangrade-204aa5248/" target="_blank">LinkedIn</a>
            </div>
        </div>
    )
}