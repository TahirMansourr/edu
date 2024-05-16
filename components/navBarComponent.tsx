import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Indicator } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import ThemeToggler from './themeToggler'
import { currentUser } from '@clerk/nextjs/server'
import { getMongoUser } from '@/lib/actions/userActions'
import PendigStudentComponent from './pendigStudentComponent'
import { CourseInterface } from '@/lib/types'

const NavBarComponent = async () => {
  let isTeacher;
  const user = await currentUser()
  if(!user) isTeacher = false
  const mongoUser= await getMongoUser(user?.id!)
  if(!mongoUser){ isTeacher = false}
  if(Array.isArray(mongoUser)) {isTeacher = false}
  else{isTeacher = mongoUser?.isTeacher, console.log('this is your mongoUserbro' , mongoUser?.courses);
  }

  const newPendingStudents: boolean | undefined = mongoUser?.courses.some(item => item.newPending === true);

  return (
    <div className=' bg-gradient-to-tr from-slate-200 to-blue-600 py-4 px-3 flex justify-between items-center '>
        <h1>NavBar Component</h1>
        <div className=' flex items-center gap-6'>
         <Link href={''} className='line-through'>Apply for teaching</Link>
         <div className=' flex gap-3 items-center'>
            <SignedOut>             
              <SignInButton/>
            </SignedOut>
            <SignedIn>
            { isTeacher ?
            <div>
              {
                newPendingStudents && newPendingStudents ?
                <Indicator processing color='red' size={16} position='top-start'> 
                <PendigStudentComponent courses = {mongoUser?.courses} mongoId = {mongoUser?._id}/>
                </Indicator> :
                <PendigStudentComponent courses = {mongoUser?.courses} mongoId = {mongoUser?._id}/>
              
              }
             
            </div>
            
           : null }
            <Link href={'teacher'}>
              <div className=' p-3 bg-gradient-to-br from-blue-950 to to-blue-500 rounded-lg hover:scale-105 shadow-md text-white'>
              Dashboard
              </div>
              </Link>
              <ThemeToggler/>
              <UserButton afterSignOutUrl='/' />
              
            </SignedIn>
          
         </div>
         
        </div>
        
    </div>
  )
}

export default NavBarComponent