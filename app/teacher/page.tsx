
import React from 'react'
import TeacherComponent from '@/components/teacherComponent'
import { currentUser } from '@clerk/nextjs/server'
import { getMongoUser } from '@/lib/actions/userActions'
import { mongoUserInterface } from '@/lib/types'
import StudentPageComponent from '@/components/studentPageComponent'
import { redirect } from 'next/navigation'
import { Loader } from '@mantine/core';

const TeacherPage = async () => {
    const user = await currentUser()
    console.log(user?.username);
    
    if(!user) redirect('/')

    const mongoUser  = await getMongoUser(user.id) as mongoUserInterface
    if(!mongoUser) redirect('/onBoarding')

  console.log(mongoUser)
  const pageComponent = mongoUser.isTeacher ?
     <TeacherComponent mongoUser = {mongoUser} /> 
   : <StudentPageComponent mongoUser={mongoUser} />


  return pageComponent
}

export default TeacherPage