'use client'
import React, { useState } from 'react'
import { Open_Sans } from 'next/font/google'
import { Button } from '@mantine/core'
import CreateNewCourse from '@/forms/createNewCourse'
import { CourseInterface, mongoUserInterface } from '@/lib/types'
import QndAforTeacher from './QndAforTeacher'


const openSan = Open_Sans({
    weight :"300",
    subsets : ["latin"]
})

const TeacherComponent = ({mongoUser} : {mongoUser : mongoUserInterface}) => {

    const [requiredCourse , setRequiredCourse] = useState<CourseInterface>()
    const [selectedCourse , setSelectedCourse] = useState<string | null>(null)


    const handleSelectedCourse = (name : string )=>{

        setSelectedCourse(name)
        const req = mongoUser.courses.find((item) => item.name === name)
        setRequiredCourse(req)
        console.log(requiredCourse);

    }
  return (
    <main className={`sm:flex sm:flex-col sm:border m-5 ${openSan.className}`}>
    <section className=' sm:flex sm:gap-5 sm:p-3 '>
        <div className=' sm:flex-none sm:w-[15rem] sm:border-r border shadow-sm pb-2'>
            <div className='flex flex-col gap-3 '>
                <div className=' font-bold mx-auto text-xl shadow-sm sm:mb-5 mb-2'>
                    {mongoUser.name}
                </div>
                <div>
                <h1 className=' font-bold sm:shadow-sm sm:mb-3 p-2'>My Courses</h1>
                {mongoUser.courses && mongoUser.courses.map((item : any , index : number) =>(
                                <div 
                                key={index}
                                className={`hover:cursor-pointer p-1 ${selectedCourse === item.name ? 'ease-in duration-300 text-white bg-blue-400 rounded-md transit w-fit px-3 py-1 scale-105 translate-x-1 m-2 shadow-lg' : null}` }
                                onClick={() => {
                                    handleSelectedCourse(item.name )
                                }}
                                >
                                    {item.name} 
                                </div> 
                               )
                            )}
                    <div className=' mt-5 w-full flex justify-center'>
                    <Button 
                    className=' mx-auto'
                    onClick={ ()=> setRequiredCourse({
                        name: '',
                        content: '' , 
                        videos : [{title : '' , video :''}] ,
                        coursePicture :  '',
                        _id :  ''
                    } as CourseInterface) }
                    >Add new Course</Button>
                    </div>       
                </div>              
            </div>
        </div>
        <div className=' sm:flex sm:flex-initial sm:flex-col sm:gap-3 sm:w-[38rem] sm:border-r border p-1 mt-2 sm:pr-4 '>
            <div className=' mx-auto font-bold'>{selectedCourse}</div>
            <div className='w-full mx-auto '>{
                requiredCourse ?
                <CreateNewCourse 
                 requiredCourse = {requiredCourse}
                 mongoUserId= {mongoUser._id}
                 /> : <h1 className=' text-center font-bold sm:p-4 sm:mt-3 mt-1 shadow-xl bg-gradient-to-br from-blue-700 to-blue-400 text-white rounded-lg mx-auto'>Choose a course to Update or Add a new Course</h1>}
            </div>
        </div>
        <div className=' flex flex-col flex-initial sm:w-[40rem] gap-3'>
            {requiredCourse ? <div className=' mx-auto font-bold '>Q&A</div> : null}
            { requiredCourse &&
                requiredCourse ? 
                <QndAforTeacher
                    id={mongoUser._id}
                    name = {mongoUser.name}
                    isTeacher = {mongoUser.isTeacher}
                    courseId={requiredCourse._id}
                    /> 
              : <h1 className=' text-center font-bold sm:p-4 sm:mt-3 mt-1 shadow-xl bg-gradient-to-br from-blue-700 to-blue-400 text-white rounded-lg mx-auto'>Choose Course to see Q&A Section</h1>
            }
           
        </div>
    </section >
    </main>
  )
}

export default TeacherComponent