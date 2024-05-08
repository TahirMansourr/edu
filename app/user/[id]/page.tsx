import StudentPageComponent from '@/components/studentPageComponent'
import { getMongoUser } from '@/lib/actions/userActions'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'



const StudentPage = async ({Params} : {Params : string}) => {

  const user = await currentUser()
  if(!user) throw new Error('Clerk User not found in user/page.tsx')

  const mongoUser = await getMongoUser(user.id)

  console.log('this is your user' , mongoUser)
  return (
    <StudentPageComponent/>
  )
}

export default StudentPage