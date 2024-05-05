'use client'
import React, { ChangeEvent } from 'react'
import { useState } from 'react';
import { ActionIcon, Box, Button, Code, FileInput, Group, Image, Input, Text, TextInput, Textarea, rem } from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { IoContractSharp } from 'react-icons/io5';
import { randomId } from '@mantine/hooks';
 import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE ,FileWithPath} from '@mantine/dropzone';
import { MdDeleteOutline } from "react-icons/md";

//required things
//course content , place to drag and drop to upload video , each video should have a title , enter teachers participating to it
const CreateNewCourse = (props: Partial<DropzoneProps>) => {

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { name: '', content: '' , videos : [{title : '' , video :''}] },
        validate: {
          name: hasLength({ min: 3 }, 'Must be at least 3 characters'),
        },
      });

      const [submittedValues, setSubmittedValues] = useState<typeof form.values | null>(null);
      const [files, setFiles] = useState<File[]>([]);
    //   const previews = files.map((file, index) => {
    //     const imageUrl = URL.createObjectURL(file);
    //     return <Image key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
    //   });

      const videoChange = ( 
        event : File | null ,
        index : number
       ) => {
            
            const fileReader = new FileReader()
            if(event ){
                const file = event
                fileReader.onload = (event) => {
                    const videoDataUrl = event.target?.result?.toString() || ''
                    form.setFieldValue(`videos.${index}.video` , videoDataUrl)
                    console.log(videoDataUrl)
                }
                console.log(event);
                
                fileReader.readAsDataURL(file)

            }
      }

      const videoFields = form.getValues().videos.map((item , index) =>(
        <div key={index} className=' flex gap-5 items-center justify-center align-middle '>
            <div className=' flex gap-3'>
            <TextInput
                label = 'Video Title'
                placeholder="Video Title"
                withAsterisk
                style={{ flex: 1 }}
                key={form.key(`videos.${index}.title`)}
                {...form.getInputProps(`videos.${index}.title`)}
                />
            <FileInput 
                label = 'add video'
                w={100}
                placeholder = 'click to add video'
                {...form.getInputProps(`videos.${index}.video`)}
                onChange={(e) => videoChange(e , index)}
                />
            </div>
        
           <div className=' mt-6 pt-6'>
            
                <MdDeleteOutline size={40}  onClick={() => form.removeListItem('videos', index)} className=' mt-3' />
            
           </div>
        
      </div>
      ))

  return (
    <form onSubmit={form.onSubmit(setSubmittedValues)}>
    <TextInput
      {...form.getInputProps('name')}
      key={form.key('name')}
      label="Course Name"
      placeholder="Course Name"
    />
    <Textarea
      {...form.getInputProps('content')}
      key={form.key('content')}
      mt="md"
      label="Course content"
      placeholder="Course Content"
      className=' mb-3'
    />
    <Box maw={500} mx="auto" className=' pt-5 mt-5'>
      {videoFields}
      
      <Group justify="center" mt="md">
        <Button
          onClick={() =>
            form.insertListItem('videos', { 
                title :'',
                video :'' , key: randomId() })
          }
        >
          Add Video
        </Button>
      </Group>
    </Box>
    <Button type="submit" mt="md">
      Submit
    </Button>

    <Text mt="md">Form values:</Text>
    <Code block>{JSON.stringify(form.values, null, 2)}</Code>

    <Text mt="md">Submitted values:</Text>
    <Code block>{submittedValues ? JSON.stringify(submittedValues, null, 2) : '–'}</Code>
  </form>
  )
}

export default CreateNewCourse