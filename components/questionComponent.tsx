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
    authorname,
    isTeacher,
    name
} : PostInterface & {authorname : string , isTeacher : boolean , name : string}) => {

    const [comment , setComment] = useState<boolean>(false)
    // console.log('here is the children' , children);

    const rearrangedArray = children.sort((a,b)=>{
        if(a.isAnswer && !b.isAnswer){
            return -1
        }if(!a.isAnswer && b.isAnswer){
            return 1
        }else{
            return 0
        }
    })

    const isThisQuestionAnswered = children.filter((item : any) => item.isAnswer === true)
    const gettingAnsweredby = isThisQuestionAnswered.map((item : any) => (
        item.author.name
    ))
   //TODO get the names of the people who answered
   
    
  return (
    <section className=' bg-orange-100 rounded-md w-full mb-2 p-2'>
        - {body}
        <div className=' flex flex-col px-3 gap-3 w-full'>
        <p className=' text-xs text-end w-full'>-{authorname}</p>
            <div className=' flex items-center w-full '>   
            <GoCommentDiscussion
             onClick={()=>setComment(!comment)}
             className=' hover:cursor-pointer mr-2 hover:scale-110 shadow-md'
             />
            
             {
                isThisQuestionAnswered.length > 0 ?
                <div className='flex items-center'>
                    <MdOutlineDone color='green'  />
                    <p className='text-green-500'>Answered by {gettingAnsweredby[0]}</p>
                </div>
                :null
             }
            
            
            </div>  
            {
                body ? <div> 
                            { comment ? 
                            <div>
                                {
                                    rearrangedArray.map((item : any , index : number) =>(
                                        <div key={index} className={` flex flex-col w-full ${ item.isAnswer && item.isAnswer? 'bg-gradient-to-br from-green-700 to-green-500 text-white shadow-lg rounded-md': 'bg-orange-50 '} p-2 relative rounded-md mb-2`}>   
                                            <p className=' mb-3'> {item.body} </p>
                                            <footer className=' text-xs absolute bottom-1 right-1 mt-2'>-{item.author.name}</footer>
                                        </div>
                                    ))
                                }
                                <CommentForm 
                                    id = {author}
                                    lessonFromCourse={lessonFromCourse}
                                    courseId={courseId}
                                    postId={id}
                                    isTeacher = {isTeacher}
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