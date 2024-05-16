import Demo from '@/forms/createUserForm'
import { currentUser, User } from '@clerk/nextjs/server'
import React from 'react'
import { Loader } from '@mantine/core';
import { CreateUser } from '@/lib/actions/userActions';
import { redirect } from 'next/navigation';

const onBoarding = async () => {

     await currentUser().then(async (res : any) =>{
      if(res){
        await CreateUser(res.username , res.id , false).then((res:any) => res.status === 'OK' ? redirect('/teacher') : redirect('/'))
      }else{
        redirect('/')
      }
    })
    

   

  return (
    <div className=' h-screen flex items-center'>
       <div className=' h-screen flex items-center justify-center'>
            Creating Your user <Loader color="blue" type="dots" />;
        </div>
    </div>
    
  )
}

export default onBoarding