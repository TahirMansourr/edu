'use client'

import React, { useEffect, useState } from 'react'
import ReactPlayer from "react-player";



const VideoPlayer = ({videoUrl} : {videoUrl : string}) => {
  
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  
  const responsiveWidth = Math.min(windowWidth * 0.8, 400); 

  return (
    <div className=' sm:mx-auto sm:rounded-lg sm:shadow-xl mx-auto'>
      <ReactPlayer
        width= {responsiveWidth}
        height="400px"
        style={{borderRadius : '3rem' , border : '10', marginTop : '0px' , paddingTop : '0px', height : "100%"}}
        url={videoUrl}
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