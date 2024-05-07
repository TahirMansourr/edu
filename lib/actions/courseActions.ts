'use server'
import mongoose from 'mongoose'
import { connectToDB } from '../mongoose'
import Course from '../models/course'
import { currentUser } from '@clerk/nextjs/server'
import User from '../models/user'

interface CourseTypes{
    name : string,
    content : string,
    videos : { title : string , video : string}[],
    coursePicture : string
  }
  
  

export async function CreateCourse(args : CourseTypes) {
    try {
        connectToDB()
        const user = await currentUser()
        if(!user) throw new Error('user does not exitst')
        const mongoUser = await User.findOne({id : user.id})
        if(!mongoUser) throw new Error('mongoUser not found')

       const newCourse = await Course.create({
            name : args.name,
            content : args.content,
            videos : args.videos,
            author : mongoUser._id,
            coursePicture : args.coursePicture
        })
        console.log('hrer')

        await newCourse.save()
        console.log(newCourse)
        
    } catch (error) {
        
    }
}