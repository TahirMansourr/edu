import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Button } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import ThemeToggler from './themeToggler'

const NavBarComponent = () => {
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