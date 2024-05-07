import mongoose from 'mongoose'
import { connectToDB } from '../mongoose'

async function CreateCourse() {
    connectToDB()
}