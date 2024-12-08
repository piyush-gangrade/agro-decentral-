import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import Market from "./pages/market/Market"
import NewOffer from "./pages/market/NewOffer"
import OrderDetails from "./pages/market/OrderDetails";
import SuccessfulTransaction from "./pages/SuccessfulTransaction";

export const userContext = React.createContext();

export default function App() {
  const [user, setUser] = React.useState({ login: false, user: {} })
  
  React.useEffect(()=>{
    const login = localStorage.getItem('login')
    const email = localStorage.getItem('email')
    const id = localStorage.getItem('_id')
    setUser({login, user:{email, id}})
  },[])


  return (
    <userContext.Provider value={{user, setUser}}>
      <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<SignUp />}/>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="market" element={<Market />} />
          <Route path="market/newoffer" element={<NewOffer />} />
          <Route path="market/:id" element={<OrderDetails />}/>
        </Route>
        <Route path="/successfull" element={<SuccessfulTransaction/>}/>
      </Routes>
    </userContext.Provider>
  );
}


