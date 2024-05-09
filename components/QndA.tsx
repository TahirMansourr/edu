'use client'
import QuestionForm from '@/forms/questionForm'
import { getMyCourses } from '@/lib/actions/courseActions'
import { getMyPosts } from '@/lib/actions/postActions'
import React, { useEffect, useState } from 'react'

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
      }else return;
    }
    getContentforQandA()
  },[lessonFromCourse])
  
 
  return (
    <div className='flex flex-col w-full relative'>
      <h1 className=' mx-auto font-bold text-lg shadow-sm'> Q & A</h1>
      <section>
        <div> hey teacher i have some questions i would like to ask you</div>
      </section>
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