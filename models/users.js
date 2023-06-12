import mongoose from "mongoose";
import { Schema } from "mongoose";

const users = new Schema({
    username : String,
    email : String,
    password : String,
    pin : String,
    address : String,
    number : Number,
    panCard : String
});

export default mongoose.model("taskUsers", users);