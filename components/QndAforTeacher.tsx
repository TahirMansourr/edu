'use client'
import { getMyPosts } from '@/lib/actions/postActions'
import React, { useEffect, useState } from 'react'
import QuestionComponent from './questionComponent'

interface Props {
    id : string ,
    courseId : string 
  }

const QndAforTeacher = ({ id , courseId} : Props) => {

    const [content , setContent] = useState<any []>()

    useEffect(()=>{
        async function getContentAtStart() {
            const content = await getMyPosts({lessonFromCourse : 'null', courseId , isTeacher : true})
            setContent(content.data)
        }
        getContentAtStart()
    })

  return (
    <div>
        {content && content?.length > 0 ? 
        content.map((item : any , index : number) => (
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
             />
        ))
        
        : <h1>no questions yet</h1>}
    </div>
  )
}

export default QndAforTeacher