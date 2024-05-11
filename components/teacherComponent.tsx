'use client'
import React, { useState } from 'react'

import { Open_Sans } from 'next/font/google'
import { Button } from '@mantine/core'
import CreateNewCourse from '@/forms/createNewCourse'
import { UploadButton } from "../lib/uploadthing";
import { mongoUserInterface } from '@/lib/types'


const openSan = Open_Sans({
    weight :"300",
    subsets : ["latin"]
})

const TeacherComponent = ({mongoUser} : {mongoUser : mongoUserInterface}) => {

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
        <div className=' flex-none w-[15rem] border-r'>
            <div className='flex flex-col gap-3 '>
                <div className=' font-bold mx-auto text-xl shadow-sm mb-5'>
                    {mongoUser.name}
                </div>
                <div>
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
                    <div className=' mt-5 w-full flex justify-center'>
                    <Button className=' mx-auto' >Add new Course</Button>
                    </div>
                
                
                </div>
               
            </div>
        </div>
        <div className=' flex flex-initial flex-col gap-3 w-[45rem] border-r'>
            <div className=' mx-auto font-bold'>Course Name</div>
            <div className=''>
                <CreateNewCourse requiredCourse = {requiredCourse}/>
            </div>
            <div className=''>rest of course</div>
        </div>
        <div className=' flex flex-col flex-initial w-[20rem] gap-3'>
            <div className=' mx-auto font-bold'>Q&A</div>
            <div>
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                </ul>
            </div>
        </div>
    </section >
    </main>
  )
}

export default TeacherComponent