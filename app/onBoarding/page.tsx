import Demo from '@/forms/createUserForm'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

const onBoarding = async () => {

    const user = await currentUser()
    console.log(user?.username);
    
    const userId = user?.id

  return (
    <div className=' h-screen flex items-center'>
        <Demo userId = {userId as string}/>
    </div>
    
  )
}

export default onBoarding