import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    id : String,
    name : String,
    joinedAt : Date,
    mongoUser : Boolean,
    isTeacher : Boolean,
    courses : [{
       type : mongoose.Schema.Types.ObjectId,
       ref : 'Course'}
    ]
})

const User = mongoose.models.User || mongoose.model("User" , userSchema)
export default User;