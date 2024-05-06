import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    name : String,
    joinedAt : Date,
    courses : [{
       type : mongoose.Schema.Types.ObjectId,
       ref : 'Course'}
    ]
})

const User = mongoose.models.User || mongoose.model("User" , userSchema)
export default User;