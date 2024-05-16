import React from 'react';
import { Loader } from '@mantine/core';

const Loading = () => {
  return (
    <div className=' h-screen flex items-center justify-center'>
    Creating your Dashboard <Loader color="blue" type="dots" />;
    </div>
)}

export default Loading;