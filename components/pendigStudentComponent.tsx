'use client'
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import React from 'react'

const PendigStudentComponent = () => {
    const [opened, { open, close }] = useDisclosure(false);
  return (
    <div >
    <Modal opened={opened} onClose={close} title="pending Students">
        {/* Modal content */}
      </Modal>

      <div 
      className=' p-3 bg-gradient-to-br from-blue-950 to to-blue-500 rounded-lg hover:scale-105 shadow-md text-white'
      onClick={open}>Pending Students</div>
    </div>
  )
}

export default PendigStudentComponent