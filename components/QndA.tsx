'use client'
import QuestionForm from '@/forms/questionForm'
import { getMyCourses } from '@/lib/actions/courseActions'
import { getMyPosts } from '@/lib/actions/postActions'
import React, { useEffect, useState } from 'react'
import qanda2 from '../public/qanda2.jpeg'
import Image from 'next/image'
import QuestionComponent from './questionComponent'


interface Props {
  id : string ,
  courseId : string ,
  lessonFromCourse :string
}
const QndA =  (
  {id , courseId , lessonFromCourse} : Props
) => {
  
  const [content , setContent] = useState<any []>([])

  useEffect(()=>{
    
    async function getContentforQandA(){
      if(lessonFromCourse){
      const content = await getMyPosts({courseId , lessonFromCourse})
      setContent(content.data)
      }else return;
    }
    getContentforQandA()
  },[lessonFromCourse])
  
 
  return (
    <div className='flex flex-col w-full relative'>
      <h1 className=' mx-auto font-bold text-lg shadow-sm'> Q & A</h1>
      <section >
        {/* <Image 
         src={qanda2}
         alt='q and a section'
         className='w-full h-fit absolute -top-7  '
         /> */}
      </section>
     { content?
      <section>
        {
          content.map((item : any , index : number) =>(
            <QuestionComponent 
              id = {item._id}
              body={item.body}
              createdAt={item.createdAt}
              author={id}
              isParent = {item.isParent}
              children={item.children}
              lessonFromCourse={item.lessonFromCourse}
              courseId={item.courseId}
              authorname = {item.author.name}
             />
          ))
        }
      </section>
      
    : <h1>Choose a lesson</h1> }
      { lessonFromCourse?
      <footer className=' absolute bottom-0 w-full'>
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