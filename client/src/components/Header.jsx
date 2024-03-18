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
                <NavLink to="/" >Home</NavLink>
                <NavLink to="/market" >Market</NavLink>
                <NavLink to="/about" >About Us</NavLink>
            </nav>
            <div className="login-section" >
                {user.login? 
                    <button onClick={logout} className="btn">Logout</button>:
                    <>
                        <Link to="/login" className="btn" >LogIn</Link>
                        <Link to="/signup" className="btn" >SignUp</Link>
                    </>
                }
            </div>
        </header>
    )
}