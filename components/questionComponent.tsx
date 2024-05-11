'use client'
import CommentForm from '@/forms/commentForm';
import { PostInterface } from '@/lib/types';
import React, { useState } from 'react'
import { GoCommentDiscussion } from "react-icons/go";
import { MdOutlineDone } from "react-icons/md";

const QuestionComponent = ({
    body,
    createdAt,
    author,
    isParent,
    children,
    lessonFromCourse,
    courseId,
    id, 
    authorname
} : PostInterface & {authorname : string}) => {

    const [comment , setComment] = useState<boolean>(false)
    console.log('here is the children' , children);
    
  return (
    <section className=' bg-orange-100 rounded-md w-full mb-2 p-2'>
        - {body}
        <div className=' flex flex-col px-3 gap-3 w-full'>
            <div className=' flex items-center w-full '>   
            <GoCommentDiscussion
             onClick={()=>setComment(!comment)}
             className=' hover:cursor-pointer mr-2'/>
            <MdOutlineDone color='green'  />
            <p className='text-green-500'>Answered</p>
            </div>  
            {
                body ? <div> 
                            { comment ? 
                            <div>
                                {
                                    children.map((item : any , index : number) =>(
                                        <div key={index} className=' flex flex-col w-full bg-orange-50 p-2 relative mb-2'>   
                                            <p className=' mb-3'> {item.body} </p>
                                            <footer className=' text-xs absolute bottom-1 right-1 mt-2'>-{item.author.name}</footer>
                                            {/* <p> {item.createdAt.toString()} </p> */}
                                        </div>
                                    ))
                                }
                                <CommentForm 
                                    id = {author}
                                    lessonFromCourse={lessonFromCourse}
                                    courseId={courseId}
                                    postId={id}
                                />
                            </div>
                                
                            :null
                            }
                        </div> 
                     : null
            }
        </div>
    </section>
  )
}

export default QuestionComponent