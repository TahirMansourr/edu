'use server'

import { isValidObjectId } from "mongoose"
import Course from "../models/course"
import Post from "../models/questions"
import { connectToDB } from "../mongoose"
import { PostInterface } from "../types"
import User from "../models/user"

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

export async function getMyPosts({
    courseId ,
    lessonFromCourse ,
    isTeacher} 
    : Pick<Props , 'courseId' |  'lessonFromCourse'> & {isTeacher : boolean
    }){
    try {
        connectToDB()
        console.log(courseId);
        
        const courseOfRequiredQandAPopulated = await Course.findOne({_id : courseId})
        .populate({
            path : 'posts',
            model : Post,
            populate : {
                path : 'children',
                model : Post,
                populate : {
                    path : 'author',
                    model : User
                }
            }
        }).populate({
            path : 'author',
            model : User
        }).lean()

        if(Array.isArray(courseOfRequiredQandAPopulated)) return { status : 'Bad' , message : 'returned an array'}
        if(isTeacher === false){
        const requiredQandA = courseOfRequiredQandAPopulated?.posts.filter((item : any) => (
            item.lessonFromCourse === lessonFromCourse
            ))
            return {
                status : 'OK',
                data : requiredQandA
            }
            
         }else{
            const requiredQandA =courseOfRequiredQandAPopulated?.posts
            return{
                status : 'OK',
                data : requiredQandA
            }
         }
       

    } catch (error) {
        throw new Error(`error at postActions.ts in getMyPosts : ${error}`)
    }
}

export async function createComment({
    postId , courseId , lessonFromCourse , body , id , isTeacher} : Props & {postId : string , isTeacher :boolean
    }){
    try {
        const isAnswer = isTeacher===true ? true : false
        connectToDB()
        const createdPost =  await Post.create({
            body ,
            author : id,
            isParent : false,
            lessonFromCourse, 
            courseId,
            isAnswer : isAnswer
        })
        await Post.findOneAndUpdate({_id : postId} , {$push :{ children : createdPost._id}})
        
    } catch (error) {
        throw new Error(`error at createComment : ${error}`)
    }
}