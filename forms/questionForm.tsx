'use client'

import { CreateUser } from '@/lib/actions/userActions';
import { TextInput, Checkbox, Button, Group, Box, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import {useRouter} from 'next/navigation'
import { createQuestion } from '@/lib/actions/postActions';

interface Props {
  id : string ,
  courseId : string ,
  lessonFromCourse :string
}

const QuestionForm = ( {id , courseId , lessonFromCourse} : Props) => {

  const [loading ,setLoading] = useState<boolean>(false)
  const router = useRouter()
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      post : ''
    },
  });

  const onSubmit = async (values : {post :string}) =>{
    
    
    setLoading(true)

    createQuestion({
      body : values.post,
      id,
      courseId,
      lessonFromCourse
    })
   
  }

  return (
    <div className=' w-full' >
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <div className='flex flex-col items-center'>
        <Textarea
          label="Any Questions?"
          placeholder="Feel free to ask"
          key={form.key('post')}
          className=' w-full'
          {...form.getInputProps('post')}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
        </div>
      </form>
    </div>
  );
}

export default QuestionForm;