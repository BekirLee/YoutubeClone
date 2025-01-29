import React from 'react'
import Header from '../../components/Header'
import { useSearchParams } from 'react-router-dom';
import CurrentVideo from '../../components/CurrentVideo';
import PlayinVideoAndOtherVideos from '../../components/PlayinVideoAndOtherVideos'

function Videos() {

    // console.log(videoId)

    return (
        <div className="scrollbar scrollbar-track-slate-950 scrollbar-thumb-red-700">
            {
                <>
                    <Header />
                    <PlayinVideoAndOtherVideos />
                </>
            }

        </div >
    );
}
export default Videos
