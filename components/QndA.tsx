'use client'
import QuestionForm from '@/forms/questionForm'
import { getMyCourses } from '@/lib/actions/courseActions'
import { getMyPosts } from '@/lib/actions/postActions'
import React, { useEffect, useState } from 'react'
import qanda2 from '../public/qanda2.jpeg'
import Image from 'next/image'
import QuestionComponent from './questionComponent'
import { ScrollArea } from '@mantine/core'


interface Props {
  id : string ,
  courseId : string ,
  lessonFromCourse :string,
  isTeacher : boolean
}
const QndA =  (
  {id , courseId , lessonFromCourse , isTeacher} : Props
) => {
  
  const [content , setContent] = useState<any []>([])

  useEffect(()=>{
    
    async function getContentforQandA(){
      if(lessonFromCourse){
      const content = await getMyPosts({courseId , lessonFromCourse , isTeacher})
      setContent(content.data)
      }else return;
    }
    getContentforQandA()
  },[lessonFromCourse])
  
 
  return (
    <div className='flex flex-col w-full relative'>
      <h1 className=' mx-auto font-bold text-lg shadow-sm'> Q & A</h1>
      
     { content.length > 0 ?
     <ScrollArea.Autosize mah={420}>
      <section>
        {
          content.map((item : any , index : number) =>(
            <QuestionComponent 
              key={index}
              id = {item._id}
              body={item.body}
              createdAt={item.createdAt}
              author={id}
              isParent = {item.isParent}
              children={item.children}
              lessonFromCourse={item.lessonFromCourse}
              courseId={item.courseId}
              authorname = {item.author.name}
              isTeacher = {isTeacher}
             />
          ))
        }
      </section>
      </ScrollArea.Autosize>
      
    : 
    <section >
        <Image 
        src={qanda2}
        alt='q and a section'
        className='w-full h-fit absolute -top-1  '
        />
    </section>
   }
      { 
      lessonFromCourse?
      <footer className=' sm:absolute sm:bottom-0 w-full pt-3'>
        <QuestionForm 
          id = {id}
          courseId={courseId}
          lessonFromCourse={lessonFromCourse}
        />
      </footer> : null}
    </div>
  )
}

export default QndA