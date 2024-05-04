'use client'
import { useMantineColorScheme, Button, Group } from '@mantine/core';
import { useState } from 'react';
import { MdOutlineNightsStay } from "react-icons/md";
import { WiDaySunny } from "react-icons/wi";

const ThemeToggler = () => {
    const { setColorScheme} = useMantineColorScheme({keepTransitions : true});
    const [tog , setTog] = useState<boolean>(false)

   function toggler(){
        if(!tog){
            setColorScheme('dark')
        }
        else{
            setColorScheme('light')
        }
        setTog(!tog)
   }
  return (
    <Button 
    onClick={() => toggler()} 
    className=' rounded-full bg-transparent p-0' variant='light'>
        {!tog? <MdOutlineNightsStay color='white' size={25}/> : <WiDaySunny color='white' size={25}/>}
    </Button>
  )
}

export default ThemeToggler