import React from 'react'
import Header from '../../components/Header'
import { useSearchParams } from 'react-router-dom';
import CurrentVideo from '../../components/CurrentVideo';
import PlayinVideoAndOtherVideos from '../../components/PlayinVideoAndOtherVideos'

function Videos() {

    // console.log(videoId)

    return (
        <div className="container bg-[#0f0f0f] w-full h-full">
            {
                <div className="w-full">
                    <Header />
                    <PlayinVideoAndOtherVideos/>
                </div>
            }

        </div >
    );
}
export default Videos
