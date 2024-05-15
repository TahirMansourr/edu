'use server'
import mongoose from 'mongoose'
import { connectToDB } from '../mongoose'
import Course from '../models/course'
import { currentUser } from '@clerk/nextjs/server'
import User from '../models/user'
import { CourseInterface } from '../types'
import { courses } from '@/components/dummyData'


export async function CreateCourse(args : Omit<CourseInterface , 'posts'|'author'> , author : string) {
    try {
         connectToDB()
         const message = args._id != '' ? 'Successfully updated' : 'Successfully created'
        if(args._id != '' ){
            const newCourse = await Course.findOneAndUpdate({_id : args._id},{
                name : args.name,
                content : args.content,
                videos : args.videos,
                author ,
                coursePicture : args.coursePicture
            } , {upsert : true , new: true })
            await newCourse.save()
        }else{
            const newCourse = await Course.create({
                name : args.name,
                content : args.content,
                videos : args.videos,
                author ,
                coursePicture : args.coursePicture
            })

           await newCourse.save()
            const updatedUser = await User.findOneAndUpdate(
                { _id: author  },
                { $push : {courses : newCourse} }
               ,{upsert : true} );
              await updatedUser.save();
            }
            return {
                status : 'OK',
                message  
            }
    } catch (error : any) {
        throw new Error( `error ${error}`)
    }
}

export async function getMyCourses() {
    try {
        connectToDB(); 

        const courses = await Course.find().populate({path : 'author' , model : User} ).lean();

        return courses; 
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error; 
    }
}

export async function PendingStudentsForCourse( mongoId : string , courseId : string){
    try {
        connectToDB()
        const requiredCourse = await Course.findOneAndUpdate({_id : courseId} ,
             {$push : {
                pendingStudents : {
                    student : mongoId ,
                     course : courseId
                    }}} , {upsert : true})
        await requiredCourse.save()
        return {status : 'Ok' , message : 'pending'}
    } catch (error) {
        throw new Error(`error at pendingStudentForCourse : ${error}`)
    }
}