'use client'
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import Image from "next/image";
import ielts from '.././public/ielts.png'
import { Boogaloo } from "next/font/google";
import { Pattaya } from "next/font/google";
import bankak from '../public/bankak.jpeg'
import Link from "next/link";
import { useState } from 'react';

const georama = Boogaloo({
  weight : '400',
  subsets : ["latin"]
})

const pattaya = Pattaya({
  weight : "400",
  subsets :["latin"]
})

const CourseComponent = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const [bankakk , setBankak] = useState<boolean>(false)
  return (
    <main className=" min-h-screen flex flex-col pt-4">
    <section className="flex w-screen">
        <section className="flex justify-between w-[90%] mx-auto items-center border p-4 rounded-xl shadow-md">
            <div className={`${georama.className} flex flex-col text-lg`}>
              <div className="underline">
                  Course Content
              </div>
              <div className=" max-w-[80%]">
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. At cupiditate alias itaque corrupti adipisci sed doloribus officiis animi aperiam maiores, voluptatum quibusdam! Natus neque sapiente ex, perspiciatis iure amet aperiam?
              </div>
              <br/>
              <div className=" underline">
                  Course Teachers
              </div>
              <div className=" max-w-[80%]">
                  <ul>
                    <li>Wala Mansour</li>
                    <li>Shimaa</li>
                    <li>Hind Mansour</li>
                  </ul>
              </div>
              <br />
              <div className="flex justify-around w-full items-center">
                <div className="flex gap-5">
                <div>duration : 10 hours</div>
                <div>rating : *****</div>
                </div>
               
                <Button onClick={open}>Get Course</Button>
                <Modal opened={opened} onClose={close} title="Payment Method">
                    {
                        !bankakk ?
                        <Image 
                            src={bankak}
                            width={200}
                            height={200}
                            alt='bankak'
                            className=' rounded-full hover:cursor-pointer'
                            onClick={()=> setBankak(!bankakk)}
                        />
                        : 
                        <div>
                            <h1 className='whitespace-pre-line'>
                             Send the amount on to account number 432432 and write your username on the comment section.
                             REMEBER: ALWAYS MAKE A SCREENSHOT OF YOUR TRANSACTIONS.
                             You should be admitted within 24 hours.
                             If you are not admitted within 24 hours please contact 
                             us at eduemail@gmail.com
                          </h1>
                          <Button onClick={()=> {}}>Completed payment</Button>
                        </div>
                    }
                   
                </Modal>
                
              </div>
            </div>
            <Image 
              src={ielts}
              alt="Course Image"
              width={300}
              height={300} 
              className=" rounded-lg shadow-lg"
              />
        </section>
    </section>
  </main>
  )
}

export default CourseComponent