'use client'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Box, Button, Group, Image, TextInput, Textarea} from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import { MdDeleteOutline } from "react-icons/md";
import { CreateCourse } from '@/lib/actions/courseActions';
import { UploadButton } from '@/lib/uploadthing';
import { CourseInterface} from '@/lib/types';
import { Loader } from '@mantine/core'


const CreateNewCourse = (
  {requiredCourse , mongoUserId} : 
  {mongoUserId : string, requiredCourse : CourseInterface}) => {

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { 
          name: requiredCourse.name ? requiredCourse.name : '',
          content: requiredCourse.content? requiredCourse.content : '' , 
          videos :requiredCourse.videos ? requiredCourse.videos : [{title : '' , video :''}] ,
          coursePicture : requiredCourse.coursePicture? requiredCourse.coursePicture : '',
          _id : requiredCourse._id ? requiredCourse._id : '',
          price : requiredCourse.price? requiredCourse.price : '',
          duration : requiredCourse.duration? requiredCourse.duration : ''
         },
        validate: {
          name: hasLength({ min: 3 }, 'Must be at least 3 characters'),
        },
      });

      const [loading , setLoading] = useState<boolean>(false)
      const [response , setResponse] = useState<string>('')

      useEffect(()=>{
        console.log('i have changed' , requiredCourse)
        form.setValues({
          name: requiredCourse.name ? requiredCourse.name : '',
          content: requiredCourse.content? requiredCourse.content : '' , 
          videos :requiredCourse.videos ? requiredCourse.videos : [{title : '' , video :''}] ,
          coursePicture : requiredCourse.coursePicture? requiredCourse.coursePicture : '',
          _id : requiredCourse._id ? requiredCourse._id : '',
          price : requiredCourse.price ? requiredCourse.price : '',
          duration : requiredCourse.duration? requiredCourse.duration : ''
        })
        
      }, [requiredCourse , mongoUserId])
      const previews = 
      <Image   
       src={form.getValues().coursePicture}   
        w={300}
        h={300}
        p={4}
        mt={9}
        radius={20}
        className=' rounded-lg mx-auto mt-3 pt-4'
        />;


      const videoFields = form.getValues().videos.map((item , index) =>(
        <div key={index} className=' flex gap-5 items-center  '>
            <div className=' flex flex-col gap-3'>
            <TextInput
                label = 'Video Title'
                placeholder="Video Title"
                withAsterisk
                style={{ flex: 1 }}
                key={form.key(`videos.${index}.title`)}
                {...form.getInputProps(`videos.${index}.title`)}
                />
          
                 <UploadButton
                    className='text-blue-400 bg-blue-500'
                    endpoint="videoUploader"
                    onClientUploadComplete={(res) => {
                      console.log("Files: ", res);
                      form.setFieldValue(`videos.${index}.video` , res[0].url)
                      alert("Upload Completed");
                      
                    }}
                    onUploadError={(error: Error) => {
                      alert(`ERROR! ${error.message}`);
                    }}
                   />
            </div>
        
           <div className=' mt-6 pt-6'>
                <MdDeleteOutline 
                size={40} 
                onClick={() => form.removeListItem('videos', index)} className=' mt-3' />
           </div>
        
      </div>
      ))

      async function handleSubmit(values : Omit<CourseInterface , 'posts' |'author' | 'pendingStudents'|'newPending'>){
        setLoading(true)
        await CreateCourse(values , mongoUserId).then((res : {status : string , message : string}) => {
          if(res.status === 'OK'){
            setResponse(res.message)
            setLoading(false)
          }else{
            setResponse('Sorry , try again')
            setLoading(false)
          }
        })
      }
  return (
    <form 
    onSubmit={form.onSubmit((values) => handleSubmit(values))}
    
    >
        <div className=' mx-auto w-full'>
        <TextInput
          {...form.getInputProps('name')}
          key={form.key('name')}
          label="Course Name"
          placeholder="Course Name"
          pb={10}
        />
        <TextInput
          {...form.getInputProps('price')}
          key={form.key('price')}
          label="Price"
          placeholder="$100"
          pb={10}
        />
        <TextInput
          {...form.getInputProps('duration')}
          key={form.key('duration')}
          label="Price"
          placeholder="$100"
          pb={10}
        />
     
        <div className=' flex gap-5 '>
          <div className=' text-sm'>Choose Course Picture</div>
        <UploadButton
        endpoint="imageUploader"
        {...form.getInputProps('coursePicture')}
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          form.setFieldValue('coursePicture' , res[0].url)
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
        </div>
        
    <div className=' mt-3 pt-3'>
    {form.getValues().coursePicture != ''? previews : null}
    </div>
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
      {
        loading?<div className='flex items-center justify-center gap-2'><Loader type='dots' color='white'/>Loading ...</div>: response === '' ? 'submit' : response
      }
      
    </Button>
  </div>
  </form>
  )
}

export default CreateNewCourse

 // const previews = files.map((file, index) => {
      //   const imageUrl = URL.createObjectURL(file);
      //   return <Image 
      //   key={index} 
      //   src={imageUrl} 
      //   onLoad={() => URL.revokeObjectURL(imageUrl)} 
      //   w={300}
      //   h={300}
      //   p={4}
      //   mt={9}
      //   radius={20}
        
      //   className=' rounded-lg mx-auto mt-3 pt-4'

      //   />;
      // });
      
      {/* <FileInput 
        label = 'Add Course Image'
        key={form.key('coursePicture')}
        placeholder = 'Click here to add Course Picture'
        {...form.getInputProps(`coursePicture`)}
        onChange={(e) => pictureChange(e)}
        /> */}
     
         {/* <Text mt="md">Form values:</Text>
    <Code block>{JSON.stringify(form.values, null, 2)}</Code>

    <Text mt="md">Submitted values:</Text>
    <Code block>{submittedValues ? JSON.stringify(submittedValues, null, 2) : '–'}</Code> */}

      {/* <FileInput 
                label = 'add video'
                w={100}
                
                placeholder = 'click to add video'
                {...form.getInputProps(`videos.${index}.video`)}
                onChange={(e) => videoChange(e , index)}
                /> */}

              //   const pictureChange = (event : File | null)=>{
              //     const fileReader = new FileReader()
              //     if(event ){
              //         const file = event
              //         setFiles([event])
              //         fileReader.onload = (event) => {
              //             const picDataUrl = event.target?.result?.toString() || ''
              //             form.setFieldValue(`CoursePicture` , picDataUrl)
              //             console.log(picDataUrl)
              //         }
              //         console.log(event);
              //         fileReader.readAsDataURL(file)
              //     }
              // }
        
              // const videoChange = ( 
              //     event : File | null ,
              //     index : number
              //   ) => {     
              //         const fileReader = new FileReader()
              //         if(event ){
              //             const file = event
              //             fileReader.onload = (event) => {
              //                 const videoDataUrl = event.target?.result?.toString() || ''
              //                 form.setFieldValue(`videos.${index}.video` , videoDataUrl)
              //                 console.log(videoDataUrl)
              //             }
              //             console.log(event);
              //             fileReader.readAsDataURL(file)
              //         }
              //   }