import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    name : String,
    videos : [
        {
            title : String,
            video : String
        }
    ],
    author : mongoose.Schema.Types.ObjectId
})

const Course = mongoose.models.Course || mongoose.model("Course" , courseSchema)
export default Course;