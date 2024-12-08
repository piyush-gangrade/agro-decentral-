import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assists/main-logo.png";
import "./header.css"
import { userContext } from "../App";

export default function Header() {
    
    const { user, setUser } = React.useContext(userContext);

    function logout() {
        localStorage.clear();
        setUser({login: false, user: {}})
    }

    return (
        <header>
            <div className="logo">
                <Link className="logo-img" to="/">
                    <img src={logo} alt="Website Logo"/>
                </Link>
                <Link className="logo-heading" to="/">
                    AgroDecentral
                </Link>
            </div>
            <nav className="navBar">
                <NavLink to="/market" >Go to Marketplace</NavLink>
                {user.login? 
                    <button onClick={logout} className="btn">logout</button>:
                    <>
                        <NavLink to="/login" >login</NavLink>
                        <NavLink to="/signup"  >signup</NavLink>
                    </>
                }
            </nav>
        </header>
    )
}