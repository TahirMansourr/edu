'use server'
import mongoose from 'mongoose'
import { connectToDB } from '../mongoose'
import Course from '../models/course'
import { currentUser } from '@clerk/nextjs/server'
import User from '../models/user'
import { CourseInterface } from '../types'

interface CourseTypes{
    name : string,
    content : string,
    videos : { title : string , video : string}[],
    coursePicture : string
  }
  
  

export async function CreateCourse(args : Omit<CourseInterface , 'posts'|'author'> , author : string) {
    try {
        connectToDB()

       const newCourse = await Course.findOneAndUpdate({_id : args._id},{
            name : args.name,
            content : args.content,
            videos : args.videos,
            author ,
            coursePicture : args.coursePicture
        } , {upsert : true})
        console.log('hrer')

        await newCourse.save()
        console.log(newCourse)
        
    } catch (error) {
        
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