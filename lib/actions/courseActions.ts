'use server'
import mongoose from 'mongoose'
import { connectToDB } from '../mongoose'
import Course from '../models/course'
import { currentUser } from '@clerk/nextjs/server'
import User from '../models/user'
import { CourseInterface } from '../types'
import { courses } from '@/components/dummyData'

interface CourseTypes{
    name : string,
    content : string,
    videos : { title : string , video : string}[],
    coursePicture : string
  }
  
  

export async function CreateCourse(args : Omit<CourseInterface , 'posts'|'author'> , author : string) {
    try {
         connectToDB()
        
        
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
    } catch (error : any) {
        throw new Error( `error ${error}`)
    }
}

//This one will probably be depricated
export async function getMyCourses () {
    try {
        connectToDB()
        const user = await currentUser()
        if(!user) throw new Error('user does not exitst')
        const mongoUser = await User.findOne({id : user.id})
        .populate({
            path : "courses",
            model : Course
        })
        if(!mongoUser) throw new Error('mongoUser not found')
        console.log('user from the inside' , mongoUser)
    
        
    } catch (error) {
        
    }
}