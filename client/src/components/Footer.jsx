import React from "react";

export default function Footer() {
    const date = new Date();
    const year = date.getFullYear();

    const styles = {
        backgroundColor: "#000000",
        color: "#FFFFFF",
        textAlign: "center",
        padding: "5px 0px",
        postition: "fixed",
        bottom: "0"
    }

    return (
        <footer style = {styles}>
            &copy; {year} AgroDecentral | Made by Adhishtrati Singh 
        </footer>
    )
}