'use client'

import React from 'react'
import ReactPlayer from "react-player";



const VideoPlayer = () => {
  //video path
  return (
    <div className=' mx-auto rounded-lg shadow-xl'>
      <ReactPlayer
        width="500px"
        height="400px"
        style={{borderRadius : '3rem' , border : '10', marginTop : '0px' , paddingTop : '0px', height : "100%"}}
        url={'https://utfs.io/f/050996d2-cc4d-4077-a3fc-e55b80b848bd-184yrj.mp4'}
        controls={true}
        // light is usefull incase of dark mode
        light={false}
        // picture in picture
        pip={true}
        playsinline ={true}
      />
    </div>
  );
}

export default VideoPlayer