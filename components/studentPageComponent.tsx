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

    const handleSelectedCourse = (name : string , decider : string)=>{

        if(decider === 'C'){
        setSelectedCourse(name)
        const req = mongoUser.courses.find((item) => item.name === name)
        setRequiredCourse(req)
        setSelectedLesson(null)
        }else if(decider === 'L'){
        setSelectedLesson(name)
        }        
    }


  return (
    <main className={`flex flex-col border m-5 ${openSan.className}`}>
        <section className=' flex gap-5 p-3'>
            <div className=' flex-none w-[15rem] border-r pr-2'>
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
                                    // getMyCourses()
                                }}
                                >
                                    {item.name} 
                                </div> 
                               )
                            )}
                            
                        
                    </div>
                </div>
            </div>
            <div className=' flex flex-initial flex-col gap-3 w-[45rem] border-r'>
                
            <div className='ease-in-out mx-auto font-bold text-lg p-2 shadow-lg transition-all duration-500 rounded-md'>{selectedCourse}</div>

                <div className='rounded-lg mx-auto'></div>
                <VideoPlayer/>
                <div className=' mt-5'>Rest of the lessons</div>
                <div>    
                      {requiredCourse?.videos.map((item : any , index : number) => (
                        <div className='flex items-center gap-2'>
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
            <div className=' flex flex-initial w-[30rem]'>
               <QndA 
               id = {mongoUser._id}
               courseId = {selectedCourseIdforQndA as string}
               lessonFromCourse = {selectedLesson as string}
               />
            </div>
        </section >
    </main>
  )
}

export default StudentPageComponent