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

  const newPendingStudents: boolean | undefined = mongoUser?.courses && mongoUser.courses.length > 0 ? mongoUser?.courses.some(item => item.newPending === true) : undefined;

  return (
    <div className=' bg-gradient-to-tr from-slate-200 to-blue-600 sm:py-4 sm:px-3 sm:flex sm:justify-between sm:items-center flex items-center justify-center p-1  '>
        <Link href={'/'}><h1 className='sm:font-bold sm:text-5xl sm:italic hidden '>EDU</h1></Link>
        <div className=' flex items-center sm:gap-6 gap-1'>
         <Link href={''} className='line-through hidden'>Apply for teaching</Link>
         <div className=' flex sm:gap-3 items-center gap-1'>
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
              <div className=' sm:p-3 bg-gradient-to-br from-blue-950 to to-blue-500 sm:rounded-lg hover:scale-105 shadow-md text-white text-sm p-1 rounded-md'>
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