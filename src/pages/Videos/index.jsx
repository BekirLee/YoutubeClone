import React from 'react'
import Header from '../../components/Header'
import { useSearchParams } from 'react-router-dom';
import CurrentVideo from '../../components/CurrentVideo';
import PlayinVideoAndOtherVideos from '../../components/PlayinVideoAndOtherVideos'

function Videos() {

    // console.log(videoId)

    return (
        <div className="">
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
