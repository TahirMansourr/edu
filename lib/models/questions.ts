import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    body : String,
    createdAt : {
        type : Date,
        default : Date.now()
    },
    author :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    isParent : Boolean,
    children : [{
        type : mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }],
    lessonFromCourse : String,
    courseId : String,
    isAnswer : Boolean
})

const Post = mongoose.models.Post || mongoose.model('Post' , postSchema)
export default Post;