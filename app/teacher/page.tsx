
import React from 'react'
import TeacherComponent from '@/components/teacherComponent'
import { currentUser } from '@clerk/nextjs/server'
import { getMongoUser } from '@/lib/actions/userActions'
import { mongoUserInterface } from '@/lib/types'
import StudentPageComponent from '@/components/studentPageComponent'
import { redirect } from 'next/navigation'


const TeacherPage = async ({Params} : {Params : string}) => {
    const user = await currentUser()
    if(!user) throw new Error('Clerk User not found in user/page.tsx')

    const mongoUser  = await getMongoUser(user.id) as mongoUserInterface
    if(!mongoUser) throw redirect('/onBoarding')

  console.log(mongoUser)
  const pageComponent = mongoUser.isTeacher ?
   <TeacherComponent mongoUser = {mongoUser} /> 
   : <StudentPageComponent mongoUser={mongoUser} />


  return pageComponent
}

export default TeacherPage