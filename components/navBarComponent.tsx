import { UserButton } from '@clerk/nextjs'
import { Button } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import ThemeToggler from './themeToggler'

const NavBarComponent = () => {
  return (
    <div className=' bg-gradient-to-tr from-slate-200 to-blue-600 py-4 px-3 flex justify-between  '>
        <h1>NavBar Component</h1>
        <div>
         <Link href={''}>Apply for teaching</Link>
         <ThemeToggler/>
         <UserButton/>
        </div>
        
    </div>
  )
}

export default NavBarComponent