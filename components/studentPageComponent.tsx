'use client'
import React, { useState } from 'react'
import VideoPlayer from '@/components/videoPlayer'
import Video from 'next-video';
import vid from '../videos/vid.mp4'
import { courses } from '@/components/dummyData';
import { Open_Sans } from 'next/font/google'
import { FaPlayCircle } from "react-icons/fa";
import { connectToDB } from '@/lib/mongoose';
import { getMyCourses } from '@/lib/actions/courseActions';
import { mongoUserInterface } from '@/lib/types';
import QndA from './QndA';

const openSan = Open_Sans({
    weight :"300",
    subsets : ["latin"]
})

const StudentPageComponent = ({ mongoUser} : {mongoUser : mongoUserInterface}) => {

    const [requiredCourse , setRequiredCourse] = useState<any>()
    const [selectedCourse , setSelectedCourse] = useState<string | null>(null)
    const [selectedLesson , setSelectedLesson] = useState<String | null>(null)
    const [selectedCourseIdforQndA , setSelectedCourseIdforQndA] = useState<string>()
    const [wantedVideo , setWantedVideo] = useState<string>()

    const handleSelectedCourse = (name : string , decider : string)=>{

        if(decider === 'C'){
        setSelectedCourse(name)
        const req = mongoUser.courses.find((item) => item.name === name)
        setRequiredCourse(req)
        setSelectedLesson(null)
        }else if(decider === 'L'){
        setSelectedLesson(name)
        const vid = requiredCourse.videos.find((item : any)=> item.title === name)
        setWantedVideo(vid.video)
        }        
    }


  return (
    <main className={`sm:flex sm:flex-col border sm:m-5 ${openSan.className}`}>
        <section className=' sm:flex sm:gap-5 sm:p-3'>
            <div className=' sm:flex-none sm:w-[15rem] sm:border-r sm:pr-2 p-3 border shadow-md m-3'>
                <div className='flex flex-col gap-3 '>
                    <div className=' font-bold mx-auto text-xl shadow-sm mb-5'>
                        {mongoUser.name}
                    </div>
                    <div className=''>
                        <h1 className=' font-bold  shadow-sm'>My Courses</h1>
                            {mongoUser.courses.map((item : any , index : number) =>(
                                <div 
                                key={index}
                                className={`hover:cursor-pointer ${selectedCourse === item.name ? 'ease-in duration-300 text-white bg-blue-400 rounded-md transit w-fit px-3 py-1 scale-105 translate-x-1 m-2 shadow-lg' : null}` }
                                onClick={() => {
                                    handleSelectedCourse(item.name , 'C')
                                    setSelectedCourseIdforQndA(item._id)
                                }}
                                >
                                    {item.name} 
                                </div> 
                               )
                            )}
                    </div>
                </div>
            </div>
            <div className=' flex flex-initial flex-col gap-3 sm:w-[45rem] sm:border-r border m-2 p-1 shadow-md mb-2 '>
                
            <div className='ease-in-out mx-auto font-bold text-lg p-2 shadow-lg transition-all duration-500 rounded-md'>
                {selectedCourse}
            </div>
                { wantedVideo ? 
                <VideoPlayer videoUrl = {wantedVideo}/> : <h1 className=' sm:min-h-[30rem]'>Choose a course then choose a lesson</h1>}
                <div className=' mt-5 ml-2'>Rest of the lessons</div>
                <div>    
                      {requiredCourse?.videos.map((item : any , index : number) => (
                        <div className='flex items-center gap-2 ml-1'>
                            <FaPlayCircle 
                            color={selectedLesson === item.title ? 'rgb(0,225,225)' : 'black'}
                            size={selectedLesson === item.title ? 25 : 15}
                            />
                            <div 
                            key={index}
                            className={`hover:cursor-pointer ${selectedLesson === item.title ? 'ease-in-out duration-300 text-white bg-blue-400 rounded-md transit w-fit px-3 py-1 scale-105 translate-x-1 m-2 shadow-lg' : null}`}
                            onClick={() => handleSelectedCourse(item.title , 'L')}
                            >
                             {item.title}
                            </div>
                        </div>
                      ))}
                </div>
            </div>
            <div className=' sm:flex sm:flex-initial sm:w-[40rem] border shadow-md p-2'>
               <QndA 
               id = {mongoUser._id}
               courseId = {selectedCourseIdforQndA as string}
               lessonFromCourse = {selectedLesson as string}
               isTeacher = {mongoUser.isTeacher}
               />
            </div>
        </section >
    </main>
  )
}

export default StudentPageComponent