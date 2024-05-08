'use server'
import mongoose from "mongoose";
import { connectToDB } from "../mongoose";
import User from "../models/user";
import Course from "../models/course";

export async function CreateUser(username : string , userId : string , isTeacher : boolean) {
    try {
        connectToDB()

        await User.findOneAndUpdate({ id : userId} ,
            {
                name : username,
                mongoUser : true,
                isTeacher
            }, {upsert : true})
        
        return {status : "OK"}
    } catch (error) {
        throw new Error(`error at createUserForm : ${error}`)
    }
}

export async function getMongoUser(userId : string){
    try {
        connectToDB()
        const mongoUser = await User.findOne({id : userId})
        .populate({
            path : 'courses',
            model : Course
        }).lean(    )
        return mongoUser
    } catch (error) {
        throw new Error(`Error at userActions.tsx at getMongoUser : ${error}`)
    }
}