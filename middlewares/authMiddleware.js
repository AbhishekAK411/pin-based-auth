import taskUsers from "../models/users.js";
import encrypt from "encryptjs";

export const checkRegister = (req,res,next) =>{
    try{
        const { username, email, password, confirmPassword, pin, number, address, panCard} = req.body;
        if(!username) return res.send("Username is required.");
        if(!email) return res.send("Email is required.");
        if(!password) return res.send("Password is required.");
        if(!confirmPassword) return res.send("Confirm Password is required.");
        if(!pin) return res.send("Pin is required.");
        if(!number) return res.send("Number is required.");
        if(!address) return res.send("Address is required.");
        if(!panCard) return res.send("Pan card details are required.");
        next();
    }catch(err){
        return res.send(err);
    }
}

export const checkPin = async(req,res,next) =>{
    try{
        const {_id, pin} = req.body;
        if(!_id) return res.send("ID not found.");
        if(!pin) return res.send("Pin is required.");

        const user = await taskUsers.find({_id}).exec();
        if(!user.length) return res.send("User not found.");
        let secretKeyPin = "secretKeyPin";
        const pinDecrypt = encrypt.decrypt(user[0].pin, secretKeyPin, 256);
        let pinCheck = parseInt(pinDecrypt);
        let flag=false;
        if(pin === pinCheck){
            flag = true;
        }
        if(flag){
            next();
        }else{
            return res.send("Pin is incorrect.");
        }
    }catch(err){
        return res.send(err);
    }
}