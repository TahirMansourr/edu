'use client'
import React from 'react'
import { Open_Sans } from 'next/font/google'
import { Button } from '@mantine/core'
import CreateNewCourse from '@/forms/createNewCourse'
import { UploadButton } from "../../../lib/uploadthing";

const openSan = Open_Sans({
    weight :"300",
    subsets : ["latin"]
})

const TeacherPage = ({Params} : {Params : string}) => {
  return (
    <main className={`flex flex-col border m-5 ${openSan.className}`}>
    <section className=' flex gap-5 p-3'>
        <div className=' flex-none w-[15rem] border-r'>
            <div className='flex flex-col gap-3 '>
                <div className=' font-bold'>
                    Teacher's name
                </div>
                <div className=' gap-3 flex flex-col'>
                    <ul>
                        <li>Course 1</li>
                        <li>Course 2</li>
                        <li>Course 3</li>
                    </ul>
                    <div className=' mx-auto mt-5'>
                    <Button >Add new Course</Button>
                    </div>
                
                </div>
            </div>
        </div>
        <div className=' flex flex-initial flex-col gap-3 w-[45rem] border-r'>
            <div className=' mx-auto font-bold'>Course Name</div>
            <div className=''>
                <CreateNewCourse/>
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

export default TeacherPage