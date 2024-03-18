import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";
import axios from "axios";
import { userContext } from "../App";
import "./login.css";

export default function Login() {
    const navigate = useNavigate();
    const [warning, setWarning] = React.useState(null);
    const { setUser } = React.useContext(userContext);
    const [userEntry, setUserEntry] = React.useState({
        email: "",
        password: "",
    })

    const handleSubmit= async(e)=>{
        e.preventDefault();
        console.log(userEntry);

        try{
            const user = await axios.post("http://localhost:8080/users/login", {
                userEntry
            });
                console.log(user);
                if(user.data.user.email === userEntry.email){
                    const email = user.data.user.email;
                    const id = user.data.user._id;
                    localStorage.setItem("login", true);
                    localStorage.setItem("email", email);
                    localStorage.setItem("_id", id);
                    setUser({login: true, user:{email, id}})
                    navigate("/");
                }
                else{
                    setWarning(user.data);
                    setUserEntry({
                        email: "",
                        password: "",
                    })
                }
        
        }
        catch(e){
            console.log(e);
        }


    }

    function handleChange(e) {
        const {name, value} = e.target;
        setUserEntry(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    return (
        <div className="login">
            <div className="login-form-section">
                <h2>Login</h2>
                {warning? <h3>{warning}</h3>: ""}
                <form onSubmit={handleSubmit} className="login-form">
                    <Input 
                        type="email"
                        id="userEmail"
                        name="email"
                        text="Enter Your Email ID: "
                        value={userEntry.email}
                        change={handleChange}
                    />
                    <Input 
                        type="password"
                        id="userPassword"
                        name="password"
                        text="Enter Paasword: "
                        value={userEntry.password}
                        change={handleChange}
                    />
                    <button>Submit</button>
                </form>
                <div className="signup-link">
                    <p>Create a new account: </p>
                    <Link to="/signup">SignUp</Link>
                </div>
            </div>
        </div>
    )
}