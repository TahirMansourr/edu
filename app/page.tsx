import Image from "next/image";
import ielts from '.././public/ielts.png'
import { Boogaloo } from "next/font/google";
import { Button } from "@mantine/core";
import { Pattaya } from "next/font/google";

const georama = Boogaloo({
  weight : '400',
  subsets : ["latin"]
})

const pattaya = Pattaya({
  weight : "400",
  subsets :["latin"]
})

export default function Home() {
  return (
    <main className=" min-h-screen flex flex-col">
      <section className={`${pattaya.className} text-3xl`}>
        " Dedication has no limitation"
      </section>
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
                 
                  <Button  size="lg">Get Course</Button>
                </div>
              </div>
              <Image 
                src={ielts}
                alt="Course Image"
                width={300}
                height={300} />
          </section>
      </section>
    </main>
    
  );
}
