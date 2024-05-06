import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    name : String,
    videos : [
        {
            title : String,
            video : String
        }
    ]
})

const Course = mongoose.models.Course || mongoose.model("Course" , courseSchema)
export default Course;