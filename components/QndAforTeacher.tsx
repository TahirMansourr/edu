'use client'
import { getMyPosts } from '@/lib/actions/postActions'
import React, { useEffect, useState } from 'react'
import QuestionComponent from './questionComponent'
import { Accordion } from '@mantine/core';

interface Props {
    id : string ,
    courseId : string 
  }

const QndAforTeacher = ({ id , courseId} : Props) => {

    const [content , setContent] = useState<any []>()

    useEffect(()=>{
        async function getContentAtStart() {
            const content = await getMyPosts({lessonFromCourse : 'null', courseId , isTeacher : true})
            const groupedContent = content.data.reduce((grouped : any, item : any) => {
                // Check if there's already an array for this lessonFromCourse
                if (!grouped[item.lessonFromCourse]) {
                    // If not, create a new array for it
                    grouped[item.lessonFromCourse] = [];
                }
                // Push the item to the corresponding array
                grouped[item.lessonFromCourse].push(item);
                return grouped;
            }, {});
            const contentArray = Object.entries(groupedContent).map(([lessonFromCourse, items]) => ({
                lessonFromCourse,
                items
            }));
            console.log(contentArray)
            setContent(contentArray)
        }
        getContentAtStart()
    } ,[courseId])

  return (
    <div className=' w-full'>
        {content && content?.length > 0 ? 
        <Accordion>
            { content.map((item : any , index : number) => (
                    <Accordion.Item key={index} value={item.lessonFromCourse} >
                        <Accordion.Control >{item.lessonFromCourse}</Accordion.Control>
                        <Accordion.Panel>
                            { item.items.map((item : any , index : number) =>(
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
                             }
                        </Accordion.Panel>
                    </Accordion.Item>
                ))}
        </Accordion>
        : <h1>no questions yet</h1>}
    </div>
  )
}

export default QndAforTeacher
