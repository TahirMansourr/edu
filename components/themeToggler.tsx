'use client'
import { useMantineColorScheme, Button, Group } from '@mantine/core';
import { useState } from 'react';
import { MdOutlineNightsStay } from "react-icons/md";
import { WiDaySunny } from "react-icons/wi";

const ThemeToggler = () => {
    const { setColorScheme} = useMantineColorScheme();
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
    <Button onClick={() => toggler()} className=' rounded-full bg-transparent'>{!tog? <MdOutlineNightsStay/> : <WiDaySunny/>}</Button>
  )
}

export default ThemeToggler