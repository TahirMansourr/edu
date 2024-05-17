import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    name : String,
    coursePicture : String,
    content : String,
    videos : [
        {
            title : String,
            video : String
        }
    ],
    posts :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Post"
    }],
    author : {
        type : mongoose.Schema.Types.ObjectId ,
         ref : 'User'
        },
    students : [{
        type :mongoose.Schema.Types.ObjectId ,
         ref : 'User'
        }],
    pendingStudents : [{
        type : mongoose.Schema.Types.ObjectId,
         ref: "User"
        }],
    newPending : Boolean,
    price : String, 
    duration : String
})

const Course = mongoose.models.Course || mongoose.model("Course" , courseSchema)
export default Course;