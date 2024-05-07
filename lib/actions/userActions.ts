'use server'
import mongoose from "mongoose";
import { connectToDB } from "../mongoose";
import User from "../models/user";

export async function CreateUser(username : string , userId : string) {
    try {
        connectToDB()

        await User.findOneAndUpdate({ id : userId} ,
            {
                name : username,
                mongoUser : true
            }, {upsert : true})

       
        console.log('okkkkkkkkkkkkkk');
        
        return {status : "OK"}
    } catch (error) {
        throw new Error(`error at createUserForm : ${error}`)
    }
}