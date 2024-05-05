'use client'
import React, { ChangeEvent } from 'react'
import { useState } from 'react';
import { ActionIcon, Box, Button, Code, FileInput, Group, Image, Input, Text, TextInput, Textarea, rem } from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { IoContractSharp } from 'react-icons/io5';
import { randomId } from '@mantine/hooks';
 import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE ,FileWithPath} from '@mantine/dropzone';

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
        <Group key={index} mt="xs" align='center'>
        <TextInput
          label = 'Video Title'
          placeholder="Video Title"
          withAsterisk
          style={{ flex: 1 }}
          key={form.key(`videos.${index}.title`)}
          {...form.getInputProps(`videos.${index}.title`)}
        />
        <FileInput 
        accept=''
        {...form.getInputProps(`videos.${index}.video`)}
        onChange={(e) => videoChange(e , index)}
        />
        {/* {previews} */}
      {/* <Dropzone
        onDrop={(files) => console.log('accepted files', files)}
        onReject={(files) => console.log('rejected files', files)}
        key={form.key(`videos.${index}.video`)}
        accept={IMAGE_MIME_TYPE}
       
        {...props}
        {...form.getInputProps(`videos.${index}.video`)}
       >
      <Group justify="center" gap="xl"  style={{ pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
            stroke={1.5}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
            stroke={1.5}
          />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
        </div>
      </Group>
      </Dropzone> */}      
        <ActionIcon color="red" onClick={() => form.removeListItem('employees', index)}>
          <IoContractSharp size="1rem" />
        </ActionIcon>
      </Group>
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
    />
    <Box maw={500} mx="auto">
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