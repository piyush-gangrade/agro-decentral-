import UserModel from "../models/user.js";
import bcrypt from "bcrypt";

export const signup = async(req, res)=>{
    try{
        const userData = req.body.userDetail;
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUser = new UserModel({
            username: userData.name,
            password: hashedPassword,
            email: userData.email,
            mobile_no: userData.mobileNo,
            dob: userData.dob,
            state: userData.state,
            city: userData.city,
            address: userData.address,
        })

        const existingUser = await UserModel.findOne({email: userData.email});
        if(existingUser){
            return res.json("Account already exists.")
        }
        const user = await newUser.save();
        return res.status(200).json(user);
    }
    catch(error){
        console.log(error);
        res.status(500).json({Error: error.message});
    }   
}

export const login = async(req, res)=>{
    const {email, password} = req.body.userEntry;
    try{
        const user = await UserModel.findOne({email: email});
        if(!user){
            return res.json("No such user found");
        }
        const passMatch = bcrypt.compareSync(password, user.password)
        if(!passMatch){
            return res.json("Incorrect Password");
        }
        return res.json({user});
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}