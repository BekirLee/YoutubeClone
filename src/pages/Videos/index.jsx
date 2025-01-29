import React from 'react'
import Header from '../../components/Header'
import { useSearchParams } from 'react-router-dom';
import CurrentVideo from '../../components/CurrentVideo';
import PlayinVideoAndOtherVideos from '../../components/PlayinVideoAndOtherVideos'

function Videos() {

    // console.log(videoId)

    return (
        <div className="bg-[#0f0f0f] h-screen overflow-y-scroll scrollbar scrollbar-thumb-[#f1f1f18e] scrollbar-track-[#0f0f0f]">
            {
                <>
                    <Header />
                    <PlayinVideoAndOtherVideos/>
                </>
            }

        </div >
    );
}
export default Videos
