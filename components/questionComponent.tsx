'use client'
import CommentForm from '@/forms/commentForm';
import { PostInterface } from '@/lib/types';
import React, { useState } from 'react'
import { GoCommentDiscussion } from "react-icons/go";
import { MdOutlineDone } from "react-icons/md";

// i want to put the name of the person who asked the question
// i want to be able to put a form
const QuestionComponent = ({
    body,
    createdAt,
    author,
    isParent,
    children,
    lessonFromCourse,
    courseId,
    id
} : PostInterface) => {

    const [comment , setComment] = useState<boolean>(false)

  return (
    <section className=' bg-orange-100 rounded-md w-full mb-2 p-2'>
        {body}
        <div className=' flex flex-col px-3 gap-3 w-full'>
            <div className=' flex items-center w-full '>   
            <GoCommentDiscussion onClick={()=>setComment(!comment)} className=' hover:cursor-pointer mr-2'/>
            <MdOutlineDone color='green'  />
            <p className='text-green-500'>Answered</p>
            </div>  
            {
                body ? <div> 
                            { comment ? 
                                <CommentForm 
                                    id = {author}
                                    lessonFromCourse={lessonFromCourse}
                                    courseId={courseId}
                                    postId={id}
                                />
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