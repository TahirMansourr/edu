'use client'
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Indicator } from '@mantine/core';
import React from 'react'
import { CourseInterface, mongoUserInterface } from '@/lib/types';
import { Accordion } from '@mantine/core';
import { handleNewPendingforCourse } from '@/lib/actions/courseActions';

const PendigStudentComponent = ({courses , mongoId} : {courses : CourseInterface[] | undefined , mongoId : string | undefined}) => {
    const [opened, { open, close }] = useDisclosure(false);
    console.log(courses);

    const handleAccept = async (courseId : string)=>{
        await handleNewPendingforCourse(courseId ,mongoId ? mongoId : '')
    }

    const items = courses?.map((CourseItem : CourseInterface , index : number) => (
      <Accordion.Item key={index} value={CourseItem.name}>
        <Accordion.Control >
          { CourseItem.newPending? 
          <Indicator processing offset={20}>
            <div className='p-2'>
              {CourseItem.name}
            </div></Indicator> 
            : CourseItem.name
          }
        </Accordion.Control>
        { CourseItem.pendingStudents.map((item : mongoUserInterface , index : number) => (
          <Accordion.Panel key={index}>
            <div className=' flex items-center justify-between'>
            {item.name }
            <Button onClick={()=> handleAccept(CourseItem._id)}>
              accept
            </Button>
            </div>
          </Accordion.Panel>
        ))}
        
      </Accordion.Item>
    ));
    
  return (
    <div >
    <Modal opened={opened} onClose={close} title="pending Students">
    <Accordion >
      {items}
    </Accordion>
    </Modal>

      <div 
      className=' p-3 bg-gradient-to-br from-blue-950 to to-blue-500 rounded-lg hover:scale-105 shadow-md text-white'
      onClick={open}>Pending Students</div>
    </div>
  )
}

export default PendigStudentComponent