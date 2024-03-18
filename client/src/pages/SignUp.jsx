import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";
import { userContext } from "../App";
import axios from "axios";
import "./signup.css";

export default function SignUp() {
    const navigate = useNavigate();
    const [warning, setWarning] = React.useState(null);
    const {setUser} = React.useContext(userContext);
    const [userDetail, setUserDetail] = React.useState({
        name: "",
        email: "",
        mobileNo: "",
        dob: "",
        state: "",
        city: "",
        address: "",
        password: "",
        confirmPassword: ""
    })

    const handleSubmit= async(e)=>{
        e.preventDefault();

        try{
            if(userDetail.password === userDetail.confirmPassword){
                const userData = await axios.post("http://localhost:8080/users/signup", {
                    userDetail
                });
                
                if(userData.data.email){
                    const email = userData.data.email;
                    const id = userData.data._id;
                    localStorage.setItem("login", true);
                    localStorage.setItem("email", userData.data.email);
                    localStorage.setItem("_id", userData.data._id);
                    setUser({login: true, user:{email, id}})
                    navigate("/");
                }
                else{
                    setWarning(userData.data);
                    setUserDetail({
                        name: "",
                        email: "",
                        mobileNo: "",
                        dob: "",
                        state: "",
                        city: "",
                        address: "",
                        password: "",
                        confirmPassword: ""
                    })
                }
            }
            else{
                console.log("confirm password is not match")
            }
        }
        catch(e){
            console.log(e);
        }


    }

    function handleChange(e) {
        const {name, value} = e.target;
        setUserDetail(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    return (
        <div className="signup">
            <div className="signup-form-section">
                <h2>Sign Up</h2>
                {warning? <h3>{warning}</h3>: ""}
                <form onSubmit={handleSubmit} className="signup-form">
                    <div >
                        <Input 
                            type="text"
                            id="userName"
                            name="name"
                            text="Enter Your Full Name: "
                            value={userDetail.name}
                            change={handleChange}
                        />
                        <Input 
                            type="email"
                            id="userEmail"
                            name="email"
                            text="Enter Your Email ID: "
                            value={userDetail.email}
                            change={handleChange}
                        />
                        <Input 
                            type="number"
                            id="userNumber"
                            name="mobileNo"
                            text="Enter Your Mobile No.: "
                            value={userDetail.mobileNo}
                            change={handleChange}
                        />
                        <Input 
                            type="date"
                            id="userDOB"
                            name="dob"
                            text="Enter Your Date of Birth: "
                            value={userDetail.dob}
                            change={handleChange}
                        />
                        <Input 
                            type="text"
                            id="userState"
                            name="state"
                            text="State: "
                            value={userDetail.state}
                            change={handleChange}
                        />
                        <Input 
                            type="text"
                            id="userCity"
                            name="city"
                            text="City: "
                            value={userDetail.city}
                            change={handleChange}
                        />
                        <Input 
                            type="text"
                            id="userAddress"
                            name="address"
                            text="Address: "
                            value={userDetail.address}
                            change={handleChange}
                        />
                        <Input 
                            type="password"
                            id="userPassword"
                            name="password"
                            text="Create Paasword: "
                            value={userDetail.password}
                            change={handleChange}
                        />
                        <Input 
                            type="password"
                            id="userPasswordCo"
                            name="confirmPassword"
                            text="Confirm Paasword: "
                            value={userDetail.confirmPassword}
                            change={handleChange}
                        />

                    </div>
                    <button>Submit</button>
                </form>
                <div className="login-link">
                    <p>Have an accout? </p>
                    <Link to="/login">Log In</Link>
                </div>
            </div>

        </div>
    )
}