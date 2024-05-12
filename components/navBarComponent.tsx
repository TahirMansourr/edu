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
         <ThemeToggler/>
         
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn >
              <UserButton afterSignOutUrl='/' />
            </SignedIn>
          
         </div>
         
        </div>
        
    </div>
  )
}

export default NavBarComponent