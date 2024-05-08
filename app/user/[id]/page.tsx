import StudentPageComponent from '@/components/studentPageComponent'
import { getMongoUser } from '@/lib/actions/userActions'
import { mongoUserInterface } from '@/lib/types'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'



const StudentPage = async ({Params} : {Params : string}) => {

  const user = await currentUser()
  if(!user) throw new Error('Clerk User not found in user/page.tsx')

  const mongoUser  = await getMongoUser(user.id) as mongoUserInterface
  if(!mongoUser) throw new Error('mongoUser not found')

  console.log(mongoUser)
  
  /////////TODO convert mongoUserToPlain Object
  

  return (
    <StudentPageComponent mongoUser={mongoUser}/>
  )
}

export default StudentPage