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
    author : mongoose.Schema.Types.ObjectId
})

const Course = mongoose.models.Course || mongoose.model("Course" , courseSchema)
export default Course;