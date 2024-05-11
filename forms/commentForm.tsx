'use client'
import { TextInput, Checkbox, Button, Group, Box, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import {useRouter} from 'next/navigation'
import { LuSend } from "react-icons/lu";
import { createComment } from '@/lib/actions/postActions';

interface Props{
    postId : string,
    lessonFromCourse : string,
    courseId : string,
    id : string
}
const CommentForm = ( { postId , lessonFromCourse , courseId , id} : Props ) => {

  const [loading ,setLoading] = useState<boolean>(false)
  const router = useRouter()
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      comment : ''
    },
  });

  const onSubmit = async () =>{
    const comment = form.getValues().comment
    console.log(comment)
    
    setLoading(true)

    await createComment({
        postId ,
        courseId ,
        lessonFromCourse ,
        body : comment,
        id 
    })
    form.reset()
  }

  return (
    <div className=' w-full mt-3' >
      <form >
        <div className='flex items-center gap-2 w-full '>
        <TextInput
          placeholder="Feel free to ask"
          key={form.key('comment')}
          className=' w-full'
          {...form.getInputProps('comment')}
          rightSection = {<LuSend size={20} color='blue' onClick={() => onSubmit()} className=' hover:cursor-pointer' />}
        />       
        </div>
      </form>
    </div>
  );
}

export default CommentForm;