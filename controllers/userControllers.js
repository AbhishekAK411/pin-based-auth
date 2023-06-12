import taskUsers from "../models/users.js";
import encrypt from "encryptjs";

export const register = async (req,res) =>{
    try{
        const {username, email, password, confirmPassword, pin, number, address, panCard} = req.body;
        const response = await taskUsers.find({email}).exec();
        if(response.length) return res.send("User is already registered.");
        if(password.length < 8 || confirmPassword.length < 8){
            return res.send("Length of the password should be 8 or more characters.");
        }
        if(password !== confirmPassword){
            return res.send("Passwords do not match.");
        }
        let secretKeyPass = "secretKeyPass";
        let secretKeyPin = "secretKeyPin";
        const encryptPass = encrypt.encrypt(password, secretKeyPass, 256);
        let pinString = pin.toString();
        const encryptPin = encrypt.encrypt(pinString, secretKeyPin, 256);
        const user = new taskUsers({
            username,
            email,
            password : encryptPass,
            pin : encryptPin,
            number,
            address,
            panCard
        });
        await user.save();
        return res.send("User registered successfully.");
    }catch(err){
        return res.send(err);;
    }
}

export const updateEmail = async (req,res) =>{
    try{
        const {_id, changeEmail} = req.body;
        if(!changeEmail) return res.send("New email is required.");
        const findUser = await taskUsers.find({_id}).exec();
        
        if(findUser[0].email !== changeEmail){
            await taskUsers.findOneAndUpdate({_id}, {email: changeEmail}).exec();
            return res.send("Email updated successfully.");
        }
        return res.send("The email you have entered is already being used. Please enter a different one.");
    }catch(err){
        return res.send(err);
    }
}

export const updateNumber = async (req,res) =>{
    try{
        const {_id, changeNumber} = req.body;
        if(!changeNumber) return res.send("New number is required.");
        const findUser = await taskUsers.find({_id}).exec();

        if(findUser[0].number !== changeNumber){
            await taskUsers.findOneAndUpdate({_id}, {number: changeNumber}).exec();
            return res.send("Number updated successfully.");
        }
        return res.send("The number you have entered is already being used. Please enter a different one.");
    }catch(err){
        return res.send(err);
    }
}

export const updateUsername = async (req,res) =>{
    try{
        const {_id, changeUsername} = req.body;
        if(!changeUsername) return res.send("New username is required.");
        const findUser = await taskUsers.find({_id}).exec();

        if(findUser[0].username !== changeUsername){
            await taskUsers.findOneAndUpdate({_id}, {username: changeUsername}).exec();
            return res.send("Username updated successfully.");
        }
        return res.send("The username you have entered is already being used. Please enter a different one.");
    }catch(err){
        return res.send(err);
    }
}

export const updatePassword = async(req,res) =>{
    try{
        const {_id, changePassword} = req.body;
        if(!changePassword) return res.send("New password is required.");
        const findUser = await taskUsers.find({_id}).exec();

        let secretKeyPass = "secretKeyPass";
        const decryptPass = encrypt.decrypt(findUser[0].password, secretKeyPass, 256);
        if(decryptPass !== changePassword){
            const decryptNewPass = encrypt.encrypt(changePassword, secretKeyPass, 256);
            await taskUsers.findOneAndUpdate({_id}, {password: decryptNewPass}).exec();
            return res.send("Password updated successfully.");
        }
        return res.send("The password you have entered is already in use. Please enter a different one.");
    }catch(err){
        return res.send(err);
    }
}

export const updateAddress = async(req,res) =>{
    try{
        const {_id, changeAddress} = req.body;
        if(!changeAddress) return res.send("Address is required.");
        const findUser = await taskUsers.find({_id}).exec();
        
        if(findUser[0].address !== changeAddress){
            await taskUsers.findOneAndUpdate({_id}, {address: changeAddress}).exec();
            return res.send("Address updated successfully.");
        }
        return res.send("The address you have entered is already in use. Please enter a different one.");
    }catch(err){
        return res.send(err);
    }
}

export const updatePancard = async(req,res) =>{
    try{
        const {_id, changePancard} = req.body;
        if(!changePancard) return res.send("New pan card detail is required.");
        const findUser = await taskUsers.find({_id}).exec();
        if(findUser[0].panCard !== changePancard){
            await taskUsers.find({_id}, {panCard: changePancard}).exec();
            return res.send("Updated pan card successfully.");
        }
        return res.send("The pan card detail you have entered is already in use. Please enter the updated one.");
    }catch(err){
        return res.send(err);
    }
}