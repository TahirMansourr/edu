'use client'
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Loader } from '@mantine/core';
import Image from "next/image";
import ielts from '.././public/photo_album-image_placeholder-thumbnail-image-book-album-picture-512.webp'
import { Boogaloo } from "next/font/google";
import { Pattaya } from "next/font/google";
import bankak from '../public/bankak.jpeg'
import Link from "next/link";
import { useEffect, useState } from 'react';
import { CourseInterface } from '@/lib/types';
import { getMyCourses, PendingStudentsForCourse } from '@/lib/actions/courseActions';

const georama = Boogaloo({
  weight : '400',
  subsets : ["latin"]
})

const pattaya = Pattaya({
  weight : "400",
  subsets :["latin"]
})

const CourseComponent = ({mongoId , courses , isTeacher} :
     {mongoId : string | undefined, courses : any[] | undefined , isTeacher : boolean}) => {

    const [opened, { open, close }] = useDisclosure(false);
    const [bankakk , setBankak] = useState<boolean>(false)
    const [mongoUserCourses , setMongoUserCourses] = useState<CourseInterface[]>()
    const [theItemId , setTheItemId] = useState<string>('')
    const [loading , setLoading] = useState<boolean>(false)
    const [res , setRes] = useState<string>()

    useEffect(()=>{
        async function getMyCoursesAtStart(){
            const courses = await getMyCourses()
            setMongoUserCourses(courses as CourseInterface[])
            // console.log(mongoUserCourses);
        }
        getMyCoursesAtStart()
        // console.log(mongoId)
    },[])

    async function handleCompletedPayment(requesterId : string , courseId : string){
        setLoading(true)
        await PendingStudentsForCourse(requesterId , courseId).then((res) =>(
         res.status === "OK" ? setRes(res.message) : setRes(res.message)
         ))
         setLoading(false)
        console.log(courseId);
        
    }
  return (
    <main className=" min-h-screen flex flex-col pt-4 ">
        <h1 className=' text-center'>Sign in as a demo student (username : demoStudent , password : demoStudent123)</h1>
        {
            mongoUserCourses ? mongoUserCourses.map((item : CourseInterface , index : number)=>(
     <section className="sm:flex  flex flex-col w-screen justify-center items-center " key={index}>
        <section 
        className="sm:flex sm:justify-between  sm:mx-auto sm:items-center sm:border
                   sm:p-4 sm:rounded-xl sm:shadow-md w-[90%] border p-2 rounded-md mb-2">
            <div className={`${georama.className} flex flex-col text-lg sm:w-full`}>

              <div className="underline">
                  Course Name
              </div>
              <div className=' pb-3'>
                  {item.name}
              </div>
              <div className="underline">
                  Course Content
              </div>
              <div className=" max-w-[80%]">
                   {item.content}
              </div>
              <br/>
              <div className=" underline">
                  Course Teacher
              </div>
              <div className=" max-w-[80%]">
                  {item.author.name }
              </div>
              <br />
              <div className="flex ">
                <div className="sm:flex sm:gap-5 flex flex-col gap-2">
                <div>{item.duration? <p>Duration {item.duration }</p>: null}</div>
                <div>{item.price? <p>Price : {item.price}</p>:null}</div>
                { isTeacher == false ?
                <Button 
                className=''
                    onClick={
                    ()=>{ open(); setTheItemId(item._id); console.log(theItemId)}
                    }>
                        Get Course
                </Button>
                   : null }
                </div>
                  
                <Modal opened={opened} onClose={()=>{close() ; setBankak(!bankakk)}} title="Payment Method">
                    {
                        mongoId ? !bankakk ?
                        <Image 
                            src={bankak}
                            width={200}
                            height={200}
                            alt='bankak'
                            className=' rounded-full hover:cursor-pointer'
                            onClick={()=> setBankak(!bankakk)}
                        />
                        : 
                        
                        <div>
                            <div className='flex flex-col'>
                            
                           <h1 className='mb-2'> Send the amount on to account number <b className=' underline'>123456</b> and <b>write your username</b> on the comment section.</h1>
                           <br/>
                            <p className='mb-2'> REMEBER: ALWAYS MAKE A SCREENSHOT OF YOUR TRANSACTIONS.</p>
                            <p className='mb-2'> You should be admitted within 24 hours.If you are not admitted within 24 hours please contact  us at eduemail@gmail.com</p>
                            </div>
                          <div className=' w-full flex justify-center'>
                          <Button onClick={()=> { mongoId &&  handleCompletedPayment(mongoId , theItemId ) }}>
                           {res ? res : loading? <div className=' flex items-center'> Requesting <Loader></Loader></div> : "Completed Payment"}</Button>
                          </div>
                        </div> : <div>Please Sign in or Sign Up to getCourse</div>
                    }
                   
                </Modal>
                
              </div>
            </div>
            <Image 
              src={item.coursePicture === ''? ielts : item.coursePicture as string}
              alt="Course Image"
              width={300}
              height={300} 
              className=" rounded-lg shadow-lg"
              />
        </section>
    </section>
            )) : null
        }
    
  </main>
  )
}

export default CourseComponent