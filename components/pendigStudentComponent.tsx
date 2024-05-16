'use client'
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import React from 'react'
import { CourseInterface, mongoUserInterface } from '@/lib/types';
import { Accordion } from '@mantine/core';

const PendigStudentComponent = ({courses} : {courses : CourseInterface[] | undefined}) => {
    const [opened, { open, close }] = useDisclosure(false);
    console.log(courses);

    const items = courses?.map((item : CourseInterface , index : number) => (
      <Accordion.Item key={index} value={item.name}>
        <Accordion.Control >{item.name}</Accordion.Control>
        { item.pendingStudents.map((item : mongoUserInterface , index : number) => (
          <Accordion.Panel>{item.name }</Accordion.Panel>
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