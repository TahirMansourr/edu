'use server'

import { isValidObjectId } from "mongoose"
import Course from "../models/course"
import Post from "../models/questions"
import { connectToDB } from "../mongoose"

interface Props {
    id : string ,
    courseId : string ,
    lessonFromCourse :string,
    body : string
  }

export async function createQuestion({courseId , id , lessonFromCourse , body} : Props) {
    try {
        connectToDB()

       const createdPost =  await Post.create({
            body ,
            author : id,
            isParent : true,
            lessonFromCourse, 
            courseId
        })

        await Course.findByIdAndUpdate(courseId , {$push : {posts : createdPost._id}})

        return { status : 'OK'}
    } catch (error) {
        throw new Error(`error at postActions.ts : ${error}`)
    }
}

export async function getMyPosts({courseId , lessonFromCourse} : Pick<Props , 'courseId' |  'lessonFromCourse'>){
    try {
        connectToDB()
        console.log(courseId);
        
        const courseOfRequiredQandAPopulated = await Course.findOne({_id : courseId})
        .populate({
            path : 'posts',
            model : Post
        })

        const requiredQandA = courseOfRequiredQandAPopulated.posts.filter((item : any) => item.lessonFromCourse === lessonFromCourse)

        console.log(requiredQandA);
        

    } catch (error) {
        throw new Error(`error at postActions.ts in getMyPosts : ${error}`)
    }
}