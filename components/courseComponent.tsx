'use client'
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import Image from "next/image";
import ielts from '.././public/ielts.png'
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

const CourseComponent = ({mongoId , courses} : {mongoId : string | undefined, courses : any[] | undefined}) => {

    const [opened, { open, close }] = useDisclosure(false);
    const [bankakk , setBankak] = useState<boolean>(false)
    const [mongoUserCourses , setMongoUserCourses] = useState<CourseInterface[]>()
    const [theItemId , setTheItemId] = useState<string>('')

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
        await PendingStudentsForCourse(requesterId , courseId)
        console.log(courseId);
        
    }
  return (
    <main className=" min-h-screen flex flex-col pt-4">
        {
            mongoUserCourses ? mongoUserCourses.map((item : CourseInterface , index : number)=>(
     <section className="flex w-screen" key={index}>
        <section className="flex justify-between w-[90%] mx-auto items-center border p-4 rounded-xl shadow-md">
            <div className={`${georama.className} flex flex-col text-lg`}>

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
              <div className="flex justify-around w-full items-center">
                <div className="flex gap-5">
                <div>duration : 10 hours</div>
                <div>rating : *****</div>
                </div>
               
                <Button 
                    onClick={
                    ()=>{ open(); setTheItemId(item._id); console.log(theItemId)}
                    }>
                        Get Course
                </Button>

                <Modal opened={opened} onClose={()=>{close() ; setBankak(!bankakk)}} title="Payment Method">
                    {
                        !bankakk ?
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
                            <h1> Send the amount on to account number <b className=' underline'>432432</b> and <b>write your username</b> on the comment section.</h1>
                            <p> REMEBER: ALWAYS MAKE A SCREENSHOT OF YOUR TRANSACTIONS.</p>
                            <p> You should be admitted within 24 hours.If you are not admitted within 24 hours please contact  us at eduemail@gmail.com</p>
                            </div>
                          <Button onClick={()=> { mongoId &&  handleCompletedPayment(mongoId , theItemId ) }}>Completed payment</Button>
                        </div>
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