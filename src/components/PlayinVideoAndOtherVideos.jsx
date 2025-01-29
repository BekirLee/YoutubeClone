import React from 'react'
import CurrentVideo from './CurrentVideo'
import ScrolableVideos from './ScrolableVideos'


function PlayinVideoAndOtherVideos() {
    return (
        <div className='bg-[#0f0f0f] w-full h-full flex justify-center '>
            <CurrentVideo />
            <ScrolableVideos />
        </div>
    )
}

export default PlayinVideoAndOtherVideos
